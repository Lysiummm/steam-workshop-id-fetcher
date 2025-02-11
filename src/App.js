import React, { useState } from "react";
export default function App() {
  const [modNames, setModNames] = useState("");
  const [modIds, setModIds] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWorkshopIDs = async () => {
    setLoading(true);
    try {
      const modsArray = modNames.split(";").map((mod) => mod.trim());
      const ids = await Promise.all(
        modsArray.map(async (mod) => {
          // Simulated API call - Replace with actual Steam Workshop API
          return `FakeID_${mod}`;
        })
      );
      setModIds(ids.join(";"));
    } catch (error) {
      console.error("Error fetching mod IDs:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Steam Workshop ID Fetcher</h1>
      <textarea
        className="w-full border p-2 mb-2"
        rows="5"
        placeholder="Paste mod names separated by semicolons"
        value={modNames}
        onChange={(e) => setModNames(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={fetchWorkshopIDs}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Get Workshop IDs"}
      </button>
      {modIds && (
        <div className="mt-4 p-2 border">
          <h2 className="font-semibold">Workshop IDs:</h2>
          <p className="break-words">{modIds}</p>
        </div>
      )}
    </div>
  );
}
