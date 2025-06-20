import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post('/users/register', form);
      // Auto-login after registration
      const res = await API.post('/users/login', {
        email: form.email,
        password: form.password,
      });
      localStorage.setItem('token', res.data.token);
      toast.success('Registration and login successful');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 to-slate-800 px-4">
      <div className="relative w-full max-w-sm p-8 my-10 bg-slate-800/50 border border-slate-600 rounded-2xl backdrop-blur-lg shadow-[0_0_20px_rgba(0,0,0,0.3)]">

        <h1 className="text-3xl font-bold text-white text-center mb-6 tracking-wide">
          Register
        </h1>

        <div className="mb-5">
          <label className="block text-slate-300 text-lg mb-1">First Name</label>
          <input
            type="text"
            placeholder="Enter your first name"
            className="w-full px-4 py-3 text-base bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
            onChange={e => setForm({ ...form, firstName: e.target.value })}
          />
        </div>

        <div className="mb-5">
          <label className="block text-slate-300 text-lg mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name"
            className="w-full px-4 py-3 text-base bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
            onChange={e => setForm({ ...form, lastName: e.target.value })}
          />
        </div>

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
          onClick={handleRegister}
          className="w-full cursor-pointer bg-gradient-to-r from-teal-800 to-teal-200 hover:from-teal-200 hover:to-teal-800 text-white text-2xl font-bold py-3 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Register
        </button>

        <p className="mt-5 text-center text-slate-400 text-sm">
          Already have an account?{' '}
          <a href="/login" className="underline hover:text-white transition">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
