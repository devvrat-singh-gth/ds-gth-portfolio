import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  console.log("🔥 Incoming request");

  try {
    const body = await req.json();
    console.log("📩 Data received:", body);

    const { firstName, lastName, email, message } = body;

    // ✅ Validation
    if (!firstName?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName || ""}`.trim();

    // 📩 1️⃣ SEND TO YOU (MAIN EMAIL)
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["devvratsinghbanga2005@gmail.com"],
     subject: `New Message from ${fullName}`,
      reply_to: email, // ✅ THIS is key
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>🚀 New Portfolio Message</h2>

          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>

          <hr style="margin: 16px 0;" />

          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    // 📩 2️⃣ AUTO REPLY TO USER
    await resend.emails.send({
      from: "Devvrat <onboarding@resend.dev>",
      to: [email],
      subject: "I received your message 🚀",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Hey ${firstName} 👋</h2>
          <p>Thanks for reaching out! I’ve received your message and will get back to you soon.</p>

          <hr style="margin: 16px 0;" />

          <p><strong>Your message:</strong></p>
          <p>${message}</p>

          <br/>
          <p>– Devvrat</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("❌ ERROR:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}