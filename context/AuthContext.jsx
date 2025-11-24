"use client";
import { conf } from "@/lib/conf";
import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";

// --- 1. Create the Context ---
const AuthContext = createContext({
  user: null,
  access_token: null,
  isAuthenticated: false,
  loading: true,
  login: () => {},
  logout: () => {},
  signup: () => {},
  sendOTP: () => {},
  verifyOTP: () => {},
  apiFetch: () => {},
});

// --- 2. Custom Hook ---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// --- 3. Auth Provider Component ---
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [access_token, setaccess_token] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOGOUT
  const logout = useCallback(() => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user");

    setaccess_token(null);
    setUser(null);
  }, []);

  // LOGIN
  const login = useCallback(
    async (email, password) => {
      setLoading(true);
      try {
        const response = await fetch(`${conf.apiBaseURL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log("Login Response Data:", data);

        if (response.ok) {
          

          // SET STATE
          setaccess_token(data.access_token);
          setUser(data.user || { id: data.userId, name: data.name, email });

          // SAVE IN SESSION STORAGE
          sessionStorage.setItem("access_token", data.access_token);
          sessionStorage.setItem(
            "user",
            JSON.stringify(data.user || { id: data.userId, name: data.name, email })
          );

          return { success: true, code: response.status, user: data.user };
        } else {
          return {
            success: false,
            code: response.status,
            error: data.message || `Login failed ${response.status}`,
          };
        }
      } catch (error) {
        console.error("Login Error:", error.message);
        return { success: false, code: 0, error: error.message };
      } finally {
        setLoading(false);
      }
    },
    []
  );
    const loginWithGoogle = useCallback(
    async (id_token) => {
      setLoading(true);
      try {
        const response = await fetch(`${conf.apiBaseURL}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_token }),
        });

        const data = await response.json();
        console.log("Login Response Data:", data);

        if (response.ok) {
          if (!data.data?.access_token) {
            return {
              success: false,
              code: response.status,
              error: data.message || "Login failed: No access token received.",
            };
          }
          
          // SET STATE
          setaccess_token(data.data.access_token);
          setUser(data.data.user);

          // SAVE IN SESSION STORAGE
          sessionStorage.setItem("access_token", data.data.access_token);
          sessionStorage.setItem(
            "user",
            JSON.stringify(data.data.user)
          );

          return { success: true, code: response.status, user: data.data.user };
        } else {
          return {
            success: false,
            code: response.status,
            error: data.message || `Login failed ${response.status}`,
          };
        }
      } catch (error) {
        console.error("Login Error:", error.message);
        return { success: false, code: 0, error: error.message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // SIGNUP
  const signup = useCallback(async (name, email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${conf.apiBaseURL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        return { success: true, code: response.status };
      } else {
        return {
          success: false,
          code: response.status,
          error: data.message || `Registration failed ${response.status}`,
        };
      }
    } catch (error) {
      console.error("Signup Error:", error.message);
      return { success: false, code: 0, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // SEND OTP
  const sendOTP = useCallback(async (email) => {
    setLoading(true);
    try {
      const response = await fetch(`${conf.apiBaseURL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (response.ok) {
        return { success: true, code: response.status };
      } else {
        return {
          success: false,
          code: response.status,
          error: data.message || "Failed to send OTP",
        };
      }
    } catch (error) {
      console.error("Send OTP Error:", error.message);
      return { success: false, code: 0, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // VERIFY OTP
  const verifyOTP = useCallback(async (email, otp) => {
    setLoading(true);
    try {
      const response = await fetch(`${conf.apiBaseURL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, code: 200, message: "OTP verified" };
      } else {
        return {
          success: false,
          code: response.status,
          error: data.message || "OTP Verification failed",
        };
      }
    } catch (error) {
      console.error("Verify OTP Error:", error.message);
      return { success: false, code: 0, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // API FETCH (No Token Refresh)
  const apiFetch = useCallback(
    async (endpoint, options = {}) => {
      const headers = {
        ...options.headers,
        Authorization: `Bearer ${access_token}`,
      };

      const response = await fetch(`${conf.apiBaseURL}/${endpoint}`, {
        ...options,
        headers,
      });

      if (response.status === 401) logout();

      return { response, code: response.status };
    },
    [access_token, logout]
  );

  // LOAD SESSION STORAGE
  useEffect(() => {
    const savedToken = sessionStorage.getItem("access_token");
    const savedUser = sessionStorage.getItem("user");

    if (savedToken && savedUser) {
      setaccess_token(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const value = {
    user,
    access_token,
    isAuthenticated: !!user,
    loading,
    login,
    loginWithGoogle,
    logout,
    signup,
    sendOTP,
    verifyOTP,
    apiFetch,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
