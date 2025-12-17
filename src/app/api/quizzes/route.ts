import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Quiz from "@/models/Quiz";
import { adminAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connect();
    // Optional: protect with adminAuth
    // await adminAuth(req);

    const body = await req.json();

    const quiz = await Quiz.create({
      title: body.title,
      description: body.description,
      questions: body.questions,
      isPublished: body.isPublished || false,
    });

    return NextResponse.json(quiz);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connect();
    const quizzes = await Quiz.find().select("_id title description createdAt");
    return NextResponse.json(quizzes);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
