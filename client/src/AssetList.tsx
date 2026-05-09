import { useEffect } from "react";
import type { Asset } from "./types";
import.meta.env.VITE_API_URL;

interface Props {
  assets: Asset[];
  onAssetsLoaded: (assets: Asset[]) => void;
}

function AssetList({ assets, onAssetsLoaded }: Props) {
  useEffect(() => {
    async function loadAssets() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/assets`);
        const data: Asset[] = await res.json();
        onAssetsLoaded(data);
      } catch (err) {
        console.error("Failed to load assets", err);
      }
    }

    loadAssets();
  }, []);

  if (assets.length === 0)
    return <p className="text-gray-500 text-sm">No assets found.</p>;

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 px-6 py-4 border-b border-gray-200">
        Assets
      </h2>
      <ul className="divide-y divide-gray-100">
        {assets.map((asset) => (
          <li
            key={asset.id}
            className="px-6 py-4 flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">{asset.name}</p>
              <p className="text-sm text-gray-500">{asset.category}</p>
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                asset.status === "operational"
                  ? "bg-green-100 text-green-700"
                  : asset.status === "maintenance"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {asset.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default AssetList;

///////////////Moving assets list to nearest common parent to implement AddAssetForm///////////////////
// function AssetList() {
//   const [assets, setAssets] = useState<Asset[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function loadAssets() {
//       try {
//         const res = await fetch("http://localhost:3000/api/assets");
//         const data: Asset[] = await res.json();
//         setAssets(data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load assets");
//         setLoading(false);
//       }
//     }

//     loadAssets();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <ul>
//       {assets.map((asset) => (
//         <li key={asset.id}>
//           {asset.name} — {asset.category} — {asset.status}
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default AssetList;
