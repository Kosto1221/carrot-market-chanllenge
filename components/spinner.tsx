import React from "react";
import { motion } from "framer-motion";

// Define styles using CSSProperties to ensure correct typings
const styleContainer: React.CSSProperties = {
  position: "relative",
  width: 30,
  height: 30,
};

const styleSpan: React.CSSProperties = {
  display: "block",
  width: 30,
  height: 30,
  border: "5px solid #eee",
  borderTop: "5px solid #2D3134",
  borderRadius: "50%",
  boxSizing: "border-box",
  position: "absolute",
  top: 0,
  left: 0,
};

const spinTransition = {
  repeat: Infinity,
  ease: "easeInOut",
  duration: 0.5,
};

export const Spinner = () => {
  return (
    <div style={styleContainer}>
      <motion.span
        style={styleSpan}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  );
};
