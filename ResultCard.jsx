// src/components/ResultCard.jsx
import React from "react";

const ResultCard = ({ title, result }) => {
  if (result === null || result === undefined) return null;

  return (
    <div className="mt-6 p-4 bg-white border rounded-lg shadow-md text-center">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-green-600">{result}</p>
    </div>
  );
};

export default ResultCard;
