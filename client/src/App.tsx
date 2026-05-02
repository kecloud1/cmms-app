import { useState } from "react";
import type { Asset } from "./types";
import AssetList from "./AssetList";
import AddAssetForm from "./AddAssetForm";

function App() {
  const [assets, setAssets] = useState<Asset[]>([]);

  function handleAssetAdded(newAsset: Asset) {
    setAssets((prev) => [...prev, newAsset]);
  }

  return (
    <div>
      <h1>CMMS</h1>
      <AddAssetForm onAssetAdded={handleAssetAdded} />
      <AssetList assets={assets} onAssetsLoaded={setAssets} />
    </div>
  );
}

export default App;
