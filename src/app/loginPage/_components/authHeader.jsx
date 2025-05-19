// app/login/components/AuthHeader.jsx
import { FcLock } from 'react-icons/fc';
import React from 'react';

const AuthHeader = () => {
  return (
    <div className="text-center">
      <FcLock className="text-5xl mx-auto mb-2" />
      <h1 className="text-2xl font-semibold text-zinc-800 dark:text-white">Welcome Back</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">Please sign in to your account</p>
    </div>
  );
};

export default AuthHeader;
