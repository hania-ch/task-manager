"use client";

import { useEffect, useState } from "react";
import TaskCard from "@/components/TaskCard";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
};

export default function Dashboard() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<
    "all" | "pending" | "in-progress" | "completed"
  >("all");

  // Fetch tasks from API
  const fetchTasks = async () => {

    try {

      const res = await fetch("/api/tasks");

      const data = await res.json();

      setTasks(data);

    } catch (error) {

      console.error("Error fetching tasks");

    }

  };

  // Delete from UI
  const deleteTask = async (id: number) => {
  const confirmDelete = confirm("Are you sure you want to delete this task?");
  if (!confirmDelete) return;


  await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });

  fetchTasks();

};

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter logic
  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter(
          (task) =>
            task.status === filter
        );

        return (
  <div className="p-4 md:p-6">

    {/* Header */}
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-5">

      <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">
        Teknoesis Task Dashboard
      </h1>

      <div className="flex justify-center md:justify-end gap-3">
        <Link href="/add-task">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto">
            Add Task
          </button>
        </Link>
      </div>

    </div>

    {/* Filter Buttons (responsive scroll) */}
    <div className="flex gap-2 mb-5 overflow-x-auto pb-2">

      <button
        onClick={() => setFilter("all")}
        className={`px-3 py-1 rounded whitespace-nowrap ${
          filter === "all"
            ? "bg-black text-white"
            : "bg-gray-200 dark:bg-gray-800"
        }`}
      >
        All
      </button>

      <button
        onClick={() => setFilter("pending")}
        className={`px-3 py-1 rounded whitespace-nowrap ${
          filter === "pending"
            ? "bg-red-500 text-white"
            : "bg-gray-200 dark:bg-gray-800"
        }`}
      >
        Pending
      </button>

      <button
        onClick={() => setFilter("in-progress")}
        className={`px-3 py-1 rounded whitespace-nowrap ${
          filter === "in-progress"
            ? "bg-yellow-500 text-white"
            : "bg-gray-200 dark:bg-gray-800"
        }`}
      >
        In Progress
      </button>

      <button
        onClick={() => setFilter("completed")}
        className={`px-3 py-1 rounded whitespace-nowrap ${
          filter === "completed"
            ? "bg-green-500 text-white"
            : "bg-gray-200 dark:bg-gray-800"
        }`}
      >
        Completed
      </button>

    </div>

    {/* Task Grid (IMPORTANT FIX) */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

      {filteredTasks.length === 0 ? (
        <p className="text-gray-500 col-span-full text-center">
          No tasks found
        </p>
      ) : (
        filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={deleteTask}
          />
        ))
      )}

    </div>

  </div>
);
  // return (

  //   <div className="p-6 ">
      

  //     {/* Header */}
  //     <div className="flex justify-between items-center mb-5">

  //       <h1 className="text-2xl font-bold">
  //         Teknoesis Task Dashboard
  //       </h1>
      

  //       <Link href="/add-task">
  //         <button className="bg-blue-500 text-white px-4 py-2 rounded">
  //           Add Task
  //         </button>
  //       </Link>

  //     </div>

  //     {/* Filter Buttons */}
  //     <div className="flex gap-2 mb-4">

  //       <button
  //         onClick={() => setFilter("all")}
  //         className={`px-3 py-1 rounded ${
  //           filter === "all"
  //             ? "bg-black text-white"
  //             : "bg-gray-900"
  //         }`}
  //       >
  //         All
  //       </button>

  //       <button
  //         onClick={() => setFilter("pending")}
  //         className={`px-3 py-1 rounded ${
  //           filter === "pending"
  //             ? "bg-red-500 text-white"
  //             : "bg-gray-900"
  //         }`}
  //       >
  //         Pending
  //       </button>

  //       <button
  //         onClick={() => setFilter("in-progress")}
  //         className={`px-3 py-1 rounded ${
  //           filter === "in-progress"
  //             ? "bg-yellow-500 text-white"
  //             : "bg-gray-900"
  //         }`}
  //       >
  //         In Progress
  //       </button>

  //       <button
  //         onClick={() => setFilter("completed")}
  //         className={`px-3 py-1 rounded ${
  //           filter === "completed"
  //             ? "bg-green-500 text-white"
  //             : "bg-gray-900"
  //         }`}
  //       >
  //         Completed
  //       </button>

  //     </div>

  //     {/* Task List */}
  //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  //       {filteredTasks.length === 0 ? (

  //         <p className="text-gray-500">
  //           No tasks found
  //         </p>

  //       ) : (

  //         filteredTasks.map((task) => (

  //           <TaskCard
  //             key={task.id}
  //             task={task}
  //             onDelete={deleteTask}
  //           />

  //         ))

  //       )}

  //     </div>

  //   </div>

  // );
}



