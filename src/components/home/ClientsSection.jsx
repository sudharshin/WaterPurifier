import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ClientsSection = () => {
  const placeholders = Array(2).fill(null); // Creates 6 placeholder items

  return (
    <div className="container py-5">
      <h5 className="mb-4">Our Happy Clients</h5>
      <div className="row g-4">
        {placeholders.map((_, index) => (
          <div className="col-6 col-md-4" key={index}>
            <div
              style={{
                backgroundColor: "#d9d9d9",
                width: "75%",
                paddingTop: "80%", // Makes it a square
                borderRadius: "8px",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsSection;
