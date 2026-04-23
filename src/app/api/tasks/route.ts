import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// GET ALL TASKS
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM tasks");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// CREATE TASK
export async function POST(req: Request) {
  try {
    const { title, description, status  } = await req.json();

    await db.query(
      "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
      [title, description, status || "pending"]
    );

    return NextResponse.json({
      message: "Task created",
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}







// import { db } from "@/lib/db";

// // GET all tasks
// export async function GET() {
//   const [rows] = await db.query("SELECT * FROM tasks");
//   return Response.json(rows);
// }

// // ADD task
// export async function POST(req: Request) {
//   const { title, description } = await req.json();

//   await db.query(
//     "INSERT INTO tasks (title, description) VALUES (?, ?)",
//     [title, description]
//   );

//   return Response.json({ message: "Task added" });
// }