"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import moment from "moment";
const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const { data: session } = useSession();

  const [events, setEvents] = useState<
    { title: string; start: Date; end: Date }[]
  >([]);

  const handleSelect = async ({ start, end }: { start: Date; end: Date }) => {
    const workout = prompt("Workout name (e.g., Push Day):");
    if (!workout) return;

    const userId = session?.user?.id;

    const newEvent = {
      title: workout,
      start,
      end,
    };

    setEvents([...events, newEvent]);

    await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        date: start,
        startTime: start,
        endTime: end,
        workout,
      }),
    });
  };
  useEffect(() => {
    const fetchLogs = async () => {
      if (!session?.user?.id) return;

      const res = await fetch(`/api/events?userId=${session.user.id}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        const formatted = data.map((log) => ({
          title: log.workout,
          start: new Date(log.startTime),
          end: new Date(log.endTime),
        }));

        setEvents((prev) => [...prev, ...formatted]);
      }
    };

    fetchLogs();
  }, [session]);

  return (
    <div className="flex items-center justify-around ">
      <div className="bg-[#1a1a1a] rounded-xl shadow-md p-4 ">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">
          My Gym Calendar
        </h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: "600px",
            backgroundColor: "#1a1a1a", // fundal mai închis
            color: "#fff", // text alb
            borderRadius: "1rem",
            padding: "1rem",
          }}
          selectable
          onSelectSlot={handleSelect}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
