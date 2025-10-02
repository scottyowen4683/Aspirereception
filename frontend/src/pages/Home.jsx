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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      if (response.data.status === "success") {
        toast.success("Message Sent!", {
          description: "We'll get back to you within 24 hours.",
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="https://customer-assets.emergentagent.com/job_6e1b7f8b-8033-4253-aef3-794266462fd0/artifacts/0jw7k2x6_Jpeg-01.jpg"
              alt="Aspire Executive Solutions"
              className="h-12 w-auto"
            />
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <a
              href="#about"
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              About
            </a>
            {/* Route to the full landing page */}
            <Link
              to="/ai-receptionist"
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              AI Receptionist
            </Link>
            <a
              href="#why-us"
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
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
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Your Business Never Sleeps.
              <span className="block text-blue-600 mt-2">Neither do we.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Elevate your business with AI-powered customer service. 24/7
              availability, up to 70% lower costs, and lightning-fast setup —
              executive excellence delivered through intelligent automation.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="https://calendly.com/scott-owen-aspire/ai-receptionist-demo">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-md transition-transform hover:scale-105">
                  Get Started Today
                </button>
              </a>
              <Link to="/ai-receptionist">
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg rounded-md transition-all">
                  Learn More
                </button>
              </Link>
            </div>
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
                Aspire Executive Solutions brings executive-level expertise to
                cutting-edge AI technology. Led by a former CEO with deep roots
                in the Australian business landscape, we understand the
                pressures and opportunities facing modern organisations.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Our mission is simple: empower businesses to operate with the
                efficiency of tomorrow, today. By combining strategic business
                acumen with advanced AI Customer Service technology, we deliver
                solutions that don't just answer calls — they elevate your
                entire customer experience.
              </p>
              <div className="flex items-center gap-3 text-blue-600 font-semibold">
                <MapPin className="h-5 w-5" />
                <span>Proudly Australian-owned and operated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Receptionist teaser (with image) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
            {/* Left copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full mb-4">
                <span className="text-xs tracking-wide">NEW</span>
                <span className="text-xs">Flagship Product</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Aspire <span className="text-blue-600">AI Receptionist</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Never miss a client call again. 24/7 answering in your tone, bookings,
                lead capture, and instant human routing for VIPs — at a fraction of a salary.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  ["24/7 Coverage", "Round-the-clock availability."],
                  ["Lower Cost", "Save up to 70% vs staffing."],
                  ["Fast Setup", "Live in days, not weeks."],
                  ["Human Routing", "Escalate VIP or urgent calls."],
                ].map(([t, d]) => (
                  <div
                    key={t}
                    className="rounded-xl border border-slate-200 p-4 bg-white"
                  >
                    <div className="text-sm font-semibold text-slate-900">
                      {t}
                    </div>
                    <div className="text-sm text-slate-600">{d}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <a href="https://calendly.com/scott-owen-aspire/ai-receptionist-demo">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium">
                    📞 Book a Demo
                  </button>
                </a>
                <Link to="/ai-receptionist">
                  <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* Right image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1527960471264-932f39eb5840?q=80&w=1600&auto=format&fit=crop"
                alt="Professional call handling"
                className="rounded-2xl shadow-xl border border-slate-200"
                loading="lazy"
              />
              <div className="absolute -bottom-5 -left-5 hidden md:block w-24 h-24 rounded-2xl bg-blue-100" />
            </div>
          </div>
        </div>
      </section>

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
            {[
              {
                icon: <Clock className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />,
                title: "24/7 Availability",
                desc:
                  "Never miss a call, inquiry, or opportunity. Your AI Customer Service team works round the clock, every day of the year.",
              },
              {
                icon: <DollarSign className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />,
                title: "Cost Reduction",
                desc:
                  "Cut admin costs by up to 70% while maintaining premium service quality. Smart business, smarter savings.",
              },
              {
                icon: <Zap className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />,
                title: "Fast Setup",
                desc:
                  "Up and running in hours, not weeks. Our efficient deployment process gets you operational immediately.",
              },
              {
                icon: <Phone className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />,
                title: "Zero Downtime",
                desc:
                  "No sick days, no breaks, no holidays. Consistent, reliable service that you and your clients can depend on.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border-2 border-slate-200 hover:border-blue-600 transition-all duration-300 hover:shadow-xl group bg-white"
              >
                <div className="p-6">
                  <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    {icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                  <p className="text-slate-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
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
                  "Former CEO Leadership",
                  "Strategic business insight drives every solution we deliver, ensuring alignment with your executive vision.",
                ],
                [
                  "Australian-Based Excellence",
                  "Local expertise, local support. We understand the Australian business landscape inside and out.",
                ],
                [
                  "Seamless Integration",
                  "Our AI Customer Support team integrate smoothly with your existing systems, workflows, and business processes.",
                ],
                [
                  "Premium Client Experience",
                  "Your clients deserve the best. Our AI delivers professional, personalised interactions every time.",
                ],
                [
                  "Scalable Solutions",
                  "Grow without limits. Our technology scales effortlessly as your business expands.",
                ],
                [
                  "Ongoing Support",
                  "We're with you every step of the way, providing continuous optimisation and support.",
                ],
              ].map(([title, desc], idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                    <CheckCircle className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
                    <p className="text-slate-600 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
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
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Brand?</h2>
              <p className="text-xl text-blue-100">
                Get in touch today and discover how AI can elevate your business
              </p>
            </div>
            {/* ...contact grid keeps same as your original... */}
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
{/* Contact Section */}
<section id="contact" className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
  <div className="container mx-auto px-6">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Brand?</h2>
        <p className="text-xl text-blue-100">Get in touch today and discover how AI can elevate your business</p>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                {/* Mail icon if you still import it: <Mail className="h-6 w-6" /> */}
                <span aria-hidden>✉️</span>
              </div>
              <div>
                <p className="font-semibold mb-1">Email Us</p>
                <a href="mailto:scott@aspireexecutive.com.au" className="text-blue-200 hover:text-white transition-colors">
                  scott@aspireexecutive.com.au
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                {/* Map icon: <MapPin className="h-6 w-6" /> */}
                <span aria-hidden>📍</span>
              </div>
              <div>
                <p className="font-semibold mb-1">Location</p>
                <p className="text-blue-200">Australia</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                {/* External link icon: <ExternalLink className="h-6 w-6" /> */}
                <span aria-hidden>🔗</span>
              </div>
              <div>
                <p className="font-semibold mb-1">Executive Search Services</p>
                <a href="https://aspireexecutive.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors">
                  aspireexecutive.com.au
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Same working form as AI page — uses your existing handlers/state */}
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

export default Home;
