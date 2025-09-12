// src/components/ScrollManager.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScrollToHashElement from "./ScrollToHashElement";
import ScrollToTop from "./ScrollToTop";

const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ If user is on any route other than "/" and tries to access a hash
    // redirect them to "/" with that hash
    if (hash && pathname !== "/") {
      navigate("/" + hash, { replace: true });
    }
  }, [pathname, hash, navigate]);

  // ✅ If URL has a hash → scroll to section
  if (hash) {
    return <ScrollToHashElement />;
  }

  // ✅ Otherwise → scroll to top
  return <ScrollToTop />;
};

export default ScrollManager;
