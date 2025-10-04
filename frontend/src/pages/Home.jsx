import React, { useEffect, useState } from "react";
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

// Assets
const ASPIRE_LOGO =
  "https://raw.githubusercontent.com/scottyowen4683/Aspirereception/refs/heads/feature/ai-receptionist/frontend/aspire.png";
const LOCAL_BUY_LOGO =
  "https://raw.githubusercontent.com/scottyowen4683/Aspirereception/refs/heads/feature/ai-receptionist/frontend/src/localbuy.png";

// Demo details
const DEMO_NUMBER = "+61 2 1234 5678"; // replace with live demo AI number
const BOOKING_URL =
  "https://calendly.com/scott-owen-aspire/ai-receptionist-demo";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Chatbot loader (LeadConnector)
  useEffect(() => {
    const SCRIPT_ID = "leadconnector-chatbot";
    if (document.getElementById(SCRIPT_ID)) return; // avoid double-load

    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.src = "https://widgets.leadconnectorhq.com/loader.js";
    s.setAttribute(
      "data-resources-url",
      "https://widgets.leadconnectorhq.com/chat-widget/loader.js"
    );
    s.setAttribute("data-widget-id", "68de330a0160d118b515f4b6");

    document.body.appendChild(s);
  }, []);

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
          <img
            src={ASPIRE_LOGO}
            alt="Aspire Executive Solutions"
            className="h-12 w-auto"
          />
          <nav className="hidden md:flex gap-8 items-center">
            <a href="#features" className="text-slate-700 hover:text-blue-600 font-medium">
              Solutions
            </a>
            <a href="#compliance" className="text-slate-700 hover:text-blue-600 font-medium">
              Compliance
            </a>
            <a href="#use-cases" className="text-slate-700 hover:text-blue-600 font-medium">
              Use Cases
            </a>
            <a href="#pricing" className="text-slate-700 hover:text-blue-600 font-medium">
              Pricing
            </a>
            <a
              href="https://aspireexecutive.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-blue-600 font-medium flex items-center gap-1"
            >
              Executive Search <ExternalLink className="h-3 w-3" />
            </a>
            <a href="#contact">
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2">
                Contact Us
              </button>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6 text-center max-w-5xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block text-slate-900">Community expectations rise.</span>
            <span className="block text-blue-600 mt-1">We stay ahead.</span>
          </h1>
          <p className="text-xl text-slate-700 mb-8 leading-relaxed max-w-3xl mx-auto">
            Aspire delivers 24/7 community support with Australian-based data
            compliance and seamless integration into council systems. Let AI
            handle routine enquiries so your staff can focus on complex,
            high-value work.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href={BOOKING_URL} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-md">
              Book a Demo
            </a>
            <a href="#demo" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg rounded-md">
              See It in Action
            </a>
            <a href={`tel:${DEMO_NUMBER.replace(/\s/g, "")}`} className="border-2 border-slate-300 text-slate-800 hover:bg-white px-8 py-3 text-lg rounded-md flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Call the AI Demo: {DEMO_NUMBER}
            </a>
          </div>
        </div>
      </section>

      {/* Launch Offer */}
      <section className="py-6">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-wider">Launch Offer</p>
              <p className="text-xl md:text-2xl font-bold mt-1">
                Setup Fee <span className="line-through opacity-80">$10,000</span>{" "}
                → <span className="bg-white/20 px-2 py-1 rounded-md">FREE for the first 3 councils</span>
              </p>
            </div>
            <a href="#contact" className="mt-4 md:mt-0 rounded-xl bg-white text-blue-700 font-semibold px-5 py-3 hover:bg-blue-50">
              Claim Offer
            </a>
          </div>
        </div>
      </section>

      {/* Local Buy */}
      <section className="py-6">
        <div className="container mx-auto px-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-center gap-4">
            <img src={LOCAL_BUY_LOGO} alt="Local Buy" className="h-8 w-auto" />
            <span className="text-slate-700 font-medium">Local Buy Approved Supplier</span>
          </div>
        </div>
      </section>

      {/* Chatbot section */}
      <section id="demo" className="py-16 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Talk to our Virtual Council Chat Bot
            </h2>
            <p className="text-slate-700">
              Aspire includes a fully customisable web chat bot tailored to your services
              and workflows.
            </p>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li>• Answers FAQs instantly (rates, bins, bookings, councillor info)</li>
              <li>• Escalates to staff or logs requests directly</li>
              <li>• Fully branded and configured for your community</li>
              <li>• Try it now — see chat widget (bottom-right)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Pricing & Packages</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {/* Essential */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold">Essential</p>
              <p className="mt-2 text-3xl font-extrabold">POA</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>• Inbound call handling & requests</li>
                <li>• Chatbot integration</li>
                <li>• Quick deployment</li>
              </ul>
              <a href="#contact" className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700">
                Contact Us Now
              </a>
            </div>
            {/* Advanced */}
            <div className="rounded-2xl border border-blue-300 bg-blue-50 p-6">
              <p className="text-sm font-semibold">Advanced</p>
              <p className="mt-2 text-3xl font-extrabold">POA</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>• Everything in Essential</li>
                <li>• Integrations & workflows</li>
                <li>• Reporting & insights</li>
              </ul>
              <a href="#contact" className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700">
                Contact Us Now
              </a>
            </div>
            {/* Premium */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold">Premium</p>
              <p className="mt-2 text-3xl font-extrabold">Tailored</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>• Custom workflows & analytics</li>
                <li>• Priority SLA & support</li>
                <li>• Executive reporting</li>
              </ul>
              <a href="#contact" className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700">
                Contact Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Customer Service?</h2>
            <p className="text-xl text-blue-100">
              Simpler. Faster. Better. Let AI do the routine while your staff focus on what matters.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-blue-200" />
            <input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-blue-200" />
            <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-blue-200" />
            <textarea name="message" placeholder="Tell us about your needs..." value={formData.message} onChange={handleChange} required rows={4} className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-blue-200" />
            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-3 font-medium">
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={ASPIRE_LOGO} alt="Aspire Executive Solutions" className="h-8 w-auto invert" />
            <span className="text-sm">
              © {new Date().getFullYear()} Aspire Executive Solutions. All rights reserved.
            </span>
          </div>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-white">Solutions</a>
            <a href="#compliance" className="hover:text-white">Compliance</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="https://aspireexecutive.com.au" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Executive Search
            </a>
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/accessibility" className="hover:text-white">Accessibility</Link>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
