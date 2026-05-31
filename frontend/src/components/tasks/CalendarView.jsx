import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import useTaskStore from '../store/taskStore';
import { useNavigate } from 'react-router-dom';

const CalendarView = () => {
  const { tasks, fetchTasks } = useTaskStore();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { fetchTasks(); }, []);

  useEffect(() => {
    const evs = tasks.filter(t => t.dueDate).map(t => ({
      id: t._id,
      title: t.title,
      start: new Date(t.dueDate),
      backgroundColor: t.priority === 'urgent' ? '#f97316' : '#3b82f6',
      extendedProps: { task: t }
    }));
    setEvents(evs);
  }, [tasks]);

  const handleEventClick = (info) => {
    navigate(`/tasks/${info.event.id}`);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek' }}
        events={events}
        eventClick={handleEventClick}
        height="auto"
      />
    </div>
  );
};
export default CalendarView;
