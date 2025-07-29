"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { addHours } from "date-fns";

const localizer = momentLocalizer(require("moment"));

const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      title: "Push Day",
      start: new Date(),
      end: addHours(new Date(), 1),
    },
  ]);

  const handleSelect = ({ start, end }: any) => {
    const title = prompt("Event name:");
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

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
