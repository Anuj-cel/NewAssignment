import axios from "axios";

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const res = await axios.get("https://backened-internshala-auth.onrender.com/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; 
  } catch (error) {
    return null;
  }
};
