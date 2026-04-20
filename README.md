# 🌐 Developer Portfolio

A modern, responsive, and animated developer portfolio built using **Next.js**, showcasing projects, skills, and a fully functional contact system with real-time email delivery.

---

## 🚀 Features

* ⚡ Built with Next.js (App Router)
* 🎨 Clean, modern UI with smooth animations (Framer Motion)
* 🌙 Dark mode support
* 📱 Fully responsive design
* 📬 Functional contact form with email delivery (Resend)
* 🔐 Anti-spam protection (Honeypot + validation)
* 🔔 Toast notifications for UX feedback
* ⏱️ Request timeout handling for better reliability

---

## 🧠 Tech Stack

### Frontend

* Next.js (App Router)
* React
* Tailwind CSS
* Framer Motion
* React Hot Toast

### Backend

* Next.js API Routes
* Resend (Email API)

---

## 📂 Project Structure

```
/app
  /api/contact
    route.ts       # Email handling logic
/components
  Contact.tsx      # Contact form UI
  SectionTitle.tsx
/public
  /textures        # UI textures
```

---

## 📬 Contact System Workflow

1. User submits the form
2. Frontend sends POST request to `/api/contact`
3. Backend validates data
4. Email is sent using Resend:

   * 📩 To portfolio owner (main message)
   * 📬 Optional auto-reply to user
5. Toast feedback shown to user

---

## 🔐 Environment Variables

Create a `.env.local` file in the root:

```
RESEND_API_KEY=your_api_key_here
```

⚠️ **Important:**

* Never commit `.env.local` to GitHub
* API keys must remain private

---

## 🧪 Running Locally

```bash
npm install
npm run dev
```

Visit:

```
http://localhost:3000
```

---

## 📦 Deployment

Deployed using platforms like:

* Vercel (recommended)

Make sure to:

* Add `RESEND_API_KEY` in environment variables
* Redeploy after adding env variables

---

## ⚠️ Known Limitations

* Uses `onboarding@resend.dev` (testing sender)
* Emails may go to spam in development
* Custom domain email not yet configured

---

## 🔮 Future Improvements

* Custom domain email (production-ready)
* Rate limiting (anti-spam enhancement)
* Email templates (premium UI)
* Analytics for form submissions
* Backend logging/dashboard

---

## 👤 Author

**Devvrat**

* Portfolio: (your link)
* GitHub: (your profile)

---

## ⭐ Notes

This project focuses on combining **UI/UX + real backend functionality**, making it more than just a static portfolio.

---
=======
# ds-gth-portfolio
A modern full-stack portfolio built with Next.js, featuring a responsive UI, animated interactions, and a functional contact system powered by Resend for real-time email delivery.
>>>>>>> 60ee9ecadfca11004669fdc04f8fb47d33b27411
