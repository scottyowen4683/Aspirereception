import React from "react";
import { Helmet } from "react-helmet-async";

export default function AiReceptionist() {
  return (
    <main className="bg-white">
      <Helmet>
        <title>Aspire AI Receptionist — 24/7 Phone Answering for SMEs</title>
        <meta
          name="description"
          content="Never miss a client call again. Aspire AI Receptionist answers instantly 24/7, books appointments, captures leads, and routes VIP/urgent calls to a human. From $3,000/month."
        />
      </Helmet>

      {/* HERO */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
            {/* Copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full mb-4">
                <span className="text-xs tracking-wider">PRODUCT</span>
                <span className="text-xs">AI Receptionist</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Never Miss a Client Call Again
              </h1>
              <p className="text-lg text-slate-600 mb-6">
                Aspire AI Receptionist answers instantly—24/7—in your brand voice. It books appointments,
                captures leads, and routes VIP/urgent calls to a human when it matters.
              </p>
              <div className="flex flex-wrap gap-3 mb-3">
                <a
                  href="https://calendly.com/scott-owen-aspire/ai-receptionist-demo"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium inline-flex items-center gap-2"
                >
                  <span aria-hidden>📅</span> Book a Free Demo
                </a>
                <a
                  href="#how-it-works"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium inline-flex items-center gap-2"
                >
                  How It Works <span aria-hidden>→</span>
                </a>
              </div>
              <div className="text-sm text-slate-500">
                From $3,000/month • Cancel anytime • Live in days, not weeks
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=1600&auto=format&fit=crop"
                alt="Modern phone support"
                className="rounded-2xl shadow-xl border border-slate-200"
                loading="lazy"
              />
              <div className="absolute -top-5 -right-5 w-20 h-20 rounded-2xl bg-blue-100 hidden md:block" />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-6 bg-white border-b border-slate-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-70 text-xs tracking-wider">
            <span>Trusted by Australian SMEs</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>24/7 Coverage</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>Fast Setup</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>Human Escalation</span>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">The Problem</h2>
          <p className="text-lg text-slate-600">
            Missed calls = missed revenue. Customers ring the next provider when no one answers.
            A full-time receptionist costs $60k+ and still can’t cover 24/7. Aspire AI Receptionist
            eliminates gaps without sacrificing professionalism.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "☎️",
                title: "Connect",
                desc: "We connect to your number (or provide a dedicated line) and set routing rules."
              },
              {
                icon: "⚙️",
                title: "Customise",
                desc: "We load your scripts, tone, FAQs, booking rules, and escalation paths."
              },
              {
                icon: "⏱️",
                title: "Answer",
                desc: "AI answers instantly 24/7, qualifies, books appointments, and captures leads."
              },
              {
                icon: "🛡️",
                title: "Route",
                desc: "VIP/emergency triggers escalate to a human instantly with full context."
              }
            ].map(({ icon, title, desc }) => (
              <div key={title} className="rounded-2xl border-2 border-slate-200 bg-white p-6">
                <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-2xl">
                  <span aria-hidden>{icon}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
                <p className="text-slate-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">Who It’s For</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Trades & Services", "Medical & Allied Health", "Real Estate & PM", "Law & Accounting"].map((x) => (
              <div key={x} className="rounded-xl border border-slate-200 p-5 text-center">
                <span className="font-semibold text-slate-900">{x}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING RIBBON */}
      <section className="py-14 bg-slate-50 border-t border-b border-slate-200">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "$3,000/mo",
                points: ["Business hours", "1 line", "Message capture + email"]
              },
              {
                name: "Growth",
                price: "$4,500/mo",
                points: ["Extended hours", "2–3 lines", "Bookings + CRM sync"]
              },
              {
                name: "24/7",
                price: "Custom",
                points: ["Full coverage", "3+ lines", "Premium SLA + routing"]
              }
            ].map(({ name, price, points }) => (
              <div key={name} className="bg-white rounded-2xl border-2 border-slate-200 p-6">
                <div className="text-sm text-blue-600 font-semibold mb-2">{name}</div>
                <div className="text-3xl font-extrabold text-slate-900 mb-4">{price}</div>
                <ul className="text-sm text-slate-600 space-y-2 mb-6 list-disc pl-5">
                  {points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <a
                  href="https://calendly.com/scott-owen-aspire/ai-receptionist-demo"
                  className="w-full inline-flex justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
                >
                  Book Pricing & ROI Call
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">FAQ</h2>
          <div className="space-y-6">
            {[
              [
                "How long does setup take?",
                "Most customers go live within a few days once scripts and routing rules are confirmed."
              ],
              [
                "Can it book into my calendar/CRM?",
                "Yes. We can push bookings and leads to tools like Google Calendar, Outlook, HubSpot, or Go High Level."
              ],
              [
                "What happens with urgent calls?",
                "We configure VIP/urgent triggers to route to a human instantly, with caller context and transcript."
              ],
              [
                "Will it sound robotic?",
                "No. We use your tone and approved scripts, and we keep improving based on call outcomes."
              ]
            ].map(([q, a]) => (
              <div key={q} className="rounded-xl border border-slate-200 p-5">
                <div className="font-semibold text-slate-900 mb-1">{q}</div>
                <div className="text-slate-600">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-2">Stop Losing Calls. Start Growing Revenue.</h3>
              <p className="text-blue-200">
                Plug in Aspire AI Receptionist and give customers instant answers—any hour, any day.
              </p>
            </div>
            <div className="text-left md:text-right">
              <a
                href="https://calendly.com/scott-owen-aspire/ai-receptionist-demo"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-slate-900 px-6 py-3 rounded-md font-extrabold"
              >
                👉 Book a Demo
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

