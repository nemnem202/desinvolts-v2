import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { PageContextClient } from "vike/types";

interface AdminPageContext extends PageContextClient {
  isAdmin: boolean;
}

interface AdminContextValue {
  isAdmin: boolean;
  toggleAdmin: () => void;
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

export default function AdminProvider({ children }: { children: ReactNode }) {
  const pageContext = usePageContext() as AdminPageContext;

  const [isAdmin, setIsAdmin] = useState(pageContext.isAdmin);

  const toggleAdmin = () => setIsAdmin((value: boolean) => !value);

  return <AdminContext.Provider value={{ isAdmin, toggleAdmin }}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);

  if (!context) throw new Error("useAdmin must be called inside its provider !");

  return context;
}
