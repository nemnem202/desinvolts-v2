import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { PageContextClient } from "vike/types";

interface AdminPageContext extends PageContextClient {
  isAdminDisplay: boolean;
}

interface AdminContextValue {
  isAdminDisplay: boolean;
  toggleAdmin: () => void;
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

export default function AdminProvider({ children }: { children: ReactNode }) {
  const pageContext = usePageContext() as AdminPageContext;

  const [isAdminDisplay, setisAdminDisplay] = useState(pageContext.isAdminDisplay);

  const toggleAdmin = () => setisAdminDisplay((value: boolean) => !value);

  return (
    <AdminContext.Provider value={{ isAdminDisplay, toggleAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);

  if (!context) throw new Error("useAdmin must be called inside its provider !");

  return context;
}
