import { createContext, useState } from "react";

// Context that stores the successfully registered user.
export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // React 19 syntax: the context itself is the provider.
  // (Old syntax was <UserContext.Provider value={...}>)
  return <UserContext value={{ user, setUser }}>{children}</UserContext>;
}
