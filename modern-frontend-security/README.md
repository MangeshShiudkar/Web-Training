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