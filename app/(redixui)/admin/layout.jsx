"use client";

import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Separator,
  IconButton,
  ScrollArea,
  Theme,
} from "@radix-ui/themes";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";   // <-- added
import { useRouter } from "next/navigation";       // <-- added
import Link from "next/link";
import Sidebar from "@/components/admin/SideBar";


const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const { isAuthenticated, loading, user } = useAuth(); // <-- added
  const router = useRouter();                    // <-- added

  // 🔥 AUTH PROTECTION
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace("/login"); // redirect to login
        return
      }

      // checking user is admin or superadmin
      if (user.role !== 'admin' && user.role !== 'superadmin') {
        router.replace("/dashboard");
        return
      }
    }
  }, [loading, isAuthenticated, router]);

  // 🔥 WINDOW FIX
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Prevent flashing of admin panel until auth check completes
  if (loading) {
    return (
      <Flex align="center" justify="center" style={{ height: "100vh" }}>
        <Text size="4" weight="bold">Checking authentication...</Text>
      </Flex>
    );
  }

  // If not authenticated, return nothing.
  if (!isAuthenticated) return null;

  return (
    <Theme>
      <Flex style={{ minHeight: "100vh", position: "relative" }}>

        <Sidebar
          isOpen={sidebarOpen || !isMobile}
          onClose={() => setSidebarOpen(false)}
        />

        <Box
          style={{
            flexGrow: 1,
            marginLeft: !isMobile ? "240px" : "0px",
            transition: "margin 0.3s ease",
            width: "100%",
          }}
        >
          <Flex
            justify="between"
            align="center"
            style={{
              padding: ".8rem",
              borderBottom: "1px solid #ddd",
              background: "#fff",
              position: "sticky",
              top: 0,
              zIndex: 40,
            }}
          >
            <IconButton
              size="2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              variant="ghost"
              style={{
                display: !isMobile ? "none" : "inline-flex",
              }}
            >
              <FaBars />
            </IconButton>

            <Text weight="bold" size="4">Admin Panel</Text>
          </Flex>

          <Box style={{ padding: "1rem" }}>{children}</Box>
        </Box>
      </Flex>
    </Theme>
  );
};

export default AdminLayout;
