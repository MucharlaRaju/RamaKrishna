// Testimonial.jsx
import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

import profile1 from "../assets/profile1.png";
import profile2 from "../assets/profile2.png";
import profile3 from "../assets/profile3.png";
import profile4 from "../assets/profile4.png";
import profile5 from "../assets/profile5.png";

const testimonials = [
  {
    name: "Raju",
    experience: "The booking process was super easy and smooth. Highly recommended!",
    stars: 5,
    profilePic: "profile1.png",
  },
  {
    name: "Tilak",
    experience:
      "Very professional service..",
    stars: 4,
    profilePic: "profile2.png",
  },
  {
    name: "Vijay",
    experience: "Quick and reliable! I got my appointment confirmed instantly.",
    stars: 5,
    profilePic: "profile3.png",
  },
  {
    name: "Naga Raju",
    experience: "Good overall experience but could be improved.",
    stars: 4,
    profilePic: "profile4.png",
  },
  {
    name: "Arjun Reddy",
    experience: "Excellent.. very smooth booking experience.",
    stars: 5,
    profilePic: "profile5.png",
  },
];

const avatarMap = {
  "profile1.png": profile1,
  "profile2.png": profile2,
  "profile3.png": profile3,
  "profile4.png": profile4,
  "profile5.png": profile5,
};

function Stars({ count }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= count;
        return (
          <Star
            key={i}
            className={`h-4 w-4 ${filled ? "text-[#0069A8] fill-[#0069A8]" : "text-[#0069A8]/25"}`}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}

function TestimonialCard({ t }) {
  const src = avatarMap[t.profilePic];
  return (
    <article
      data-card="true"
      className="
        snap-start shrink-0
        w-[85%] sm:w-[60%] md:w-[48%] lg:w-[36%] xl:w-[30%]
      "
    >
      <div className="relative h-full bg-white rounded-2xl p-6 shadow-sm ring-1 ring-[#0069A8]/10">
        <Quote className="absolute -top-3 -left-3 h-8 w-8 text-[#0069A8]/15" aria-hidden="true" />
        <div className="flex items-start gap-4">
          <img
            src={src}
            alt={`${t.name} profile`}
            className="h-12 w-12 rounded-full object-cover ring-1 ring-[#0069A8]/15"
            loading="lazy"
            decoding="async"
            draggable="false"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-slate-900">{t.name}</p>
              <Stars count={t.stars} />
            </div>
            <p className="mt-3 text-slate-600">“{t.experience}”</p>
          </div>
        </div>
      </div>
    </article>
  );
}

const HIDE_SCROLLBAR_CSS = `
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  .hide-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
`;

const Testimonial = () => {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 0);
    setCanNext(el.scrollLeft < maxScroll - 1);
  };

  const scrollByOne = (dir = "next") => {
    const el = trackRef.current;
    if (!el) return;
    const firstCard = el.querySelector('[data-card="true"]');
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const styles = window.getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const distance = (cardWidth + gap) * (dir === "next" ? 1 : -1);
    el.scrollBy({ left: distance, behavior: "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    const onScroll = () => updateArrows();
    const onResize = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const id = requestAnimationFrame(updateArrows);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <section id="testimonials" className="bg-[#F4FAFF]">
      {/* Inject scrollbar hiding styles */}
      <style>{HIDE_SCROLLBAR_CSS}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-[#0069A8]" />
          <h2 className="text-[clamp(1.25rem,2.2vw,2rem)] font-semibold text-[#0069A8] tracking-tight">
            What our users say
          </h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
            Real experiences from people who booked with us.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-10">
          {/* Track */}
          <div
            ref={trackRef}
            className="
              flex gap-4 sm:gap-6 overflow-x-auto hide-scrollbar
              snap-x snap-mandatory pb-2
              touch-pan-x select-none
            "
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>

          {/* Controls */}
          <button
            type="button"
            onClick={() => scrollByOne("prev")}
            disabled={!canPrev}
            aria-label="Previous testimonial"
            className="
              absolute top-1/2 -translate-y-1/2 left-2 sm:left-3 z-20
              inline-flex items-center justify-center
              h-11 w-11 sm:h-12 sm:w-12 rounded-full
              bg-[#0069A8] text-white shadow-lg shadow-[#0069A8]/25
              hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition
            "
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => scrollByOne("next")}
            disabled={!canNext}
            aria-label="Next testimonial"
            className="
              absolute top-1/2 -translate-y-1/2 right-2 sm:right-3 z-20
              inline-flex items-center justify-center
              h-11 w-11 sm:h-12 sm:w-12 rounded-full
              bg-[#0069A8] text-white shadow-lg shadow-[#0069A8]/25
              hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition
            "
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;