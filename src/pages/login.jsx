import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post('/users/login', form);
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      navigate('/');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 to-slate-800">
      <div className="relative w-full max-w-lg p-10 bg-slate-800/50 border border-slate-600 rounded-3xl backdrop-blur-lg shadow-[0_0_30px_rgba(0,0,0,0.3)]">
        <h1 className="text-5xl font-bold text-white text-center mb-8 tracking-wide">
          Sign In
        </h1>

        <div className="mb-6">
          <label className="block text-slate-300 text-2xl mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-5 py-4 text-lg bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="mb-8">
          <label className="block text-slate-300 text-2xl mb-2">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-5 py-4 text-lg bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full cursor-pointer bg-gradient-to-r from-teal-800 to-teal-200 hover:from-teal-200 hover:to-teal-800 text-white text-3xl font-bold py-4 rounded-xl shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Login
        </button>

        <p className="mt-6 text-center text-slate-400 text-md">
          Don't have an account?{' '}
          <a href="/register" className="underline hover:text-white transition">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
