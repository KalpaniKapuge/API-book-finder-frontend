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
      alert("Login successful");
      navigate('/');
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-800 rounded shadow text-white">
      <h2 className="text-xl mb-4 text-purple-400">Login</h2>
      <input className="border p-2 w-full mb-2 bg-gray-700 text-white" placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" className="border p-2 w-full mb-2 bg-gray-700 text-white" placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;