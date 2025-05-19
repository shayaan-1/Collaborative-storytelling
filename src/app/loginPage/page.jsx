// app/login/page.jsx
import React from 'react';
import LoginForm from './_components/LoginForm';
import AuthHeader from './_components/AuthHeader';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-md">
        <AuthHeader />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
