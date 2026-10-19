import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

// A separate component that reads the user from Context.
export default function UserInfo() {
  const { user } = useContext(UserContext);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-2 text-xl font-semibold">Registered User</h2>
      {user ? (
        <div className="text-sm">
          <p>
            <span className="font-medium">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No user registered yet.</p>
      )}
    </div>
  );
}
