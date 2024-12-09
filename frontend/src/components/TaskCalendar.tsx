import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/app";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box } from "@mui/material";
import ptbrLocale from '@fullcalendar/core/locales/pt-br';

import "@fullcalendar/daygrid/internal";
import { clearState } from "../features/tasks/taskSlice";
import { list } from "../features/tasks/taskActions";
import TaskModal from "./TaskModal";
import { EventClickArg } from "@fullcalendar/core";

interface Task {
  id: string,
  name: string,
  description: string,
  priority: number,
  overdueAt: Date,
  createdBy: string,
  isFinished: boolean
}

interface Event {
  title: string,
  date: Date,
}

export default function TaskCalendar() {
  const { tasks, isError, isFetching, isSuccess } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const [events, setEvents] = useState<Array<Event>>([])
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleEventClick = (e: EventClickArg) => {
    setSelectedTask(() => {
      const item = tasks?.find((task: Task) => { return (task.id === e.event.id) })
      if (item === undefined) {
        throw new Error("Task id not match")
      }
      return item
    });
    return setOpenModal(true);
  }

  useEffect(() => {
    dispatch(list())
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
    }
    if (isSuccess) {
      if(tasks.length > 0) {
        setEvents(tasks.map((task: Task) => { return { title: task.name, date: task.overdueAt, id: task.id } }))
      }
    }
  }, [dispatch, tasks, isError, isSuccess]);

  return (
    <Box 
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%"     
      }}
    >
      <div className="taskCalendar">
        <div id="calendar" style={{ width: "800px"}}>
          <FullCalendar
            locale={ptbrLocale}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
          />
        </div>
      </div>
      { selectedTask ? <TaskModal open={openModal} setOpen={setOpenModal} task={selectedTask} reset={() => setSelectedTask(null)}/> : null}
    </Box>
  );
}
