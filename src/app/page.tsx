import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold text-blue-600">Quiz System Ready!</h1>
      <Link
        href="/admin/login"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Go to Admin Login
      </Link>
    </div>
  );
}
