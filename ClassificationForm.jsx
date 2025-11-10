// src/components/ClassificationForm.jsx
import React, { useState } from "react";
import axios from "axios";
import ResultCard from "./ResultCard";

const ClassificationForm = () => {
  const [formData, setFormData] = useState({
    DNI: "",
    DIF: "",
    GHI: "",
    GTI: "",
    PVOUT: "",
    TEMP: "",
    X: "",
    Y: "",
    water_area: "",
    urban_area: "",
    forests_area: "",
    protected_area: "",
    DNI_to_GHI_ratio: "",
    GTI_to_GHI_ratio: "",
    Diffuse_fraction: "",
    TEMP_log: "",
    X_sin: "",
    X_cos: "",
    Y_sin: "",
    Y_cos: "",
    Solar_Potential_Index: "",
    Suitability_Index: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {};
      Object.keys(formData).forEach((k) => {
        payload[k] = formData[k] === "" ? null : parseFloat(formData[k]);
      });

      const response = await axios.post("http://localhost:5001/predict", payload);
      // might return Predicted_Class or Predicted_Site_Suitability depending on backend
      const predicted = response.data.Predicted_Class || response.data.Predicted_Site_Suitability || response.data.prediction;
      setResult(predicted);
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Prediction error: check classification backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Site Suitability Classification</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type="number"
            step="any"
            name={key}
            placeholder={key}
            value={formData[key]}
            onChange={handleChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className="col-span-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
        >
          {loading ? "Predicting..." : "Predict Suitability"}
        </button>
      </form>

      <ResultCard title="Predicted Suitability Class" result={result} />
    </div>
  );
};

export default ClassificationForm;
