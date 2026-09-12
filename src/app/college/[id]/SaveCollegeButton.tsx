"use client";

import { useState } from "react";

export default function SaveCollegeButton({
  collegeId,
}: {
  collegeId: string;
}) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collegeId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to save college.");
        return;
      }

      setSaved(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-6">
      <button
        onClick={handleSave}
        disabled={saving || saved}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {saving ? "Saving..." : saved ? "✓ College Saved" : "♡ Save College"}
      </button>

      {error && (
        <p className="mt-3 text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}