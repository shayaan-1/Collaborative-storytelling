import React from 'react';
import RegisterForm from './_components/registerForm';

const RegisterPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
          Create Your Account
        </h1>
        <RegisterForm />
      </div>
    </main>
  );
};

export default RegisterPage;
