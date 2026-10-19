import { useContext } from "react";
import { preconnect, preinit, preload } from "react-dom";
import { UserContext } from "./context/UserContext.jsx";
import RegistrationForm from "./components/RegistrationForm.jsx";
import Store from "./components/Store.jsx";

export default function App() {
  const { user } = useContext(UserContext);

  // Asset Loading APIs (React DOM)
  preconnect("https://fonts.googleapis.com"); // open the connection early
  preconnect("https://fonts.gstatic.com", { crossOrigin: "anonymous" });
  preinit("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",{ as: "style" }); // download and apply the font stylesheet
  preload("/images/headphones.svg", { as: "image" }); // first product image

  // Until the user has registered, only the registration screen is shown.
  if (!user) {
    return (
      <>
        <title>Mini E-Commerce Store – Register</title>
        <meta name="description" content="Register to start shopping in the Mini E-Commerce Store."/>
        <header className="bg-indigo-600 text-white">
          <div className="mx-auto max-w-6xl p-4">
            <h1 className="text-2xl font-bold">Mini E-Commerce Store</h1>
          </div>
        </header>
        <main className="mx-auto max-w-md p-4">
          <p className="mb-4 text-gray-600">
            Please register to continue to the store.
          </p>
          <RegistrationForm />
        </main>
      </>
    );
  }

  return <Store />;
}
