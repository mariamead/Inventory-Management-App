import React from "react";
import { useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

const clerk_key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerk_key) {
  throw new Error("KEY NOT FOUND")
}

export function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <ClerkProvider 
      publishableKey={clerk_key}
      routerPush={(to: string) => navigate(to)}
      routerReplace={(to: string) => navigate(to, { replace: true })}
    >
      {children}
    </ClerkProvider>
  );
}