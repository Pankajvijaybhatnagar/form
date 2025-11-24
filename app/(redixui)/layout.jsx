"use client";
import React from "react";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { AuthProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { conf } from "@/lib/conf";

const AdminLayout = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={conf.googleClientId}>
      <AuthProvider>
        <Theme appearance="light" accentColor="violet">
          {children}
        </Theme>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default AdminLayout;
