import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Quiz from "@/models/Quiz";

export async function GET(req: NextRequest) {
  try {
    await connect();
    const id = req.url.split("/").pop();
    const quiz = await Quiz.findById(id).select("-questions.correctAnswer"); // hide answers for public
    if (!quiz) return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    return NextResponse.json(quiz);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
