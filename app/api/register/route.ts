import { NextResponse } from "next/server";
import prisma from "../db";
import { hashSync } from "bcrypt-ts";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const hashPassw = hashSync(password, 8);

    await prisma.user.create({
      data: {
        username,
        password: hashPassw,
      },
    });

    return NextResponse.json({ msg: "successfully register user" }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  const user = await prisma.user.findFirst({
    where: {
      username: username ?? "",
    },
  });

  // If user is found, return the user data
  return NextResponse.json(user, { status: 200 });
}
