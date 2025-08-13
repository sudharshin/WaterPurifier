import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import purifier from "/src/assets/WaterPurifierimg.jpg";

const ProductHighlight = () => {
  return (
    <div className="container py-5">
      {/* Top Heading */}
      <h3 className="fw-bold mb-5 text-center">
        PURE WATER • WORLD STANDARD • GREAT OFFER
      </h3>

      <div className="row align-items-center justify-content-center">
        {/* Left Content */}
        <div className="col-md-4 text-md-start text-center">
          <h5 className="fw-semibold">Premium RO Water Purifier Combo</h5>
          <p className="text-muted">
            Multi-stage filtration with UV + UF technology
          </p>
          <h4 className="fw-bold text-dark">₹4,499</h4>
          <button className="btn btn-primary mt-2 px-4 py-2 rounded-pill">
            Add to Cart 🛒
          </button>
        </div>

        {/* Middle Image */}
        <div className="col-md-4 d-flex justify-content-center">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "#e8f4ff",
              width: "280px",
              height: "280px",
            }}
          >
            <img
              src={purifier}
              alt="Premium RO Water Purifier"
              className="img-fluid"
              style={{ maxHeight: "330px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHighlight;
