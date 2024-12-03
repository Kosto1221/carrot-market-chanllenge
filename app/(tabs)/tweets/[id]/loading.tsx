"use client";

import React from "react";

const BouncingDotsLoader = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div
        className="w-4 h-4 bg-gray-500 rounded-full animate-bounce"
        style={{
          animationDelay: "0s",
          animationTimingFunction: "cubic-bezier(0.6, 0.05, 0.28, 0.91)",
        }}
      ></div>
      <div
        className="w-4 h-4 bg-gray-500 rounded-full animate-bounce"
        style={{
          animationDelay: "0.2s",
          animationTimingFunction: "cubic-bezier(0.6, 0.05, 0.28, 0.91)",
        }}
      ></div>
      <div
        className="w-4 h-4 bg-gray-500 rounded-full animate-bounce"
        style={{
          animationDelay: "0.4s",
          animationTimingFunction: "cubic-bezier(0.6, 0.05, 0.28, 0.91)",
        }}
      ></div>
    </div>
  );
};

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <BouncingDotsLoader />
    </div>
  );
}
