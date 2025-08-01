"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const FriendsList = ({ userId }: { userId: string }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchFriends() {
      setLoading(true);
      try {
        const res = await fetch(`/api/friends-list?userId=${userId}`);
        if (!res.ok) {
          const errorText = await res.text();
        } else {
          const data = await res.json();
          setFriends(data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    }
    fetchFriends();
  }, [userId]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {friends.map(({ id, name, image }) => (
        <Link
          href={`/user/${id}`} // presupunem că profile-ul e pe baza ID-ului
          key={id}
          className="flex flex-col items-center gap-2 hover:bg-white/10 rounded-lg p-4 transition"
        >
          <Image
            src={image || "/default-avatar.png"}
            alt={name}
            width={80}
            height={80}
            className="rounded-full border border-white/20"
          />
          <p className="font-semibold text-center">{name}</p>
        </Link>
      ))}
    </div>
  );
};

export default FriendsList;
