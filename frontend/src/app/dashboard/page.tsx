"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "../api/me";
import { Loader2, User, Shield, LogOut } from "lucide-react";

interface UserData {
  name: string;
  email?: string;
  roles: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCurrentUser();
        
        if (!data) {
          router.push("/login");
          return;
        }
        
        console.log("Current user data:", data);
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, [router]);

  const handleLogout = () => {
    
    router.push("/login");
  };

  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto" />
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

 
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
              {user.email && (
                <p className="text-sm text-gray-500">{user.email}</p>
              )}
            </div>
          </div>
          {/* <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button> */}
        </div>
      </header>

      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {user.name}! 👋
          </h2>
          <p className="text-indigo-100">
            Here's what's happening with your account today.
          </p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Your Role</p>
                <p className="text-lg font-bold text-gray-900 capitalize">
                  {user.roles}
                </p>
              </div>
            </div>
          </div>

        
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Activity</p>
                <p className="text-lg font-bold text-gray-900">Coming Soon</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Tasks</p>
                <p className="text-lg font-bold text-gray-900">0 Pending</p>
              </div>
            </div>
          </div>
        </div>

       
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="text-center py-12">
            <p className="text-gray-500">No recent activity to display</p>
          </div>
        </div>
      </main>
    </div>
  );
}