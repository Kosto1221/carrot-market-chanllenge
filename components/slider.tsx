"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://via.placeholder.com/800x400?text=Image+1",
  "https://via.placeholder.com/800x400?text=Image+2",
  "https://via.placeholder.com/800x400?text=Image+3",
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleDotClick = (index: any) => {
    setCurrentIndex(index);
  };

  const variants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative">
        <div className="overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={images[currentIndex]}
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.5 }}
              style={{ width: "100%", borderRadius: "10px" }}
              className="aspect-square w-full rounded-xl bg-white"
            />
          </AnimatePresence>
        </div>
        <div className="flex justify-center mt-3">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => handleDotClick(index)}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: currentIndex === index ? "#facc14" : "#FDE9BF",
                margin: "0 5px",
                cursor: "pointer",
                opacity: "",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
