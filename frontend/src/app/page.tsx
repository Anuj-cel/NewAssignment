"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
     
  

     
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Secure Role-Based Authentication App
        </motion.h2>
        <motion.p
          className="text-slate-300 max-w-2xl mb-8 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Manage users and admins effortlessly with modern authentication, JWT
          security, and a powerful dashboard — built using Next.js, Express, and
          MongoDB.
        </motion.p>
      </section>

    
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">What’s Inside</h3>
          <p className="text-slate-400 text-lg">
            Explore the main features of this full-stack project.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            title="Role-Based Access"
            desc="Sign up as a User or Admin and experience dynamic dashboards tailored to your role."
            icon="🧑‍💼"
          />
          <FeatureCard
            title="JWT Authentication"
            desc="Securely login and protect your routes using industry-standard JWT-based authentication."
            icon="🔒"
          />
          <FeatureCard
            title="Responsive Dashboard"
            desc="A protected dashboard that displays custom data for each logged-in user."
            icon="📊"
          />
        </div>
      </section>

    
      <section className="py-20 text-center">
        <h3 className="text-3xl font-semibold mb-4">
          Ready to experience secure authentication?
        </h3>
        <p className="text-slate-400 mb-6">
          Sign up now and explore both User and Admin views!
        </p>
        <Link
          href="/dashboard"
          className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-lg font-semibold rounded-lg"
        >
          Get Started
        </Link>
      </section>

     
      <footer className="border-t border-slate-800 py-6 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Authify. Built with ❤️ using Next.js + Express.</p>
      </footer>
    </main>
  );
}

function FeatureCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-md hover:shadow-blue-500/10 transition">
      <div className="text-5xl mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-slate-400">{desc}</p>
    </div>
  );
}
