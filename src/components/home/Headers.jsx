// src/components/HomePage.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="font-bold text-2xl">opor</div>
      <nav className="flex space-x-6">
        <a href="#" className="hover:text-blue-500">Home</a>
        <a href="#" className="hover:text-blue-500">About Us</a>
        <a href="#" className="hover:text-blue-500">Products</a>
        <a href="#" className="hover:text-blue-500">Contact</a>
      </nav>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">Login</button>
      </div>
    </header>
  );
};

const HeroSection = () => {
  return (
    <section className="relative bg-blue-500 p-16 text-white flex items-center justify-center space-x-12 min-h-[500px]">
      <button className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-30 hover:bg-opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="flex-1 max-w-lg">
        <h1 className="text-5xl font-bold mb-4">Clean Water, Healthy Life.</h1>
        <p className="text-lg mb-6">Advanced purification technologies for home and commercial needs.</p>
        <button className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100">Shop Now</button>
        <div className="mt-8 flex space-x-4">
          <button className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-blue-500 transition">Get Our Products</button>
          <button className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-blue-500 transition">Contact</button>
        </div>
      </div>
      <div className="flex-1 relative">
      </div>
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-30 hover:bg-opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
};

const ProductCard = () => {
  return (
    <div className="w-64 h-80 bg-gray-200 rounded-lg shadow-md animate-pulse"></div>
  );
};

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Header />
      <main>
        <HeroSection />
        <section className="p-8">
          <h2 className="text-3xl font-bold mb-4">Top-Selling Product</h2>
          <div className="flex justify-between space-x-4">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </section>
        <section className="p-8 flex space-x-8">
          <div className="w-1/2 h-96 bg-gray-200 rounded-lg shadow-md animate-pulse"></div>
          <div className="w-1/2 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <div className="h-48 bg-gray-200 animate-pulse"></div>
          </div>
        </section>
        <section className="p-8 flex space-x-8">
          <div className="w-1/3 h-48 bg-gray-200 rounded-lg shadow-md animate-pulse"></div>
          <div className="w-1/3 h-48 bg-gray-200 rounded-lg shadow-md animate-pulse"></div>
          <div className="w-1/3 h-48 bg-gray-200 rounded-lg shadow-md animate-pulse"></div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;