# Modern Front-End Security – Vulnerable Starter Project

## Overview

This project is a deliberately vulnerable User Security Dashboard
created for the Modern Front-End Security Concepts training assignment.

## Technologies

- HTML
- CSS
- Vanilla JavaScript
- Node.js
- Express

## Setup

Install dependencies:

```bash
npm install
```

Start the application::

```bash
npm start
```

## Part B: Security Findings and Fixes

### Finding 1: DOM-Based Cross-Site Scripting (DOM XSS)

**Location:** `client/app.js`, profile rendering.

**Vulnerable implementation:** The `name` value is read from the URL query string and interpolated into an `app.innerHTML` template. Query-string values are attacker-controlled, and `innerHTML` parses the resulting string as markup. An attacker could craft a link that causes injected HTML to be interpreted in the dashboard's origin.

```js
const username = params.get("name") || window.initialUser?.name || "Guest";

app.innerHTML = `
	<section class="profile-card">
		<h2>Welcome, ${username}</h2>
		...
	</section>
`;
```

**Source and sink:** `URLSearchParams` reads the untrusted `name` query parameter; `innerHTML` is the unsafe HTML-interpreting sink.

**Fix:** Build the profile card using DOM methods and assign dynamic values with `textContent`. The browser then displays the URL value as text instead of parsing it as markup. This also keeps the server-provided profile fields in text contexts.

**Testing and verification:** Start the app with `npm start` and open:

```text
http://localhost:3000/?name=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E
```

Verified in the browser that the welcome heading displays the literal `<img src=x onerror=alert(1)>` text and no injected image element is created. The dashboard profile and settings controls still render, and clicking **Save Settings** displays “Settings saved successfully.”

### Finding 2: Prototype Pollution Risk in Settings Merge

**Location:** `server/server.js`, `POST /api/settings`.

**Vulnerable implementation:** The endpoint copied every property from the request body to a normal object without validating the property names or values:

```js
const settings = {};

for (const key in incomingSettings) {
	settings[key] = incomingSettings[key];
}
```

**Source and risk:** `req.body` is client-controlled JSON. Assigning an attacker-supplied `__proto__` key to a normal object can change that settings object's prototype and introduce unexpected inherited properties. This pattern affects the temporary settings object; it does not by itself establish pollution of global `Object.prototype`.

**Fix:** The endpoint now accepts only the supported `theme`, `language`, and `fontSize` keys with their expected values. It checks that each key is an own property of the allowlist before looking up its allowed values, rejects invalid input with HTTP 400, and uses a null-prototype object for the result.

**Testing and verification:** Submitted valid settings (`dark`, `fr`, `large`) and received HTTP 200 with “Settings saved successfully.” Submitted `{"__proto__":{"polluted":"yes"}}` and received HTTP 400 with “Invalid setting: __proto__”. An unsupported value (`{"theme":"ultraviolet"}`) also received HTTP 400. The normal dashboard save flow remains supported.

### Finding 3: Missing Content Security Policy (CSP)

**Location:** `server/server.js`, HTTP responses for the dashboard and account page.

**Vulnerable implementation:** The server did not set a Content Security Policy response header. The dashboard also contains an inline script, so the browser had no policy restricting which scripts could execute. If another issue such as DOM XSS were present, CSP would not be available as a defense-in-depth layer.

**Fix:** Added Helmet with an enforced CSP delivered in the HTTP response. The policy restricts resources to the same origin, disables objects, limits form actions and base URLs, and sets `frame-ancestors 'none'`. A fresh unpredictable nonce is generated per response and added only to the application's existing trusted inline scripts and account-page style block. The policy does not use `unsafe-inline` or `unsafe-eval`.

**Testing and verification:** Confirmed the `/` response contain the CSP header and that each response's inline script/style nonce matches its own policy. The dashboard's nonce-authorized initialization script ran. Appended an inline script without a nonce in the browser Console; CSP blocked it and it did not set the test marker. The dashboard still rendered and **Save Settings** returned “Settings saved successfully.”

### Finding 4: SSR Token Leakage

**Location:** `server/server.js`, the dashboard route and `GET /api/profile`.

**Vulnerable implementation:** The server serialized the complete `user` object into `window.initialUser` and returned that same object from the profile API. The object contains session and refresh token fields, so sending it to the browser exposed server-side authentication data in the HTML and JSON response.

**Security boundary:** `user` is server-side data. Embedding it in HTML or returning it from a client-facing API crosses the server-to-browser boundary; only fields required by the client should cross it.

**Fix:** Created a client-safe `clientUser` DTO containing only `id`, `name`, `email`, and `role`. Both the SSR bootstrap script and `/api/profile` now use this DTO, leaving token fields on the server.

**Testing and verification:** Confirmed the dashboard still displays the user's name, email, and role. Checked the `/` HTML response for `sessionToken`, `refreshToken`, and the fake token values; none were present. Checked `/api/profile`; it returned only `id`, `name`, `email`, and `role`. The CSP response header remained present and **Save Settings** continued to work.

### Finding 5: Clickjacking Through Unrestricted Framing

**Location:** `server/server.js`, HTTP responses including the `/account` page.

**Vulnerable implementation:** The original server allowed the account page to load inside an iframe on another site. An attacker could disguise or overlay the framed page to trick a user into clicking a sensitive control, such as **Delete Account**.

**Security boundary:** The browser must control which sites may embed the application's pages. The account page contains a sensitive-action control, so arbitrary framing should not be allowed.

**Fix:** The enforced CSP includes `frame-ancestors 'none'`, preventing the app from being embedded by any site. Helmet also sends `X-Frame-Options: DENY` as a compatibility defense.

**Testing and verification:** Open `test/iframe-test.html` while the fixed app is running. The account page should be blocked inside the iframe. In DevTools → **Network**, inspect the `/account` response and confirm `Content-Security-Policy` includes `frame-ancestors 'none'` and `X-Frame-Options` is `DENY`. Navigate directly to `/account` to confirm the page remains available outside a frame.