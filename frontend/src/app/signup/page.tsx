"use client";
import { useState } from "react";
import axios from "axios";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    roles: "user",
  });
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://backened-internshala-auth.onrender.com/auth/signup",
        form,
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage(res.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-xl p-8 w-full max-w-md border border-gray-200">
        
       
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <select
            name="roles"
            value={form.roles}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer">
            Sign Up
          </button>
        </form>

        {/* Message */}
        <p className="mt-4 text-center text-gray-700">{message}</p>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
