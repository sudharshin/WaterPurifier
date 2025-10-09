// ProductDetailsWrapper.jsx
import React, { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";

const ProductDetailsWrapper = () => {
  const { id } = useParams();

  return <ProductDetails key={id} id={id} />;
};

export default ProductDetailsWrapper;
