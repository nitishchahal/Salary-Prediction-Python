import { MdTrendingUp } from "react-icons/md";

function ResultCard({ salary, error }) {
  if (error) {
    return (
      <div className="mt-4 p-3 rounded-lg bg-red-500/20 border border-red-400 text-red-200 text-sm">
        ⚠ {error}
      </div>
    );
  }

  if (!salary) return null;

  return (
    <div className="mt-5 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-center">

      {/* Label */}
      <p className="text-white/70 text-sm mb-1">
        Estimated Salary
      </p>

      {/* Value */}
      <div className="flex items-center justify-center gap-2 text-green-300 text-xl font-bold">
        <MdTrendingUp className="text-2xl" />
        ₹ {salary.toLocaleString()}
      </div>

    </div>
  );
}

export default ResultCard;