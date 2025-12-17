"use client";
import { useEffect, useState } from "react";

interface Quiz {
  _id: string;
  title: string;
}

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    fetch("/api/quizzes")
      .then((res) => res.json())
      .then((data) => setQuizzes(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <ul>
        {quizzes.map((q) => (
          <li key={q._id} className="border p-4 mb-2 rounded bg-white">
            {q.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
