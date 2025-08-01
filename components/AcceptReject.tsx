"use client";
import Link from "next/link";

interface Props {
  requesterId: string;
  receiverId: string;
  onHandled?: () => void; // callback opțional după accept/reject
}
const AcceptReject = ({ requesterId, receiverId, onHandled }: Props) => {
  const handleAction = async (action: "accept" | "reject") => {
    const res = await fetch(`/api/friend-request/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requesterId,
        receiverId,
      }),
    });
    if (res.ok) {
      onHandled?.();
    } else {
      const errorText = await res.text();
      console.error(`Failed to ${action} request:`, errorText);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleAction("accept")}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Accept
      </button>
      <button
        onClick={() => handleAction("reject")}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Decline
      </button>
    </div>
  );
};

export default AcceptReject;
