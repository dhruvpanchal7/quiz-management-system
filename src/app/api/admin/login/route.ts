import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";        // your MongoDB connection helper
import Admin from "@/models/Admin";    // your Mongoose admin model
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Connect to MongoDB
    await connect();

    // 2️⃣ Get email and password from request body
    const { email, password } = await req.json();

    // 3️⃣ Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { message: "Admin not found" },
        { status: 404 }
      );
    }

    // 4️⃣ Check password
    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    // 5️⃣ OPTIONAL: set cookie for session (later)
    // Example:
    // const res = NextResponse.json({ message: "Login successful" });
    // res.cookies.set("adminToken", "your-jwt-or-session", { httpOnly: true });
    // return res;

    // 6️⃣ Respond success
    return NextResponse.json({ message: "Login successful" });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
