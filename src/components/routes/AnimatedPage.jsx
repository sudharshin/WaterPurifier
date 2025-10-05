import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5,
};

const loaderStyles = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "#fff",
  zIndex: 9999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const spinnerStyles = {
  width: 40,
  height: 40,
  border: "4px solid #ddd",
  borderTopColor: "#3498db",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};

const injectKeyframes = () => {
  if (document.getElementById("spin-keyframes")) return;
  const style = document.createElement("style");
  style.id = "spin-keyframes";
  style.innerHTML = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
};

const AnimatedPage = ({ children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    injectKeyframes();

    // Immediately scroll to top BEFORE rendering
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // Prevent scroll until ready
    document.body.style.overflow = "hidden";

    // Delay to allow scroll + layout paint to complete
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        setReady(true);
        document.body.style.overflow = ""; // restore scroll
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      document.body.style.overflow = "";
    };
  }, []);

  if (!ready) {
    return (
      <div style={loaderStyles}>
        <div style={spinnerStyles}></div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
