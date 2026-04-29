import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, message } = body;

    // ✅ Validation
    if (!firstName?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const fullName = `${firstName} ${lastName || ""}`.trim();

    // =========================
    // 📩 1️⃣ SEND TO YOU (MAIN)
    // =========================
    const adminRes = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["yosukeson48@gmail.com"],
      subject: `New Message from ${fullName}`,
      reply_to: email, // 🔥 IMPORTANT
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; background:#f9fafb;">
          <div style="max-width:600px; margin:auto; background:white; padding:24px; border-radius:12px;">
            <h2>📩 New Portfolio Message</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr/>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        </div>
      `,
    });

    // ❌ STOP if admin fails
    if (adminRes.error) {
      console.error("ADMIN MAIL ERROR:", adminRes.error);
      return NextResponse.json({ error: "Mail failed" }, { status: 500 });
    }

    // =========================
    // 📩 2️⃣ AUTO REPLY (REAL)
    // =========================
    try {
      await resend.emails.send({
        from: "Devvrat <onboarding@resend.dev>",
        to: [email], // ✅ REAL USER
        subject: "I received your message 🚀",
        html: `
          <div style="font-family: Arial; padding:20px">
            <h2>Hey ${firstName} 👋</h2>
            <p>Thanks for reaching out! I'll reply soon.</p>
            <hr/>
            <p><strong>Your message:</strong></p>
            <p>${message}</p>
          </div>
        `,
      });
    } catch (err) {
      // ⚠️ Expected in Resend test mode
      console.log("Auto-reply skipped (domain not verified yet)");
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("❌ ERROR:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}