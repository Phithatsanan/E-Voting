// frontend/pages/login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/login', { email, password });
      setStep(2);
      setError('');
    } catch {
      setError('Invalid email or password.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/otp', { email, otp });
      localStorage.setItem('token', res.data.access_token);
      router.push('/vote');
    } catch {
      setError('Incorrect OTP. Try again.');
    }
  };

  return (
    <Layout>
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {step === 1 ? (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
              Next
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 ring-green-300"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default Login;
