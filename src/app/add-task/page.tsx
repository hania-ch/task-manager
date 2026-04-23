"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTask() {
  const router = useRouter();
const [status, setStatus] = useState("pending");


  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    router.push("/");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Add Task</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
  className="border p-2 w-full"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  <option value="pending">Pending</option>
  <option value="in-progress">In Progress</option>
  <option value="completed">Completed</option>
</select>

        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}