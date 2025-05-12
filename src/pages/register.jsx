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
    role: '',
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 to-slate-800">
      <div className="relative w-full max-w-lg p-10 bg-slate-800/50 border border-slate-600 rounded-3xl backdrop-blur-lg shadow-[0_0_30px_rgba(0,0,0,0.3)]">
        <h1 className="text-5xl font-bold text-white text-center mb-8 tracking-wide">
          Register
        </h1>

        <div className="mb-6">
          <label className="block text-slate-300 text-2xl mb-2">First Name</label>
          <input
            type="text"
            placeholder="Enter your first name"
            className="w-full px-5 py-4 text-lg bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
            onChange={e => setForm({ ...form, firstName: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label className="block text-slate-300 text-2xl mb-2">Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name"
            className="w-full px-5 py-4 text-lg bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
            onChange={e => setForm({ ...form, lastName: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label className="block text-slate-300 text-2xl mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter yout email address"
            className="w-full px-5 py-4 text-lg bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label className="block text-slate-300 text-2xl mb-2">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-5 py-4 text-lg bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>

        

        <button
          onClick={handleRegister}
          className="w-full  cursor-pointer bg-gradient-to-r  from-teal-800 to-teal-200 hover:from-teal-200 hover:to-teal-800 text-white text-3xl font-bold py-4 rounded-xl shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Register
        </button>

        <p className="mt-6 text-center text-slate-400 text-md">
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
