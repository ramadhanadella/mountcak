import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [mountains, setMountains] = useState([]);

  useEffect(() => {
    const getMountains = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/mountains");
        setMountains(response.data);
      } catch (error) {
        console.error("Error fetching mountains:", error);
      }
    };

    getMountains();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">
        Daftar Gunung 🏔️
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mountains.map((mountain) => (
          <div
            key={mountain.id}
            className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-emerald-500 transition-all"
          >
            <h2 className="text-2xl font-bold text-emerald-300">
              {mountain.name}
            </h2>
            <p className="text-slate-400 mb-2">
              {mountain.location} | {mountain.altitude} MDPL
            </p>
            <p className="text-slate-300 text-sm">{mountain.description}</p>
            <div className="mt-4 inline-block px-3 py-1 bg-emerald-600 rounded-full text-xs font-bold">
              Level {mountain.difficulty_level}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
