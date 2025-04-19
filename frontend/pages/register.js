// frontend/pages/register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpUri, setOtpUri] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', { email, password });
      setOtpUri(response.data.otp_uri);
      setStep(2);
      setError('');
    } catch {
      setError('Registration failed. Please try again.');
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register/verify', { email, otp });
      localStorage.setItem('token', response.data.access_token);
      router.push('/vote');
    } catch {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {step === 1 ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 ring-green-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 ring-green-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
              Register
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-700 text-center">Scan this QR code with your authenticator app:</p>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(otpUri)}`}
              alt="QR Code"
              className="mx-auto w-48"
            />
            <form onSubmit={handleOtpVerify} className="space-y-4">
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 ring-blue-300"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                Verify OTP
              </button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Register;
