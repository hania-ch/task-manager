"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditTask() {

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending"); // ✅ FIXED (inside component)

  // Fetch existing task
  useEffect(() => {

    if (!id) return;

    const fetchTask = async () => {

      const res = await fetch(`/api/tasks/${id}`);

      if (!res.ok) {
        console.error("Task not found");
        return;
      }

      const data = await res.json();

      setTitle(data.title || "");
      setDescription(data.description || "");
      setStatus(data.status || "pending"); // ✅ FIXED safety

    };

    fetchTask();

  }, [id]);

  // Update task
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title,
        description,
        status, // ✅ FIXED (important)
      }),
    });

    router.push("/");

  };

  return (
    <div className="p-6">

      <h1 className="text-xl font-bold mb-4">
        Edit Task
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">

        {/* Title */}
        <input
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <textarea
          className="border p-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Status */}
        <select
          className="border p-2 w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        {/* Button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Task
        </button>

      </form>

    </div>
  );
}