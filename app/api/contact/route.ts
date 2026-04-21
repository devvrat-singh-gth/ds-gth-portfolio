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
  <div style="font-family: Arial, sans-serif; padding: 24px; background:#f9fafb;">
    
    <div style="max-width:600px; margin:auto; background:white; padding:24px; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
      
      <h2 style="margin-bottom:16px;">📩 New Portfolio Message</h2>

      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>

      <hr style="margin:20px 0;" />

      <p style="margin-bottom:8px;"><strong>Message:</strong></p>
      <p style="line-height:1.6; color:#444;">${message}</p>

      <hr style="margin:20px 0;" />

      <p style="font-size:12px; color:#888;">
        Sent from your portfolio contact form
      </p>

    </div>
  </div>
`,
    });

    // 📩 2️⃣ AUTO REPLY TO USER
    await resend.emails.send({
      from: "Devvrat <onboarding@resend.dev>",
      to: [email],
      subject: "I received your message 🚀",
   html: `
  <div style="font-family: Arial, sans-serif; padding: 24px; background:#f9fafb;">

    <div style="max-width:600px; margin:auto; background:white; padding:24px; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
      
      <h2 style="margin-bottom:16px;">Hey ${firstName} 👋</h2>

      <p style="line-height:1.6; color:#444;">
        Thanks for reaching out! I’ve received your message and will get back to you soon.
      </p>

      <hr style="margin:20px 0;" />

      <p style="margin-bottom:8px;"><strong>Your message:</strong></p>
      <p style="line-height:1.6; color:#555;">${message}</p>

      <hr style="margin:20px 0;" />

      <p style="margin-top:16px;">
        – Devvrat Singh  
      </p>

      <p style="font-size:12px; color:#888;">
        Portfolio Contact System
      </p>

    </div>
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