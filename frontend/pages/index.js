// frontend/pages/index.js
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <Layout>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h2 className="text-4xl font-extrabold mb-4">Welcome to Secure E-Voting</h2>
        <p className="text-lg text-gray-600 mb-10">Cast your vote safely and easily from anywhere.</p>
        <div className="flex justify-center gap-6">
          <Link href="/login">
            <a className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow transition">
              Login
            </a>
          </Link>
          <Link href="/register">
            <a className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow transition">
              Register
            </a>
          </Link>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Home;
