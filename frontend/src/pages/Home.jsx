import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  Phone,
  Clock,
  Zap,
  CheckCircle,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  PlugZap,
  MessageSquare,
} from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// 🔧 Update these:
const DEMO_NUMBER = "+61 2 1234 5678"; // <-- your live demo AI number
const BOOKING_URL = "https://calendly.com/scott-owen-aspire/ai-receptionist-demo";

// Logos (from your message)
const ASPIRE_LOGO =
  "https://raw.githubusercontent.com/scottyowen4683/Aspirereception/refs/heads/feature/ai-receptionist/frontend/aspire.png";
const LOCAL_BUY_LOGO =
  "https://raw.githubusercontent.com/scottyowen4683/Aspirereception/refs/heads/feature/ai-receptionist/frontend/src/localbuy.png";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API}/contact`, formData);
      if (response.data.status === "success") {
        toast.success("Message Sent!", {
          description: "We’ll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error("Error", { description: "Unexpected response from server." });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error", {
        description:
          "Failed to send message. Please try again or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={ASPIRE_LOGO}
              alt="Aspire Executive Solutions"
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-8 items-center">
            <a
              href="#features"
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Solutions
            </a>
            <a
              href="#compliance"
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Compliance
            </a>
            <a
              href="#use-cases"
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Use Cases
            </a>
            <a
              href="#pricing"
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Pricing
            </a>
            <a
              href="https://aspireexecutive.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium flex items-center gap-1"
            >
              Executive Search <ExternalLink className="h-3 w-3" />
            </a>
            <a href="#contact">
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2">
                Contact Us
              </button>
            </a>
          </nav>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-sm">
            <div className="flex flex-col px-6 py-4 space-y-4">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-blue-600 font-medium"
              >
                Solutions
              </a>
              <a
                href="#compliance"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-blue-600 font-medium"
              >
                Compliance
              </a>
              <a
                href="#use-cases"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-blue-600 font-medium"
              >
                Use Cases
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-blue-600 font-medium"
              >
                Pricing
              </a>
              <a
                href="https://aspireexecutive.com.au"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-blue-600 font-medium"
              >
                Executive Search
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 text-center"
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Premium Customer Service Solutions for Councils
            </h1>
            <p className="text-xl text-slate-700 mb-8 leading-relaxed max-w-3xl mx-auto">
              <span className="font-semibold">Simpler. Faster. Better.</span> Aspire delivers 24/7
              community support with Australian-based data compliance and seamless integration into
              council systems. Let AI handle routine enquiries so your staff can focus on complex, high-value work.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href={BOOKING_URL}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-md transition-transform hover:scale-105">
                  Book a Demo
                </button>
              </a>
              <a href="#demo">
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg rounded-md transition-all">
                  See It in Action
                </button>
              </a>
              <a href={`tel:${DEMO_NUMBER.replace(/\s/g, "")}`}>
                <button className="border-2 border-slate-300 text-slate-800 hover:bg-white px-8 py-3 text-lg rounded-md transition-all inline-flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Call the AI Demo: {DEMO_NUMBER}
                </button>
              </a>
            </div>

            {/* Trust card with Local Buy */}
            <div className="mt-8 inline-flex items-center gap-6 rounded-xl border border-slate-200 bg-white/70 px-5 py-3">
              <span className="text-sm text-slate-600">
                Trusted by councils • Data hosted in Australia • SLA-backed
              </span>
              <img src={LOCAL_BUY_LOGO} alt="Local Buy Approved Supplier" className="h-6 w-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="border-y border-blue-100 bg-blue-50">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-blue-900 font-semibold">
            Launch Offer: Setup Fee <span className="line-through opacity-70">$10,000</span> →{" "}
            <span className="text-blue-700">FREE</span> for the first 3 councils
          </p>
          <div className="flex items-center gap-3">
            <img src={LOCAL_BUY_LOGO} alt="Local Buy Approved Supplier" className="h-6 w-auto" />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Executive Leadership, Innovative Solutions
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto" />
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-200">
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Aspire isn’t another tech vendor. We’re led by a former council CEO who understands
                how government operates and what communities expect. We specialise in premium AI-powered
                customer service solutions designed specifically for councils.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                With real-world leadership and advanced AI, we deliver a complete platform—from the first
                call through to bookings, complaints, and service requests. It’s not just about answering
                calls; it’s about elevating your entire customer journey.
              </p>

              <div className="flex items-center gap-3 text-blue-600 font-semibold">
                <MapPin className="h-5 w-5" />
                <span>Proudly Australian-owned and operated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              AI Customer Service — Built for Councils
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Multi-channel service that never takes a day off.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="rounded-2xl border-2 border-slate-200 hover:border-blue-600 transition-all duration-300 hover:shadow-xl group bg-white">
              <div className="p-6">
                <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <Clock className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">24/7 Community Service</h3>
                <p className="text-slate-600 leading-relaxed">
                  No queues, no missed calls — reliable service anytime.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-slate-200 hover:border-blue-600 transition-all duration-300 hover:shadow-xl group bg-white">
              <div className="p-6">
                <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <ShieldCheck className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Data Compliance by Design</h3>
                <p className="text-slate-600 leading-relaxed">
                  Privacy Act 1988 (Cth) & APP aligned. AU data residency.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-slate-200 hover:border-blue-600 transition-all duration-300 hover:shadow-xl group bg-white">
              <div className="p-6">
                <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <PlugZap className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Seamless Council Integration</h3>
                <p className="text-slate-600 leading-relaxed">
                  Works with TechOne, SAP, Civica or via structured email workflows.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-slate-200 hover:border-blue-600 transition-all duration-300 hover:shadow-xl group bg-white">
              <div className="p-6">
                <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <Phone className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Human Escalation</h3>
                <p className="text-slate-600 leading-relaxed">
                  Urgent or complex matters transfer instantly to staff with full context.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot demo (copy only; your chatbot stays embedded elsewhere) */}
      <section id="demo" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Talk to our Virtual Council Chat Bot
              </h2>
              <p className="text-slate-700">
                Not just smarter phone calls — Aspire includes a fully customisable web chat bot
                tailored to your services and workflows.
              </p>
              <ul className="mt-4 space-y-2 text-slate-700">
                <li>• Deployed on your website or intranet (already live on this page).</li>
                <li>• Answers FAQs instantly (rates, bins, bookings, councillor info).</li>
                <li>• Escalates to staff or logs requests directly.</li>
                <li>• Fully branded and configured for your community.</li>
              </ul>
              <div className="mt-6 inline-flex items-center gap-2 text-slate-700">
                <MessageSquare className="h-5 w-5" />
                <span>Open the chat widget (bottom-right) to try the council demo now.</span>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-slate-700">
                “Aspire takes care of routine enquiries, freeing our staff to focus on complex,
                high-value community work.”
              </p>
              <div className="mt-4 flex items-center gap-3 text-sm text-slate-500">
                <div className="h-8 w-8 rounded-full bg-slate-200" />
                <div>
                  <p className="font-medium text-slate-700">Council Operations Lead</p>
                  <p>Queensland</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section id="compliance" className="py-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Privacy, Security & Compliance
            </h2>
            <p className="text-slate-700 max-w-3xl">
              Government-grade assurance with the flexibility of AI-driven efficiency.
            </p>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold">Privacy Act 1988 (Cth)</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Fully aligned with the Australian Privacy Principles. Clear purpose, minimal
                  collection, auditable handling.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold">Australian Data Residency</h3>
                <p className="mt-1 text-sm text-slate-600">
                  All call data, transcripts, and interaction logs are stored securely within
                  Australia.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold">Security & SLAs</h3>
                <p className="mt-1 text-sm text-slate-600">
                  TLS 1.2+ encryption in transit, role-based access, and SLA-backed uptime and
                  support response times.
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-slate-600">
              Need details?{" "}
              <a href={BOOKING_URL} className="text-blue-700 hover:underline">
                Request the Council Compliance Pack
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Built for real council scenarios
            </h2>
            <p className="text-slate-700">
              Aspire handles the routine so your teams can focus on what matters most.
            </p>

            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                ["Rates & Payments", "Check balances, lodge queries, or request payment plans."],
                ["Waste Services", "Missed bin reports, collection reminders, service changes."],
                ["Facility & Event Bookings", "Reserve sports fields, halls, and community spaces."],
                ["Community Information", "Councillor contacts, meetings, and local events."],
                ["Complaints Handling", "Every complaint logged with an instant reference number."],
                ["Service Requests", "Structured emails or API routes into existing systems."],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-slate-600 mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Pricing & Packages</h2>
            <p className="text-slate-700">Simple tiers. Enterprise reliability.</p>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-sm font-semibold">Essential</p>
                <p className="mt-2 text-3xl font-extrabold">POA</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li>• Inbound call handling & service requests</li>
                  <li>• Complaint logging & reference numbers</li>
                  <li>• Quick deployment</li>
                </ul>
                <a
                  href={BOOKING_URL}
                  className="mt-6 inline-block rounded-xl px-4 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  Book a Demo
                </a>
              </div>

              <div className="rounded-2xl border border-blue-300 bg-blue-50 p-6">
                <p className="text-sm font-semibold">Advanced</p>
                <p className="mt-2 text-3xl font-extrabold">POA</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li>• Phone, SMS, chat & email intake</li>
                  <li>• Structured workflows + integrations</li>
                  <li>• Reporting & insights</li>
                </ul>
                <a
                  href={BOOKING_URL}
                  className="mt-6 inline-block rounded-xl px-4 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  Book a Demo
                </a>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-sm font-semibold">Premium</p>
                <p className="mt-2 text-3xl font-extrabold">Tailored</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li>• Custom workflows & analytics</li>
                  <li>• Priority SLA & support</li>
                  <li>• Executive reporting</li>
                </ul>
                <a
                  href={BOOKING_URL}
                  className="mt-6 inline-block rounded-xl px-4 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  Request Council Pack
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Ready to Transform Customer Service?
              </h2>
              <p className="text-xl text-blue-100">
                Simpler. Faster. Better. Let AI do the routine while your staff focus on what matters.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Email Us</p>
                      <a
                        href="mailto:scott@aspireexecutive.com.au"
                        className="text-blue-200 hover:text-white transition-colors"
                      >
                        scott@aspireexecutive.com.au
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Location</p>
                      <p className="text-blue-200">Australia</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Executive Search Services</p>
                      <a
                        href="https://aspireexecutive.com.au"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-200 hover:text-white transition-colors"
                      >
                        aspireexecutive.com.au
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <textarea
                    name="message"
                    placeholder="Tell us about your needs..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-3 font-medium transition-transform hover:scale-105"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img src={ASPIRE_LOGO} alt="Aspire Executive Solutions" className="h-8 w-auto" />
              <span className="text-sm">
                © {new Date().getFullYear()} Aspire Executive Solutions. All rights reserved.
              </span>
            </div>
            <div className="flex gap-6">
              <a href="#features" className="hover:text-white transition-colors">
                Solutions
              </a>
              <a href="#compliance" className="hover:text-white transition-colors">
                Compliance
              </a>
              <a href="#pricing" className="hover:text-white transition-colors">
                Pricing
              </a>
              <a
                href="https://aspireexecutive.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Executive Search
              </a>
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/accessibility" className="hover:text-white transition-colors">
                Accessibility
              </Link>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
