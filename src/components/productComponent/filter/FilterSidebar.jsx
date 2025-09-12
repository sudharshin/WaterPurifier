import React, { useState, useEffect } from "react";

const FilterSidebar = ({ products, onFilterChange }) => {
  const [filters, setFilters] = useState({});
  const [allKeys, setAllKeys] = useState([]);

  // Get unique fields dynamically from product data
  useEffect(() => {
    if (products && products.length > 0) {
      const keys = [...new Set(products.flatMap((p) => Object.keys(p)))];
      setAllKeys(keys);
    }
  }, [products]);

  // Get unique values for each field
  const getUniqueValues = (field) => {
    return [...new Set(products.map((p) => p[field]).filter(Boolean))];
  };

  const handleCheckboxChange = (field, value) => {
    setFilters((prev) => {
      const prevValues = prev[field] || [];
      const newValues = prevValues.includes(value)
        ? prevValues.filter((v) => v !== value) // remove
        : [...prevValues, value]; // add

      const updatedFilters = { ...prev, [field]: newValues };
      onFilterChange(updatedFilters); // notify parent
      return updatedFilters;
    });
  };

  return (
    <div className="filter-sidebar p-3 border rounded">
      <h5 className="mb-3">Filter</h5>
      {allKeys.map((key) => {
        const values = getUniqueValues(key);
        if (values.length === 0) return null; // skip if no values
        return (
          <div key={key} className="mb-2">
            <details>
              <summary className="fw-bold">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </summary>
              {values.map((value) => (
                <div key={value} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`${key}-${value}`}
                    onChange={() => handleCheckboxChange(key, value)}
                    checked={filters[key]?.includes(value) || false}
                  />
                  <label
                    htmlFor={`${key}-${value}`}
                    className="form-check-label"
                  >
                    {value}
                  </label>
                </div>
              ))}
            </details>
          </div>
        );
      })}
    </div>
  );
};

export default FilterSidebar;
