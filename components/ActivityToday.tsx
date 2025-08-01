"use client";
import React, { useState, useEffect } from "react";

interface User {
  id: string;
  weight?: number;
  height?: number;
  activityLevel?: string;
  image?: string;
  bio?: string;
}

interface Props {
  user: User;
}

const ActivityToday = ({ user }: Props) => {
  const [calories, setCalories] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch calories saved for today on mount
  useEffect(() => {
    async function fetchCalories() {
      try {
        const res = await fetch(`/api/user/calories?userId=${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch calories");
        const data = await res.json();
        setCalories(data.calories ?? 0);
      } catch (error) {
        setCalories(0);
      }
    }
    fetchCalories();
  }, [user.id]);

  const handleSubmit = async () => {
    if (calories === "" || calories < 0) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/user/calories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          date: new Date(),
          calories,
        }),
      });

      if (!response.ok) {
        throw new Error("Network error");
      }

      setMessage("Calories saved successfully!");
    } catch (err) {
      setMessage("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto mt-8 bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 text-white">
      <h3 className="text-xl font-semibold mb-6">Activity Today</h3>
      <div className="flex flex-col gap-6 max-w-lg mx-auto">
        <div>
          <label htmlFor="calories" className="block mb-1 font-semibold">
            How many calories did you consume?
          </label>
          <input
            id="calories"
            type="number"
            placeholder="e.g. 2200"
            value={calories === "" ? "" : calories}
            onChange={(e) => {
              const val = e.target.value;
              setCalories(val === "" ? "" : Number(val));
            }}
            className="w-full rounded-md p-2 border border-white text-white bg-transparent"
            min={0}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md w-fit"
        >
          {loading ? "Saving..." : "Save Calories"}
        </button>

        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-green-400">Summary</h4>
          <p>
            <strong>Calories consumed:</strong>{" "}
            {calories === "" ? "No data yet" : `${calories} kcal`}
          </p>
        </div>

        {message && (
          <p className="text-sm text-yellow-300 font-medium">{message}</p>
        )}
      </div>
    </section>
  );
};

export default ActivityToday;
