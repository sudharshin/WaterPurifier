import React from "react";
import ProductListing from "./ProductListing";
import purifier from "../assets/WaterPurifierimg.jpg";
import purifier2 from "../assets/WaterPurifierimg2.jpg";

export const products = [
  {
    id: 1,
    title: "Purifier Model 1",
    image: purifier,
    desc: "Compact purifier with smart technology.",
    price: "₹ 20,000",

    // 🔽 filter fields
    membrane: "Membrella - Alpha - 80 GPD",
    panel: "Steel",
    model: "X100",
    skid: "Skid-01",
    membraneBrand: "Membrella",
    usedIn: "Domestic",
    brand: "AquaPure",
    gpd: "80",
    type: "RO",
    length: "10 inch",
    technology: "Reverse Osmosis",
    speciality: "High Efficiency"
  },
  {
    id: 2,
    title: "Purifier Model 2",
    image: purifier2,
    desc: "High-performance water purifier for families.",
    price: "₹ 18,000",

    membrane: "MEMBRELLA - BETA - 4040",
    panel: "Plastic",
    model: "X200",
    skid: "Skid-02",
    membraneBrand: "Membrana",
    usedIn: "Commercial",
    brand: "HydroMax",
    gpd: "4040",
    type: "UF",
    length: "20 inch",
    technology: "Ultra Filtration",
    speciality: "Low Cost"
  },
  {
    id: 3,
    title: "Purifier Model 3",
    image: purifier,
    desc: "Stylish design with efficient filtering.",
    price: "₹ 22,000",

    membrane: "Hydranautics ESPA2 - 100 GPD",
    panel: "ABS Plastic",
    model: "X300",
    skid: "Skid-03",
    membraneBrand: "Hydranautics",
    usedIn: "Industrial",
    brand: "PureTech",
    gpd: "100",
    type: "RO",
    length: "15 inch",
    technology: "Reverse Osmosis",
    speciality: "Energy Saving"
  },
  {
    id: 4,
    title: "Purifier Model 4",
    image: purifier2,
    desc: "Energy-saving purifier with advanced features.",
    price: "₹ 19,500",

    membrane: "Dow Filmtec BW30-400",
    panel: "Steel",
    model: "X400",
    skid: "Skid-04",
    membraneBrand: "Dow",
    usedIn: "Commercial",
    brand: "CrystalClear",
    gpd: "400",
    type: "NF",
    length: "40 inch",
    technology: "Nano Filtration",
    speciality: "High Flow"
  },
  {
    id: 5,
    title: "Purifier Model 5",
    image: purifier,
    desc: "Durable build and easy to maintain.",
    price: "₹ 21,000",

    membrane: "Toray TM720-400",
    panel: "Plastic",
    model: "X500",
    skid: "Skid-05",
    membraneBrand: "Toray",
    usedIn: "Domestic",
    brand: "AquaFlow",
    gpd: "200",
    type: "RO",
    length: "12 inch",
    technology: "Reverse Osmosis",
    speciality: "Compact Design"
  },
  {
    id: 6,
    title: "Purifier Model 6",
    image: purifier2,
    desc: "Budget-friendly purifier with solid performance.",
    price: "₹ 20,500",

    membrane: "Pentair - CSM 100 GPD",
    panel: "ABS Plastic",
    model: "X600",
    skid: "Skid-06",
    membraneBrand: "Pentair",
    usedIn: "Industrial",
    brand: "HydroFresh",
    gpd: "100",
    type: "UF",
    length: "25 inch",
    technology: "Ultra Filtration",
    speciality: "Durable Build"
  },
  {
    id: 7,
    title: "Purifier Model 7",
    image: purifier,
    desc: "Premium model with smart alerts.",
    price: "₹ 23,000",

    membrane: "Koch TFC-HR 150 GPD",
    panel: "Steel",
    model: "X700",
    skid: "Skid-07",
    membraneBrand: "Koch",
    usedIn: "Commercial",
    brand: "ClearStream",
    gpd: "150",
    type: "RO",
    length: "20 inch",
    technology: "Reverse Osmosis",
    speciality: "Long Life"
  },
  {
    id: 8,
    title: "Purifier Model 8",
    image: purifier2,
    desc: "Compact purifier for modern kitchens.",
    price: "₹ 24,000",

    membrane: "LG Chem NanoH2O - 400 GPD",
    panel: "Plastic",
    model: "X800",
    skid: "Skid-08",
    membraneBrand: "LG Chem",
    usedIn: "Industrial",
    brand: "BlueDrop",
    gpd: "400",
    type: "NF",
    length: "30 inch",
    technology: "Nano Filtration",
    speciality: "Eco Friendly"
  }
];

const ProductSection = () => {
  return (
    <>
      <ProductListing
        title="Top Selling Products"
        description="Explore our top-selling water purifiers, trusted by thousands of families."
        products={products}
      />
      <ProductListing
        title="Featured Products"
        description="Check out our featured models with the latest technology."
        products={products}
      />
      <ProductListing
        title="Budget Friendly Products"
        description="Affordable purifiers that don’t compromise on quality."
        products={products}
      />
    </>
  );
};

export default ProductSection;
