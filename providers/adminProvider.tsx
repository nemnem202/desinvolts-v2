import { logger } from "@/lib/logger";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AdminContextValue {
  isAdminDisplay: boolean;
  toggleAdmin: () => void;
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

export default function AdminProvider({
  children,
  currentUser,
}: {
  children: ReactNode;
  currentUser: { username: string } | null;
}) {
  const [isAdminDisplay, setisAdminDisplay] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const mode = localStorage.getItem("mode");
    if (mode === "admin") setisAdminDisplay(true);
    else setisAdminDisplay(false);
  }, [currentUser]);

  useEffect(() => {
    logger.info("Admin display? ", isAdminDisplay);
  }, [isAdminDisplay]);

  const toggleAdmin = () => {
    setisAdminDisplay((prev) => {
      const next = !prev;
      localStorage.setItem("mode", next ? "admin" : "user");
      return next;
    });
  };

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
