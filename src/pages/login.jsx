import { useState, useContext } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/authContext';  

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);  

  const handleLogin = async () => {
    try {
      const res = await API.post('/users/login', form);
      const token = res.data.token;
      localStorage.setItem('token', token);
      login(token);  
      toast.success('Login successful');
      navigate('/'); 
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 to-slate-800 px-4">
      <div className="relative w-full max-w-sm p-8 my-10 bg-slate-800/50 border border-slate-600 rounded-2xl backdrop-blur-lg shadow-[0_0_20px_rgba(0,0,0,0.3)]">
        <h1 className="text-3xl font-bold text-white text-center mb-6 tracking-wide">
          Login
        </h1>

        <div className="mb-5">
          <label className="block text-slate-300 text-lg mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-4 py-3 text-base bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label className="block text-slate-300 text-lg mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 text-base bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full cursor-pointer bg-gradient-to-r from-teal-800 to-teal-200 hover:from-teal-200 hover:to-teal-800 text-white text-2xl font-bold py-3 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Login
        </button>

        <p className="mt-5 text-center text-slate-400 text-sm">
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
