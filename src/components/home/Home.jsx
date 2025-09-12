import React from 'react';
import ProductHighlight from '../ProductHighlight';
import ProductsGrid from '../ProductsGrid';
import ConsultationButton from './ConsultationButton';
import ClientsSection from './ClientsSection';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import TopSellingProducts from './TopSellingProducts';
import WhyChooseUs from './WhyChooseUs';
import Footer from './Footer';
import FAQSection from './FAQSection';
import OurProducts from './OurProducts';
import ProductListing from './ProductListing';
import ProductSection from './ProductSection';
import EnquirySection from './EnquirySection';
import ProductDetailsPage from '../productComponent/ProductDetailsPage';
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