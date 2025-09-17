import React from 'react';
import ProductSection from './ProductSection';
import EnquirySection from './EnquirySection';
import HeroSection from './HeroSection';

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