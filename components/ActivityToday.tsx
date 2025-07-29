"use client";
import React, { useState } from "react";

const ActivityToday = () => {
  const [workout, setWorkout] = useState("");
  const [calories, setCalories] = useState("");

  return (
    <section className="max-w-3xl mx-auto mt-8 bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 text-white ">
      <h3 className="text-xl font-semibold mb-6">Activity Today</h3>
      <div className="flex flex-col gap-6 max-w-lg mx-auto">
        <div>
          <label htmlFor="workout" className="block mb-1 font-semibold">
            What did you do at the gym today?
          </label>
          <input
            id="workout"
            type="text"
            placeholder="e.g. Chest and triceps, 1h"
            value={workout}
            onChange={(e) => setWorkout(e.target.value)}
            className="w-full rounded-md p-2 border border-white "
          />
        </div>

        <div>
          <label htmlFor="calories" className="block mb-1 font-semibold">
            How many calories did you consume?
          </label>
          <input
            id="calories"
            type="number"
            placeholder="e.g. 2200"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full rounded-md p-2 border border-white text-white"
          />
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-green-400">Summary</h4>
          <p>
            <strong>Workout:</strong> {workout || "No data yet"}
          </p>
          <p>
            <strong>Calories consumed:</strong>{" "}
            {calories ? `${calories} kcal` : "No data yet"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ActivityToday;
