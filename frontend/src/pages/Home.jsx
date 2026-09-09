import { useState } from "react";
import InputForm from "../components/InputForm";
import ResultCard from "../components/ResultCard";
import ChartSection from "../components/ChartSection";
import { FaBriefcase } from "react-icons/fa";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

function Home() {
  const [salary, setSalary] = useState(null);
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async (exp) => {
    setLoading(true);
    setError("");
    setSalary(null);

    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ experience: exp }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setSalary(data.salary);
      setExperience(exp);
    } catch (err) {
      setError("⚠ Unable to connect to server");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 px-4">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center text-white">
        <div className="flex items-center justify-center gap-2 mb-6">
          <FaBriefcase className="text-yellow-300" />
          <h2 className="text-2xl font-semibold tracking-wide">
            Salary Predictor
          </h2>
        </div>

        <InputForm onPredict={handlePredict} loading={loading} />
        <ResultCard salary={salary} error={error} />
        <ChartSection
          apiUrl={API_URL}
          currentSalary={salary}
          currentExp={experience}
        />
      </div>
    </div>
  );
}

export default Home;
