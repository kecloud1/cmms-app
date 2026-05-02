import { useEffect, useState } from "react";
import type { Asset } from "./types";

interface Props {
  assets: Asset[];
  onAssetsLoaded: (assets: Asset[]) => void;
}

function AssetList({ assets, onAssetsLoaded }: Props) {
  useEffect(() => {
    async function loadAssets() {
      try {
        const res = await fetch("http://localhost:3000/api/assets");
        const data: Asset[] = await res.json();
        onAssetsLoaded(data);
      } catch (err) {
        console.error("Failed to load assets", err);
      }
    }

    loadAssets();
  }, []);

  if (assets.length === 0) return <p>No assets found.</p>;

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
