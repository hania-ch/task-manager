import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {

    const { email, password } = await req.json();

    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 401 }
      );
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );

  }
}