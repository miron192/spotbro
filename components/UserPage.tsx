"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import FriendsList from "./FriendsList";

interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  image?: string;
  weight?: number;
  height?: number;
  activityLevel?: string;
  dailyCalories?: {
    createdAt: string;
    date: string;
    calories: number;
  }[];
}

const UserPage = ({
  id,
  loggedInUserId,
}: {
  id: string;
  loggedInUserId: string | null;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFriend, setIsFriend] = useState<boolean>(false);

  useEffect(() => {
    if (!loggedInUserId) return;
    async function checkFriendship() {
      try {
        const res = await fetch(
          `/api/user/check-friendship?user1=${loggedInUserId}&user2=${id}`
        );
        const data = await res.json();
        setIsFriend(data.areFriends);
      } catch {
        setIsFriend(false);
      }
    }
    checkFriendship();
  }, [id, loggedInUserId]);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/user?userId=${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch user: ${res.statusText}`);
        }
        const data: User = await res.json();
        setUser(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!user) return <p>User not found.</p>;
  if (!isFriend)
    return (
      <p className="text-red-400">You are not allowed to view this profile.</p>
    );

  const todayString = new Date().toISOString().split("T")[0];
  const todayLog = user.dailyCalories?.find(
    (log) => log.createdAt.split("T")[0] === todayString
  );

  return (
    <main className="max-w-4xl mx-auto mt-10 p-4 text-white">
      <header className="flex flex-col sm:flex-row items-center justify-between bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-md gap-6">
        <div className="flex items-center gap-4 flex-col md:flex-row">
          <Image
            className="rounded-full"
            src={user.image || "/placeholder.jpg"}
            alt={user.name}
            width={100}
            height={100}
            priority
          />
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-400 text-sm">{user.email}</p>
            {user.bio && (
              <p className="text-sm italic mt-1 break-words">{user.bio}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 text-sm text-gray-300 min-w-[120px]">
          <p>Weight: {user.weight ?? "N/A"} kg</p>
          <p>Height: {user.height ?? "N/A"} cm</p>
          <p>Activity Level: {user.activityLevel ?? "N/A"}</p>
        </div>
      </header>

      <section className="mt-8 space-y-6">
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-md">
          {todayLog ? (
            <h3 className="text-xl font-semibold mb-2">
              Today&apos;s calories:
              <span className="font-normal">{todayLog.calories}</span>
            </h3>
          ) : (
            <p className="text-gray-400">No calories logged for today.</p>
          )}
        </div>
      </section>

      <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-md flex flex-col gap-2 mt-8">
        <h2 className="font-semibold text-xl">{user.name}&apos;s Friends</h2>
        <FriendsList userId={id} />
      </div>
    </main>
  );
};

export default UserPage;
