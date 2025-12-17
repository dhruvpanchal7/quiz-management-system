"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Question {
  _id: string;
  type: string;
  prompt: string;
  options?: string[];
}

interface Quiz {
  _id: string;
  title: string;
  questions: Question[];
}

export default function QuizPage() {
  const params = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/quizzes/${params.id}`)
      .then((res) => res.json())
      .then((data) => setQuiz(data));
  }, [params.id]);

  const handleSubmit = async () => {
    const res = await fetch(`/api/quizzes/submit`, {
      method: "POST",
      body: JSON.stringify({ quizId: quiz?._id, answers }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    alert(`Your score: ${data.score}`);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>
      <div className="space-y-4">
        {quiz.questions.map((q) => (
          <div key={q._id} className="p-4 border rounded bg-white">
            <p className="font-semibold">{q.prompt}</p>
            {q.type === "mcq" && q.options?.map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name={q._id}
                  value={opt}
                  onChange={() => setAnswers((prev) => [
                    ...prev.filter(a => a.questionId !== q._id),
                    { questionId: q._id, value: opt }
                  ])}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
            {q.type === "boolean" && ["true", "false"].map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name={q._id}
                  value={opt}
                  onChange={() => setAnswers((prev) => [
                    ...prev.filter(a => a.questionId !== q._id),
                    { questionId: q._id, value: opt === "true" }
                  ])}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
            {q.type === "text" && (
              <input
                type="text"
                onChange={(e) => setAnswers((prev) => [
                  ...prev.filter(a => a.questionId !== q._id),
                  { questionId: q._id, value: e.target.value }
                ])}
                className="border p-2 rounded w-full mt-2"
              />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Submit Quiz
      </button>
    </div>
  );
}
