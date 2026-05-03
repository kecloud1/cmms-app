import { useState } from "react";
import type { Asset } from "./types";

interface Props {
  onAssetAdded: (asset: Asset) => void;
}

function AddAssetForm({ onAssetAdded }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/assets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          category: formData.get("category"),
          status: formData.get("status"),
        }),
      });

      if (!res.ok) throw new Error("Failed to create asset");

      const newAsset: Asset = await res.json();
      onAssetAdded(newAsset);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" name="name" required />
      </div>
      <div>
        <label>Category</label>
        <input type="text" name="category" required />
      </div>
      <div>
        <label>Status</label>
        <select name="status" defaultValue="operational">
          <option value="operational">Operational</option>
          <option value="maintenance">Maintenance</option>
          <option value="offline">Offline</option>
        </select>
      </div>
      {error && <p>{error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add Asset"}
      </button>
    </form>
  );
}

export default AddAssetForm;
