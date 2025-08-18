import React from 'react';
import ProductHighlight from '../components/ProductHighlight';
import ProductsGrid from '../components/ProductsGrid';
import ConsultationButton from '../components/ConsultationButton';
import ClientsSection from '../components/ClientsSection';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TopSellingProducts from '../components/TopSellingProducts';
import WhyChooseUs from '../components/WhyChooseUs';
import Footer from '../components/Footer';
import FAQSection from './FAQSection';
import OurProducts from './OurProducts';
import ProductListing from './ProductListing';
import ProductSection from './ProductSection';
import EnquirySection from './EnquirySection';
import ProductDetailsPage from './ProductDetailsPage';
import { Routes, Route } from "react-router-dom";

const Home = () => {
  return (
    <div className="container-fluid">
      <HeroSection/>
      <ProductSection />
      <EnquirySection />
      <ProductDetailsPage title="Our Products" description="Browse our best picks" />
    </div>
  );
};

export default Home; 