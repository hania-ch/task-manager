import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {

  try {

    const { name, email, password } =
      await req.json();

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return NextResponse.json({
      message: "User registered"
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Register failed" },
      { status: 500 }
    );

  }

}