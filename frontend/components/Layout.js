// frontend/components/Layout.js
import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-blue-50 text-gray-800 font-sans"
    >
      <Head>
        <title>Secure E-Voting System</title>
        <meta name="description" content="A secure and user-friendly e-voting platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50 backdrop-blur bg-opacity-80">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold tracking-wide">🔐 Secure E-Voting</h1>
          <nav className="space-x-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="/login" className="hover:underline">Login</a>
            <a href="/register" className="hover:underline">Register</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow px-4 py-8 max-w-4xl mx-auto">{children}</main>

      <footer className="bg-blue-600 text-white text-center py-4 mt-10">
        &copy; {new Date().getFullYear()} Secure E-Voting System. All rights reserved.
      </footer>
    </motion.div>
  );
};

export default Layout;
