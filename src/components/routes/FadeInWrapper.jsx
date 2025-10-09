import React, { useEffect, useState } from "react";

const FadeInWrapper = ({ children, duration = 800 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable scroll immediately
    document.body.style.overflow = "hidden";

    const onLoad = () => {
      setIsVisible(true);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      window.removeEventListener("load", onLoad);
      // Re-enable scroll when unmounting or fade-in done
      document.body.style.overflow = "auto";
    };
  }, []);

  // When visible, allow scrolling
  useEffect(() => {
    if (isVisible) {
      // After fade-in duration, re-enable scroll just in case
      const timer = setTimeout(() => {
        document.body.style.overflow = "auto";
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${duration}ms ease-in-out`,
        pointerEvents: isVisible ? "auto" : "none",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
};

export default FadeInWrapper;
