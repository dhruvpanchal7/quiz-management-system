import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Quiz from "@/models/Quiz";
import Submission from "@/models/Submission";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.json();
    const quiz = await Quiz.findById(body.quizId);
    if (!quiz) return NextResponse.json({ message: "Quiz not found" }, { status: 404 });

    let score = 0;

    quiz.questions.forEach((q) => {
      const answer = body.answers.find((a: any) => a.questionId === q._id.toString());
      if (!answer) return;

      // scoring logic
      if (q.type === "mcq" || q.type === "boolean" || q.type === "text") {
        if (answer.value === q.correctAnswer) score += q.points;
      }
    });

    const submission = await Submission.create({
      quizId: body.quizId,
      answers: body.answers,
      score,
    });

    return NextResponse.json({ score });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
