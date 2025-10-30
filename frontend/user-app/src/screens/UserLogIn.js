import React, { useState } from 'react';

const UserLogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password });
  };

  return (
    <div className="flex min-h-screen w-full">
      <div 
        className="flex-1 bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
        style={{ backgroundImage: "url('sign-in-background.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <h1 className="relative z-10 text-white text-6xl font-light tracking-widest text-center leading-tight uppercase font-serif">
          COLOMBO<br />BOOK FAIR
        </h1>
      </div>
      
      <div className="flex-1 bg-gray-100 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-light mb-12 text-center text-gray-800 font-serif">
            Login
          </h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-base text-gray-800 font-normal">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="px-5 py-3.5 text-base border border-gray-300 rounded-full outline-none transition-colors duration-300 bg-white focus:border-orange-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-base text-gray-800 font-normal">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="px-5 py-3.5 text-base border border-gray-300 rounded-full outline-none transition-colors duration-300 bg-white focus:border-orange-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="mt-4 px-8 py-3.5 text-base font-medium text-white bg-orange-700 border-none rounded-full cursor-pointer transition-all duration-300 hover:bg-orange-800 hover:-translate-y-0.5 active:translate-y-0"
            >
              Login
            </button>

            <p className="text-center mt-6 text-sm text-gray-600">
              Don't have an account?{' '}
              <a 
                href="/signin" 
                className="text-orange-700 no-underline font-medium transition-colors duration-300 hover:text-orange-800 hover:underline"
              >
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogIn;