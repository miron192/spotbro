"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface Props {
  fromUserId: string; // 👈 vine ca prop
}

const SearchFriend = ({ fromUserId }: Props) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSearch = async (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/friend-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromUserId,
          toUserEmail: query.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ Request sent to ${query}`);
        setQuery("");
      } else {
        setMessage(` ${data.error || "Failed to send request"}`);
      }
    } catch (error) {
      setMessage(" Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <div>
      <form
        className="flex items-center justify-center gap-2"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Enter friend's email..."
          value={query}
          className="border border-white text-white p-2 rounded-xl bg-transparent"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="flex justify-center items-center"
          type="submit"
          disabled={loading}
        >
          <FaSearch className="text-white text-xl" />
        </button>
      </form>
      {message && <p className="text-sm text-white mt-2">{message}</p>}
    </div>
  );
};

export default SearchFriend;
