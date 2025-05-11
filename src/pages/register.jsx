import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await API.post('/users/register', form);
      alert("Registered successfully");
      navigate('/login');
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-800 rounded shadow text-white">
      <h2 className="text-xl mb-4 text-purple-400">Register</h2>
      <input className="border p-2 w-full mb-2 bg-gray-700 text-white" placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })} />
      <input className="border p-2 w-full mb-2 bg-gray-700 text-white" placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" className="border p-2 w-full mb-2 bg-gray-700 text-white" placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2" onClick={handleSubmit}>
        Register
      </button>
    </div>
  );
};

export default Register;
