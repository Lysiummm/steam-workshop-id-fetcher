export default function App() {
  const [modNames, setModNames] = useState("");
  const [modIds, setModIds] = useState("");
  const [loading, setLoading] = useState(false);

  const STEAM_API_KEY = "6DC8511E1613570B46830BB0D171EC8A"; // Replace with your real API key

  const fetchWorkshopIDs = async () => {
    setLoading(true);
    try {
      const modsArray = modNames.split(";").map((mod) => mod.trim());

      const ids = await Promise.all(
        modsArray.map(async (mod) => {
          // Fetch from Steam Workshop API (example)
          const response = await fetch(
            `https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/`,
            {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                key: STEAM_API_KEY,
                itemcount: "1",
                "publishedfileids[0]": mod, // Needs actual workshop file IDs
              }),
            }
          );

          const data = await response.json();
          return data.response.publishedfiledetails[0]?.publishedfileid || "Not Found";
        })
      );

      setModIds(ids.join("; "));
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