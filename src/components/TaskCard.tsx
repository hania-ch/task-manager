import Link from "next/link";

type Task = {
  id: number;
  title: string;
  description: string;
    status: "pending" | "in-progress" | "completed";

};

export default function TaskCard({
  task,
  onDelete,
}: {
  task: Task;
  onDelete: (id: number) => void;
}) {

    const handleDelete = async () => {

    await fetch(`/api/tasks/${task.id}`, {
      method: "DELETE",
    });

    onDelete(task.id); // UI update
  };

  return (
    
    <div className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg   hover:-translate-y-1 transition-transform  ">

      {/* Task Info */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {task.title}
        </h2>
 

        <p className="text-gray-600 text-sm mt-1">
          {task.description}
        </p>

<span
  className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
    task.status === "pending"
      ? "bg-red-200 text-red-800"
      : task.status === "in-progress"
      ? "bg-yellow-200 text-yellow-800"
      : "bg-green-200 text-green-800"
  }`}
>
  {task.status}
</span>
        
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">

        {/* Edit Button */}
        <Link href={`/edit-task/${task.id}`}>
          <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
            Edit
          </button>
        </Link>

{/* Delete */}
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded  hover:bg-red-600"
        >
          Delete
        </button>

      </div>

    </div>
  );
}
