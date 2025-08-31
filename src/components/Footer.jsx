// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer id="footer" className="bg-white text-gray-700">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Top strip */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap sm:items-center sm:justify-between gap-3 bg-[#0069A8] text-white rounded-lg p-6 shadow-md">
          <p className="text-center sm:text-left text-sm sm:text-base">
            For emergency contact 24/7:{" "}
            <a href="tel:+917569109431" className="font-semibold underline">
              +91 75691 09431
            </a>
          </p>
          <a
            href="#book"
            className="w-full sm:w-auto mt-1 sm:mt-0 inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-[#0069A8] text-sm sm:text-base font-semibold hover:bg-gray-100 transition"
          >
            Book Appointment
          </a>
        </div>

        {/* Main footer */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Explore */}
          <div className="min-w-0">
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
              <a href="#testimonials" className="block hover:text-[#0069A8] transition">
                Testimonials
              </a>
            </nav>
          </div>

          {/* Contact me (email) */}
          <div className="min-w-0">
            <h3 className="text-[#0069A8] font-semibold text-lg">Contact me</h3>
            <p className="mt-2 text-sm text-gray-500">
              For any queries or support, feel free to reach out:
            </p>
            <a
              href="mailto:m.raju20021@gamil.com"
              className="mt-3 inline-block text-sm font-medium text-[#0069A8] hover:underline break-words"
            >
              m.raju20021@gamil.com
            </a>
          </div>

          {/* Get in touch (phone) */}
          <div className="min-w-0">
            <h3 className="text-[#0069A8] font-semibold text-lg">Get in touch</h3>
            <p className="mt-2 text-sm text-gray-500">
              We’re here to help you book the right care at the right time.
            </p>
            <a
              href="tel:+917569109431"
              className="mt-3 inline-block text-sm font-medium text-[#0069A8] hover:underline break-words"
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