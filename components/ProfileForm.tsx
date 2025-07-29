"use client";

import { useState } from "react";

interface User {
  id: string;
  weight?: number;
  height?: number;
  activityLevel?: string;
  image?: string;
}

interface Props {
  user: User;
}

const ProfileForm = ({ user }: Props) => {
  const [weight, setWeight] = useState(user.weight ?? "");
  const [height, setHeight] = useState(user.height ?? "");
  const [activityLevel, setActivityLevel] = useState(user.activityLevel ?? "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          weight: Number(weight),
          height: Number(height),
          activityLevel,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      setMessage("Profile updated successfully!");
    } catch {
      setMessage("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" flex items-center justify-center px-4 py-12  text-white">
      <div className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your weight"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Height (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your height"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Activity Level
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option className="text-black" value="" disabled>
                Choose your activity level
              </option>
              <option className="text-black" value="low">
                Low (sedentary)
              </option>
              <option className="text-black" value="moderate">
                Moderate (3-4x/week)
              </option>
              <option className="text-black" value="high">
                High (daily training)
              </option>
            </select>
          </div>

          <button
            className="w-full bg-green-500/90 hover:bg-green-500 text-black font-semibold py-2 px-4 rounded-xl mt-4 transition-all shadow-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>

          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
