"use client";

import { FriendRequest } from "@/lib/generated/prisma";
import Image from "next/image";
import { useEffect, useState } from "react";
import AcceptReject from "./AcceptReject";

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
type FriendRequestWithRequester = FriendRequest & {
  requester: {
    email: string;
    image?: string;
    id: string;
    name?: string;
  };
};

const Requests = ({ user }: Props) => {
  const [requests, setRequests] = useState<FriendRequestWithRequester[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(`/api/friend-request?userId=${user.id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch requests");
        }
        setRequests(data.requests);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user.id]);

  return (
    <>
      {loading ? (
        <p className="mt-2">Loading...</p>
      ) : requests.length === 0 ? (
        <p className="mt-2">No pending requests.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {requests.map((req) => (
            <li
              key={req.id}
              className="bg-white/10 px-4 py-2 rounded-lg shadow"
            >
              <div className="flex items-center justify-between gap-4">
                <Image
                  src={req.requester.image || "/default-avatar.png"}
                  alt={req.requester.name || "User Avatar"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold">{req.requester.name}</p>
                  <p className="text-gray-300">{req.requester.email}</p>
                </div>
                <AcceptReject
                  requesterId={req.requester.id}
                  receiverId={user.id}
                  onHandled={() => {
                    setRequests((prev) => prev.filter((r) => r.id !== req.id));
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Requests;
