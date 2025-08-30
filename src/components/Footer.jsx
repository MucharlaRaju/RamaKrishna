// Footer.jsx
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    setLoading(true);

    const formData = new FormData(event.target);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setResult("");
        toast.success("Subscription successful!");
        event.target.reset();
      } else {
        toast.error(data.message || "Something went wrong!");
        setResult("");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
      setResult("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="footer" className="bg-white text-gray-700">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Top strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#0069A8] text-white rounded-lg p-6 shadow-md">
          <p className="text-center sm:text-left text-sm sm:text-base">
            For emergency contact 24/7:{" "}
            <a href="tel:+917569109431" className="font-semibold underline">
              +91 75691 09431
            </a>
          </p>
          <a
            href="#book"
            className="mt-3 sm:mt-0 inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-[#0069A8] text-sm sm:text-base font-semibold hover:bg-gray-100 transition"
          >
            Book Appointment
          </a>
        </div>

        {/* Main footer */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Explore */}
          <div>
            <h3 className="text-[#0069A8] font-semibold text-lg">Explore</h3>
            <nav className="mt-3 space-y-1.5 text-sm">
              <a href="#home" className="block hover:text-[#0069A8] transition">
                Home
              </a>
              <a href="#services" className="block hover:text-[#0069A8] transition">
                Services
              </a>
              <a href="#about" className="block hover:text-[#0069A8] transition">
                About
              </a>
              <a href="#tips" className="block hover:text-[#0069A8] transition">
                Tips
              </a>
              <a href="#book" className="block hover:text-[#0069A8] transition">
                Book Appointment
              </a>
              <a
                href="#testimonials"
                className="block hover:text-[#0069A8] transition"
              >
                Testimonials
              </a>
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[#0069A8] font-semibold text-lg">
              Subscribe to our Newsletter
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Get the latest news, tips, and updates directly in your inbox.
            </p>
            <form
              onSubmit={onSubmit}
              className="mt-3 flex flex-col sm:flex-row gap-2"
              aria-live="polite"
            >
              <input
                type="hidden"
                name="access_key"
                value="acf6586b-752c-44ae-9851-9e08576edfb0"
              />
              <input type="hidden" name="subject" value="Subscribed" />
              <input type="hidden" name="from_name" value="New Subscriber" />
              <input
                type="hidden"
                name="page_url"
                value={typeof window !== "undefined" ? window.location.href : ""}
              />
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0069A8]"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-[#0069A8] px-5 py-3 text-white text-sm font-medium hover:bg-[#005a90] transition disabled:opacity-70"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {result && <p className="mt-2 text-xs text-gray-500">{result}</p>}
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#0069A8] font-semibold text-lg">Get in touch</h3>
            <p className="mt-2 text-sm text-gray-500">
              We’re here to help you book the right care at the right time.
            </p>
            <a
              href="tel:+917569109431"
              className="mt-3 inline-block text-sm font-medium text-[#0069A8] hover:underline"
            >
              +91 75691 09431
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Ramakrishna. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
