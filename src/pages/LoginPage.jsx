import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import Button from '../components/common/Button';
import AuthContext from '../context/AuthContext';
import {Formik, Form,Field,ErrorMessage} from "formik";
import axios from 'axios';
import *as Yup from "yup";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const location = useLocation();
  const state = location.state;
  const from = state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      await login(email, password);

      // Navigate to the page the user was trying to access, or home
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email:"",
        password:"",
      }}
      validationSchema={
        Yup.object({
          email:Yup.string().email("Invalid email").required("Email is Mandatory"),
          password:Yup.string().min(8,"Minimum 8 Char reqired").max(10,"Maximum 10 Char required").required("Password is Reqiured"),
        })
      }
    >
      {({values, setFieldValue})=>{

      }}

    <div className="page-container flex items-center justify-center py-12">
      <div className="bg-white rounded-lg shadow-sm w-full max-w-md p-8">
        <div className="text-center mb-8">
          <LogIn className="h-12 w-12 text-pink-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">Log in to FindMyHall</h1>
          <p className="text-gray-600 mt-2">Welcome back! Please enter your details.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            type="submit"
            isLoading={isLoading}
            >
            Log In
          </Button>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-pink-600 hover:text-pink-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
            </Formik>
  );
};

export default LoginPage;