import { CalendarCheck, Phone } from "lucide-react";
import hero from "../assets/hero.png";

const Hero = () => {
  return (
    <section id="home" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-10">
          {/* Text */}
          <div className="text-center lg:text-left">
            <h1 className="text-slate-900 font-semibold leading-tight text-[22px] sm:text-[28px] lg:text-[32px]">
              Caring & Professional Nursing, Anytime, Anywhere.
            </h1>
            <p className="mt-3 text-slate-600 text-sm sm:text-base lg:text-[17px]">
              Providing safe, professional, and personalized care wherever you need it.
            </p>

            {/* Desktop/tablet CTAs (visible on lg and up) */}
            <div className="mt-6 hidden lg:flex items-center gap-3">
              <a
                href="#book"
                className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-3 text-white text-base font-medium hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 transition"
              >
                <CalendarCheck className="h-5 w-5" />
                <span>Book Appointment</span>
              </a>
              <a
                href="tel:9502017388"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-slate-700 text-base font-medium hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 transition"
              >
                <Phone className="h-5 w-5" />
                <span>Call Me</span>
              </a>
            </div>
          </div>

          {/* Image + Mobile CTAs */}
          <div className="flex flex-col items-center lg:items-end">
            <img
              src={hero}
              alt="Professional nursing care"
              className="
                block h-auto w-full object-contain rounded-xl
                max-w-[220px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[380px] xl:max-w-[420px]
              "
              loading="eager"
              decoding="async"
              draggable="false"
            />

            {/* Mobile CTAs (below image, hidden on lg and up) */}
            <div className="mt-6 flex w-full justify-center gap-3 lg:hidden">
              <a
                href="#book"
                className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-3 text-white text-sm font-medium hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 transition"
              >
                <CalendarCheck className="h-5 w-5" />
                <span>Book Appointment</span>
              </a>
              <a
                href="tel:9502017388"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-slate-700 text-sm font-medium hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 transition"
              >
                <Phone className="h-5 w-5" />
                <span>Call Me</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;