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
const Home = () => {
  return (
    <div className="container-fluid">
      <Navbar />
      <HeroSection/>
      <TopSellingProducts />
      <WhyChooseUs />
      <ProductHighlight />
      <ProductsGrid />
      <ConsultationButton />
      <ClientsSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Home;
