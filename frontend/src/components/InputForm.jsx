import { useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

function InputForm({ onPredict, loading }) {
    const [experience, setExperience] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onPredict(experience);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            {/* Input Field */}
            <div className="relative">
                <FaUserTie className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />

                <input
                    type="number"
                    min="0"   // ✅ prevents negative
                    step="0.1"
                    placeholder="Years of Experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 outline-none focus:ring-2 focus:ring-white transition"
                    required
                />
            </div>

            {/* Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-indigo-100 transition disabled:opacity-70"
            >
                {loading ? (
                    <>
                        <ImSpinner2 className="animate-spin" />
                        Processing...
                    </>
                ) : (
                    "Predict Salary"
                )}
            </button>

        </form>
    );
}

export default InputForm;