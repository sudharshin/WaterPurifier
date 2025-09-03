import React from 'react';
import ProductHighlight from '../components/ProductHighlight';
import ProductsGrid from '../components/ProductsGrid';
import ConsultationButton from '../components/ConsultationButton';
import ClientsSection from '../components/ClientsSection';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TopSellingProducts from '../components/TopSellingProducts';
import WhyChooseUs from '../components/WhyChooseUs';
import Footer from './Footer';
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
       <section id="home">
        <HeroSection />
      </section>

      <section id="about">
        <ProductSection />
      </section>

      <section id="enquiry">
        <EnquirySection />
      </section>

    </div>
  );
};

export default Home; 