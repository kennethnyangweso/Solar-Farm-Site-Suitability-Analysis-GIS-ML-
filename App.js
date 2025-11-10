// src/App.js
import React from "react";
import RegressionForm from "./components/RegressionForm";
import ClassificationForm from "./components/ClassificationForm";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-green-50 p-6">
      <header className="max-w-5xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">☀️ Solar Site Reliability Dashboard</h1>
      </header>

      <main className="max-w-5xl mx-auto grid gap-6">
        <RegressionForm />
        <ClassificationForm />
      </main>
    </div>
  );
}

export default App;

