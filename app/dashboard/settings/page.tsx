"use client";

import { useState, useEffect } from "react";

export default function Settings() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/user/settings", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
          setIsDarkMode(data.isDarkMode);
        }
      } catch (error) {
        console.error("Failed to fetch user settings", error);
      }
    };
    fetchSettings();
  }, []);

  const handleUsernameChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/user/settings", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        alert("Username updated successfully!");
      } else {
        const { error } = await response.json();
        setError(error || "Failed to update username");
      }
    } catch (error) {
      setError("An error occurred while updating the username");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/user/settings", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
        alert("Password updated successfully!");
        setNewPassword("");
      } else {
        const { error } = await response.json();
        setError(error || "Failed to update password");
      }
    } catch (error) {
      setError("An error occurred while updating the password");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDarkMode = async () => {
    setIsLoading(true);
    setError("");
    try {
      const newDarkMode = !isDarkMode;
      const response = await fetch("/api/user/settings", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDarkMode: newDarkMode }),
      });

      if (response.ok) {
        setIsDarkMode(newDarkMode);
        document.documentElement.classList.toggle("dark", newDarkMode);
      } else {
        const { error } = await response.json();
        setError(error || "Failed to update theme preference");
      }
    } catch (error) {
      setError("An error occurred while updating the theme preference");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg transition duration-300">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        ⚙️ Settings
      </h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="space-y-6">
        {/* User Info */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white">👤 User Information</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Username: <span className="font-semibold">{username}</span></p>
        </div>

        {/* Update Username */}
        <form onSubmit={handleUsernameChange} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white">✏️ Update Username</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Username"}
          </button>
        </form>

        {/* Update Password */}
        <form onSubmit={handlePasswordChange} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white">🔑 Update Password</h2>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {/* Toggle Dark Mode */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white">🎨 Theme</h2>
          <button
            onClick={toggleDarkMode}
            disabled={isLoading}
            className="mt-4 bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded-md transition disabled:opacity-50"
          >
            {isLoading ? "Updating..." : `Switch to ${isDarkMode ? "Light" : "Dark"} Mode`}
          </button>
        </div>
      </div>
    </div>
  );
}
