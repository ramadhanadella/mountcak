import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [mountains, setMountains] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    altitude: "",
    difficulty_level: 1,
    description: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/mountains", formData);
      alert("Gunung berhasil ditambahkan!");

      setFormData({
        name: "",
        location: "",
        altitude: "",
        difficulty_level: "",
        description: "",
      });

      getMountains();
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan gunung.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 md:p-12">
      <h2 className="text-4xl font-bold text-emerald-400 mb-10 text-center">
        Mountcak
      </h2>

      <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-2xl border border-slate-700 mb-12 shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-emerald-300">
          Tambah Gunung
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Nama Gunung"
            className="p-3 bg-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Lokasi"
              className="p-3 bg-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Ketinggian (MDPL)"
              className="p-3 bg-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.altitude}
              onChange={(e) =>
                setFormData({ ...formData, altitude: e.target.value })
              }
            />
          </div>
          <select
            className="p-3 bg-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            value={formData.difficulty_level}
            onChange={(e) =>
              setFormData({ ...formData, difficulty_level: e.target.value })
            }
          >
            <option value={1}>Mudah</option>
            <option value={2}>Sedang</option>
            <option value={3}>Sulit</option>
          </select>
          <textarea
            placeholder="Deskripsi"
            className="p-3 bg-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 h-32 resize-none"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
          >
            Simpan Gunung
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mountains.map((mt) => (
          <div
            key={mt.id}
            className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg"
          >
            <h3 className="text-xl font-bold text-emerald-400">{mt.name}</h3>
            <p className="text-slate-400 text-sm">
              {mt.location} | {mt.altitude}MDPL
            </p>
            <p className="mt-3 text-slate-300 text-sm italic">
              {mt.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
