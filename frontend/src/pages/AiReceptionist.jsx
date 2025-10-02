import React from "react";
import { Helmet } from "react-helmet-async";

export default function AiReceptionist() {
  return (
    <main>
      <Helmet>
        <title>Aspire AI Receptionist — 24/7 Phone Answering</title>
        <meta
          name="description"
          content="Never miss a client call again. Aspire AI Receptionist answers 24/7, books appointments, and routes urgent calls to humans. From $3,000/month."
        />
      </Helmet>

      {/* Hero */}
      <section style={{ padding: "80px 20px", textAlign: "center", background: "#f9fafb" }}>
        <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
          Never Miss a Client Call Again
        </h1>
        <p style={{ fontSize: "18px", color: "#555", maxWidth: "700px", margin: "0 auto 30px" }}>
          Aspire AI Receptionist answers every call 24/7 with your script and tone —
          booking appointments, capturing leads, and routing urgent calls to a human.
          A fraction of a salary, with none of the downtime.
        </p>
        <a
          href="https://calendly.com/your-calendly/ai-receptionist-demo"
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "600",
            textDecoration: "none",
            marginRight: "12px"
          }}
        >
          📞 Book a Free Demo
        </a>
        <a
          href="#how-it-works"
          style={{
            border: "2px solid #2563eb",
            color: "#2563eb",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "600",
            textDecoration: "none"
          }}
        >
          Learn How It Works
        </a>
      </section>

      {/* Problem */}
      <section style={{ padding: "60px 20px", maxWidth: "800px", margin: "0 auto" }}>
        <h2>The Problem</h2>
        <p style={{ fontSize: "18px", color: "#555" }}>
          Every missed call is a missed opportunity. Most SMEs lose real revenue because
          customers dial the next provider when no one answers. Hiring a full-time receptionist
          costs $60k+ per year — and still can’t cover 24/7.
        </p>
      </section>

      {/* How it Works */}
      <section id="how-it-works" style={{ padding: "60px 20px", background: "#f3f4f6" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>How It Works</h2>
        <ol style={{ maxWidth: "600px", margin: "0 auto", fontSize: "18px", color: "#555" }}>
          <li>We connect Aspire AI to your number.</li>
          <li>We customise it with your script and FAQs.</li>
          <li>AI answers calls, books, and captures leads.</li>
          <li>Urgent calls are routed to a human instantly.</li>
        </ol>
      </section>

      {/* Who It’s For */}
      <section style={{ padding: "60px 20px", maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Who It’s For</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>Trades & Services</div>
          <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>Medical & Allied Health</div>
          <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>Real Estate & Property Management</div>
          <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>Law & Accounting</div>
        </div>
      </section>
    </main>
  );
}

