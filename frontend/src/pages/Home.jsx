import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  Phone,
  Clock,
  DollarSign,
  Zap,
  CheckCircle,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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
        src="https://customer-assets.emergentagent.com/job_6e1b7f8b-8033-4253-aef3-794266462fd0/artifacts/0jw7k2x6_Jpeg-01.jpg"
        alt="Aspire Executive Solutions"
        className="h-12 w-auto"
      />
    </div>

    {/* Desktop nav */}
    <nav className="hidden md:flex gap-8 items-center">
      <a href="#about" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
        About
      </a>
      <Link to="/ai-receptionist" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
        AI Receptionist
      </Link>
      <a href="#why-us" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
        Why Us
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
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
          href="#about"
          onClick={() => setMobileMenuOpen(false)}
          className="text-slate-700 hover:text-blue-600 font-medium"
        >
          About
        </a>
        <Link
          to="/ai-receptionist"
          onClick={() => setMobileMenuOpen(false)}
          className="text-slate-700 hover:text-blue-600 font-medium"
        >
          AI Receptionist
        </Link>
        <a
          href="#why-us"
          onClick={() => setMobileMenuOpen(false)}
          className="text-slate-700 hover:text-blue-600 font-medium"
        >
          Why Us
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

      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
           <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
  Missed Calls Cost Money.
  <span className="block text-blue-600 mt-2">
    We Don’t Miss a Thing.
  </span>
</h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Never lose business to voicemail again. Our AI receptionist is professional,
  always available, and tailored to your brand. Answering, booking, and
  routing calls 24/7.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="https://calendly.com/scott-owen-aspire/ai-receptionist-demo">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-md transition-transform hover:scale-105">
                  Book a Discovery Call
                </button>
              </a>
              <Link to="/ai-receptionist">
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg rounded-md transition-all">
                  See It in Action
                </button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Reduce overheads, never miss a call, and deliver a premium first
              impression, every time.
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Executive Leadership, Innovative Solutions
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto" />
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-200">
     <p className="text-lg text-slate-700 leading-relaxed mb-6">
  Aspire isn’t another tech vendor. We’re led by a former CEO who has
  transformed complex organisations. Our solutions combine real-world
  leadership with cutting-edge AI, so you get measurable outcomes,
  faster response times, lower costs, and a consistently premium
  customer experience. Simpler, faster, better.
</p>

<p className="text-lg text-slate-700 leading-relaxed mb-6">
  With our strategic business acumen and advanced AI, we deliver a
  complete Aspire platform, from the first call through to conversion,
  retention, and beyond. It’s not just about answering calls, it’s about
  elevating your entire customer journey.
</p>

<div className="grid sm:grid-cols-2 gap-3 mb-6">
  {[
    ["Smart CRM & Pipeline", "Track every enquiry from first contact through to close."],
    ["Automated Workflows", "Seamless follow-ups by SMS and email that convert leads into clients."],
    ["Bookings & Scheduling", "Integrated calendars that cut no-shows and maximise utilisation."],
    ["Call & Message Tracking", "Full visibility across every conversation and touchpoint."],
    ["Audits & Reporting", "Executive dashboards with real-time ROI insights."],
    ["Reputation Management", "Automated review requests to grow and protect your brand."],
  ].map(([title, desc]) => (
    <div
      key={title}
      className="rounded-xl border border-slate-200 bg-white p-4"
    >
      <div className="text-slate-900 font-semibold">{title}</div>
      <div className="text-slate-600 text-sm">{desc}</div>
    </div>
  ))}
</div>

<div className="flex items-center gap-3 text-blue-600 font-semibold">
  <MapPin className="h-5 w-5" />
  <span>Proudly Australian-owned and operated</span>
</div>
</div>

</div>      {/* closes .max-w-4xl */}
</div>      {/* closes .container */}
</section>  {/* closes #about */}

{/* Services */}

      <section id="services" className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              AI Customer Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Transform your front desk with intelligent automation that never takes a day off
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="rounded-2xl border-2 border-slate-200 hover:border-blue-600 transition-all duration-300 hover:shadow-xl group bg-white">
              <div className="p-6">
                <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <Clock className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Always On, Always Reliable</h3>
                <p className="text-slate-600 leading-relaxed">
                  Instant responses 24/7. No queues, no missed calls — just consistent service.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border-2 border-slate-200 hover:border-blue-600 transition-all duration-300 hover:shadow-xl group bg-white">
              <div className="p-6">
                <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <DollarSign className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Lower Costs, Higher Impact</h3>
                <p className="text-slate-600 leading-relaxed">
                  Replace unpredictable staffing costs with a dependable AI receptionist that scales.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border-2 border-slate-200 hover:border-blue-600 transition-all duration-300 hover:shadow-xl group bg-white">
              <div className="p-6">
                <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <Zap className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Live in Days</h3>
                <p className="text-slate-600 leading-relaxed">
                  Minimal lift for your team. We configure, integrate, and launch quickly.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border-2 border-slate-200 hover:border-blue-600 transition-all duration-300 hover:shadow-xl group bg-white">
              <div className="p-6">
                <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <Phone className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Dependable by Design</h3>
                <p className="text-slate-600 leading-relaxed">
                  No sick leave or downtime. Just reliable call handling your clients can trust.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why-us" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Why Aspire Executive Solutions?
              </h2>
              <p className="text-xl text-slate-600">
                Executive expertise meets intelligent innovation
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                [
                  "Led by Experience",
                  "Founded by a former CEO who understands delivery, risk, and real-world outcomes.",
                ],
                [
                  "Local Insight, Global Standards",
                  "Australian-based team with world-class AI expertise and support.",
                ],
                [
                  "Seamless Integration",
                  "Works with your tools and workflows, not against them.",
                ],
                [
                  "Tailored to You",
                  "From small teams to enterprise, solutions scale with your needs.",
                ],
                [
                  "Premium Client Experience",
                  "Executive-level onboarding, training, and governance.",
                ],
                [
                  "Human + AI Support",
                  "Real people, real accountability, and continuous optimisation.",
                ],
              ].map(([title, desc], idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                    <CheckCircle className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact (restored) */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Ready to Transform Your Brand?
              </h2>
              <p className="text-xl text-blue-100">
                Get in touch today and discover how AI can elevate your business
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
              <img
                src="https://customer-assets.emergentagent.com/job_6e1b7f8b-8033-4253-aef3-794266462fd0/artifacts/0jw7k2x6_Jpeg-01.jpg"
                alt="Aspire Executive Solutions"
                className="h-8 w-auto"
              />
              <span className="text-sm">
                © 2025 Aspire Executive Solutions. All rights reserved.
              </span>
            </div>
            <div className="flex gap-6">
              <a href="#about" className="hover:text-white transition-colors">
                About
              </a>
              <Link to="/ai-receptionist" className="hover:text-white transition-colors">
                AI Receptionist
              </Link>
              <a
                href="https://aspireexecutive.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Executive Search
              </a>
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
