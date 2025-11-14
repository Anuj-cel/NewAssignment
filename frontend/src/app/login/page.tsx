"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link"; 

interface LoginFormState {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [form, setForm] = useState<LoginFormState>({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); 
    setLoading(true);

    try {
      
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const token = res.data.token;
      if (!token) {
        setMessage("Invalid server response. Token missing.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      
      
      const me = await axios.get("http://localhost:5000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      localStorage.setItem("user", JSON.stringify(me.data));
      setMessage("Login successful! Redirecting...");

      
      setTimeout(() => router.push("/dashboard"), 1000);

    } catch (error: any) {
     
      const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
      setMessage(errorMessage);
      setLoading(false);
    }
  };



  const getMessageClasses = () => {
    if (message.includes("successful")) {
      return "bg-green-100 border-green-400 text-green-700";
    } else if (message) {
      return "bg-red-100 border-red-400 text-red-700";
    }
    return "";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        
       
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Login to Your Account
        </h1>

        
        {message && (
          <div
            className={`p-3 mb-4 text-sm border rounded-lg ${getMessageClasses()}`}
            role="alert"
          >
            {message}
          </div>
        )}

       
        <form onSubmit={handleSubmit} className="space-y-6">
          
       
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"

              required
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm disabled:bg-gray-50"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm disabled:bg-gray-50"
              placeholder="••••••••"
            />
          </div>

        
          <button
            type="submit"
            
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 disabled:bg-indigo-400 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" passHref>
            <span className="text-indigo-600 cursor-pointer hover:text-indigo-800 hover:underline font-medium">
              Create one
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}