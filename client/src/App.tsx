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
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-900">CMMS</h1>
      </header>
      <main className="max-w-4xl mx-auto px-8 py-8 space-y-8">
        <AddAssetForm onAssetAdded={handleAssetAdded} />
        <AssetList assets={assets} onAssetsLoaded={setAssets} />
      </main>
    </div>
  );
}

export default App;
