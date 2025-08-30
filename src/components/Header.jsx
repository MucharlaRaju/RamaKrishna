import React, { useState, useEffect } from "react";
import { Hospital, X, Menu } from "lucide-react";

const navList = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#tips", label: "Tips" },
  { href: "#book", label: "Book Appointment" },
  { href: "#testimonials", label: "Testimonials" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState(() => window.location.hash || "#home");

  // Helper: get current sticky header height
  const getHeaderHeight = () => {
    const header = document.querySelector("header");
    return (header?.offsetHeight || 0);
  };

  // Smooth, precise scroll with header offset
  const scrollToTarget = (hash) => {
    const id = (hash || "").replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - (getHeaderHeight() + 4);
    window.scrollTo({ top: y, behavior: "smooth" });
    // Update hash without causing another jump
    window.history.replaceState(null, "", `#${id}`);
  };

  useEffect(() => {
    // Update active on hash change (back/forward actions)
    const onHash = () => setActive(window.location.hash || "#home");
    window.addEventListener("hashchange", onHash);

    // IntersectionObserver to update active while scrolling
    const sections = navList
      .map((l) => l.href.replace("#", ""))
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length) {
      const obs = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((e) => e.isIntersecting);
          if (visible.length) {
            const top = visible.reduce((a, b) =>
              a.intersectionRatio > b.intersectionRatio ? a : b
            );
            setActive(`#${top.target.id}`);
          }
        },
        { root: null, rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
      );

      sections.forEach((el) => obs.observe(el));
      return () => {
        obs.disconnect();
        window.removeEventListener("hashchange", onHash);
      };
    }

    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="container mx-auto flex items-center justify-between gap-4 py-3 px-4 lg:px-8">
        {/* Brand */}
        <a
          href="#home"
          className="flex items-center gap-3 shrink-0"
          aria-label="Ramakrishna Cares - Home"
          onClick={(e) => {
            e.preventDefault();
            setActive("#home");
            // Ensure any mobile menu is closed before scrolling
            setIsMenuOpen(false);
            // Scroll after layout settles
            requestAnimationFrame(() => scrollToTarget("#home"));
          }}
        >
          <div className="rounded-full bg-sky-50 p-2">
            <Hospital className="w-7 h-7 text-sky-600" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-sky-900 leading-tight">
              Ramakrishna Cares
            </div>
            <div className="text-xs text-gray-500 -mt-0.5">Home nursing & care</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4 ml-6">
          {navList.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(link.href);
                  scrollToTarget(link.href);
                }}
                className={`text-sm transition-colors flex items-center ${
                  isActive
                    ? "text-sky-700 bg-sky-50 ring-1 ring-sky-100 rounded-lg px-3 py-1 shadow-sm font-medium"
                    : "text-gray-700 hover:text-sky-600 px-3 py-1 rounded-md"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#book"
            onClick={(e) => {
              e.preventDefault();
              setActive("#book");
              scrollToTarget("#book");
            }}
            className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition ${
              active === "#book"
                ? "bg-white text-sky-700 ring-1 ring-sky-100 border border-sky-100 font-semibold"
                : "bg-sky-600 hover:bg-sky-700 text-white"
            }`}
            aria-label="Book Appointment"
          >
            Book Appointment
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen((s) => !s)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded-md border border-gray-100 bg-white shadow-sm"
          >
            {isMenuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transform-gpu transition-all duration-200 origin-top ${
          isMenuOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden`}
      >
        <div className="px-4 pb-6 space-y-3 border-t border-gray-100 bg-white">
          {navList.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                href={link.href}
                key={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(link.href);
                  setIsMenuOpen(false);
                  // Wait for menu collapse animation (200ms), then scroll
                  setTimeout(() => scrollToTarget(link.href), 220);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md transition ${
                  isActive
                    ? "bg-sky-50 text-sky-700 font-semibold ring-1 ring-sky-100"
                    : "text-gray-700 hover:bg-sky-50"
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <div className="mt-2 px-3">
            <a
              href="#book"
              onClick={(e) => {
                e.preventDefault();
                setActive("#book");
                setIsMenuOpen(false);
                setTimeout(() => scrollToTarget("#book"), 220);
              }}
              className={`block text-center w-full py-2 rounded-lg font-medium transition ${
                active === "#book" ? "bg-white text-sky-700 ring-1 ring-sky-100 border border-sky-100" : "bg-sky-600 text-white hover:bg-sky-700"
              }`}
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;