import { useEffect, useState } from "react";

interface Asset {
  id: number;
  name: string;
  category: string;
  status: "operational" | "maintenance" | "offline";
}

function AssetList() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAssets() {
      try {
        const res = await fetch("http://localhost:3000/api/assets");
        const data: Asset[] = await res.json();
        setAssets(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load assets");
        setLoading(false);
      }
    }

    loadAssets();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {assets.map((asset) => (
        <li key={asset.id}>
          {asset.name} — {asset.category} — {asset.status}
        </li>
      ))}
    </ul>
  );
}

export default AssetList;
