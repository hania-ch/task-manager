import { db } from "@/lib/db";
import { NextResponse } from "next/server";


// ✅ GET SINGLE TASK
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await context.params;

    console.log("Fetching task ID:", id);

    const [rows]: any = await db.query(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );

    if (!rows || rows.length === 0) {

      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );

    }

    return NextResponse.json(rows[0]);

  }

  catch (error) {

    console.error("DB Error:", error);

    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );

  }

}



// ✅ UPDATE TASK (FIXED)
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await context.params;

    // ✅ MUST include status
    const {
      title,
      description,
      status
    } = await request.json();

    console.log("Updating:", id);
    console.log("Status:", status);

    await db.query(
      "UPDATE tasks SET title=?, description=?, status=? WHERE id=?",
      [title, description, status, id]
    );

    return NextResponse.json({
      message: "Task updated successfully",
    });

  }

  catch (error) {

    console.error("Update Error:", error);

    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );

  }

}



// ✅ DELETE TASK
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await context.params;

    await db.query(
      "DELETE FROM tasks WHERE id = ?",
      [id]
    );

    return NextResponse.json({
      message: "Task deleted successfully",
    });

  }

  catch (error) {

    console.error("Delete Error:", error);

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );

  }

}







// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";

// // GET single task
// export async function GET(
//   request: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {

//     const { id } = await context.params;

//     console.log("Fetching task ID:", id);

//     const [rows]: any = await db.query(
//       "SELECT * FROM tasks WHERE id = ?",
//       [id]
//     );

//     if (!rows || rows.length === 0) {
//       return NextResponse.json(
//         { message: "Task not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(rows[0]);

//   } catch (error) {

//     console.error("DB Error:", error);

//     return NextResponse.json(
//       { error: "Database error" },
//       { status: 500 }
//     );

//   }
// }


// // UPDATE task
// export async function PUT(
//   request: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {

//     const { id } = await context.params;

//     const { title, description ,status} =
//       await request.json();

//     await db.query(
//       "UPDATE tasks SET title=?, description=? WHERE id=?",
//       [title, description,status, id]
//     );

//     return NextResponse.json({
//       message: "Task updated",
//     });

//   } catch (error) {

//     console.error("Update Error:", error);

//     return NextResponse.json(
//       { error: "Update failed" },
//       { status: 500 }
//     );

//   } 
// }



// // DELETE task
// export async function DELETE(
//   request: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await context.params;

//     await db.query(
//       "DELETE FROM tasks WHERE id = ?",
//       [id]
//     );

//     return NextResponse.json({
//       message: "Task deleted successfully",
//     });

//   } catch (error) {
//     console.error("Delete Error:", error);

//     return NextResponse.json(
//       { error: "Delete failed" },
//       { status: 500 }
//     );
//   }
// }








// // import { db } from "@/lib/db";

// // // GET single task
// // export async function GET(
// //   req: Request,
// //   { params }: { params: { id: string } }
// // ) {

// //   try {

// //     const id = params.id;

// //     const [rows]: any = await db.query(
// //       "SELECT * FROM tasks WHERE id = ?",
// //       [id]
// //     );

// //     if (rows.length === 0) {
// //       return Response.json(
// //         { message: "Task not found" },
// //         { status: 404 }
// //       );
// //     }

// //     return Response.json(rows[0]);

// //   } catch (error) {

// //     console.error(error);

// //     return Response.json(
// //       { error: "Database error" },
// //       { status: 500 }
// //     );

// //   }
// // }


// // // UPDATE task
// // export async function PUT(
// //   req: Request,
// //   { params }: { params: { id: string } }
// // ) {

// //   try {

// //     const id = params.id;

// //     const { title, description } =
// //       await req.json();

// //     await db.query(
// //       "UPDATE tasks SET title=?, description=? WHERE id=?",
// //       [title, description, id]
// //     );

// //     return Response.json({
// //       message: "Task updated",
// //     });

// //   } catch (error) {

// //     console.error(error);

// //     return Response.json(
// //       { error: "Update failed" },
// //       { status: 500 }
// //     );

// //   }
// // }