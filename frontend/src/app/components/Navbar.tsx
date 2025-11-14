"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; 
import { useEffect, useState, useCallback } from "react"; 

interface UserData {
  name?: string;
  roles?: string;
 
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter(); 

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const readAuthStatus = useCallback(() => {
    const tk = localStorage.getItem("token");
    const usr = localStorage.getItem("user");

    setToken(tk);
    try {
      setUser(usr ? JSON.parse(usr) : null);
    } catch (e) {
      console.error("Failed to parse user data from localStorage:", e);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    readAuthStatus();

    window.addEventListener('focus', readAuthStatus);

    return () => {
   
      window.removeEventListener('focus', readAuthStatus);
    };
  }, [readAuthStatus]);

  const activeClass = (path: string) =>
    pathname === path ? "text-blue-400 font-semibold" : "text-gray-300";

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login"); 
  };

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        
        <Link href="/" className="text-blue-400 text-2xl font-bold">
          AuthApp
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className={activeClass("/")}>
            Home
          </Link>

          <Link href="/dashboard" className={activeClass("/dashboard")}>
            Dashboard
          </Link>

          {!token ? (
            <Link href="/login" className={activeClass("/login")}>
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-red-400 transition cursor-pointer"
            >
              Logout
            </button>
          )}

          {user && (
            <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
              <div className="w-7 h-7 bg-blue-600 text-white flex items-center justify-center rounded-full">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <span className="text-gray-200 text-sm">
              </span>
            </div>
          )}
        </div>

        <button
          className="md:hidden text-gray-300 text-3xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3 space-y-3 flex flex-col">
          <Link href="/" className={activeClass("/")}>
            Home
          </Link>

          <Link href="/dashboard" className={activeClass("/dashboard")}>
            Dashboard
          </Link>

          {!token ? (
            <Link href="/login" className={activeClass("/login")}>
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-red-400 transition block text-left w-full cursor-pointer"
            >
              Logout
            </button>
          )}

          {user && (
            <div className="flex items-center gap-3 bg-gray-700 p-3 rounded-lg mt-2">
              <div className="w-8 h-8 bg-blue-500 flex items-center justify-center rounded-full text-white">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <div className="text-gray-200">
                {user.name} • <span className="text-blue-400">{user.roles}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}