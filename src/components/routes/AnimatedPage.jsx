import { motion } from "framer-motion";

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}

    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
