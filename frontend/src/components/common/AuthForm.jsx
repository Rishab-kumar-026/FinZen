import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import toast from 'react-hot-toast';
import axios from 'axios';

const AuthForm = ({ isLogin = true }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await axios.post(endpoint, formData);
      toast.success(isLogin ? 'Login successful' : 'Registered successfully');

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        // Redirect to dashboard
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <Input
        label="Password"
        type="password"
        value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <Button type="submit">{isLogin ? 'Login' : 'Register'}</Button>
    </form>
  );
};

export default AuthForm;
