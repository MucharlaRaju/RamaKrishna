import React, { useMemo, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ACCESS_KEY = "acf6586b-752c-44ae-9851-9e08576edfb0";

/**
 * 3-step appointment booking using Web3Forms.
 * Step 1: Name + Phone + Address (Address required)
 * Step 2: Date + Time + Service (supports "Not listed")
 * Step 3: Review & Confirm (submit)
 */
const BookAppointment = () => {
  const [step, setStep] = useState(1);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "", // required
    date: "",
    time: "",
    service: "",
    customService: "",
    notes: "",
    botcheck: "",
  });

  // Services list (last entry is "Not listed")
  const services = useMemo(
    () => [
      "• Vital sign checks (BP, pulse, temperature, etc.)",
      "• Medication management and administration",
      "• Wound care and dressing changes",
      "• Catheter care and management",
      "• Basic health assessments (e.g., blood glucose monitoring)",
      "• IV therapy (e.g., IV fluids, antibiotics)",
      "• Providing education on self-care and disease management",
      "• IM & Subcutaneous administration",
      "• Ryle's tube insertion & management",
      "• Not listed",
    ],
    []
  );

  // Build 30-min time slots 00:00–23:30
  const slots = useMemo(() => {
    const out = [];
    for (let h = 0; h <= 23; h++) {
      for (const m of [0, 30]) {
        out.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      }
    }
    return out;
  }, []);

  // Helper: return true if slot (HH:MM) on dateStr (YYYY-MM-DD) is strictly in the future
  const isSlotInFuture = (slot, dateStr) => {
    if (!dateStr) return true; // no date chosen -> show all
    const [hh, mm] = slot.split(":").map(Number);
    const [y, m, d] = dateStr.split("-").map(Number);
    const slotDate = new Date(y, m - 1, d, hh, mm, 0, 0);
    return slotDate.getTime() > Date.now();
  };

  // When user changes date, clear previously selected time if it's now invalid
  useEffect(() => {
    if (!form.date) return;
    if (form.time && !isSlotInFuture(form.time, form.date)) {
      setForm((p) => ({ ...p, time: "" }));
    }
  }, [form.date]);

  // Format "HH:MM" (24h) to 12-hour display like "08:00 am" or "8:00 pm"
  const formatTime = (t) => {
    const [hhStr, mmStr] = t.split(":");
    const hh = parseInt(hhStr, 10);
    const mm = mmStr;
    const period = hh < 12 ? "am" : "pm";
    let hour12 = hh % 12;
    if (hour12 === 0) hour12 = 12;
    const hourStr =
      period === "am" && hour12 < 10 ? String(hour12).padStart(2, "0") : String(hour12);
    return `${hourStr}:${mm} ${period}`;
  };

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  // Validations (Address required)
  const validStep1 =
    form.fullName.trim().length >= 2 &&
    /^\+?[0-9\s\-]{7,15}$/.test(form.phone.trim()) &&
    form.address.trim().length >= 5; // require non-trivial address

  // Step2: require date, time, and service. If "Not listed" selected require customService text.
  const validStep2 =
    form.date.trim() !== "" &&
    form.time.trim() !== "" &&
    (form.service.trim() !== "" &&
      (form.service !== "NOT_LISTED" ? true : form.customService.trim().length > 2));

  // Map "Not listed" to sentinel value
  const serviceOptionValue = (s) =>
    /not\s*listed/i.test(String(s)) ? "NOT_LISTED" : s;

  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validStep1 || !validStep2) {
      toast.error("Some details are missing or invalid.");
      return;
    }
    if (form.botcheck) return; // honeypot

    setSending(true);
    setResult("Sending....");

    try {
      const fd = new FormData();
      fd.append("access_key", ACCESS_KEY);
      fd.append("from_name", "Appointment Bot");

      const subjectService =
        form.service === "NOT_LISTED" ? form.customService.trim() : form.service;

      fd.append("subject", `New Appointment — ${form.fullName} • ${subjectService}`);
      fd.append("page_url", window.location.href);

      // Fields in email
      fd.append("Name", form.fullName.trim());
      fd.append("Phone", form.phone.trim());
      fd.append("Address", form.address.trim());
      fd.append("Date", form.date);
      fd.append("Time", form.time);

      // Only one service field
      if (form.service === "NOT_LISTED") {
        fd.append("Custom Service (user provided)", form.customService.trim());
      } else {
        fd.append("Service", form.service);
      }

      fd.append("Notes", form.notes?.trim() || "-");
      fd.append("botcheck", form.botcheck);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });
      const data = await response.json();

      if (data.success) {
        setResult("");
        toast.success("Booking sent successfully!");
        setForm({
          fullName: "",
          phone: "",
          address: "",
          date: "",
          time: "",
          service: "",
          customService: "",
          notes: "",
          botcheck: "",
        });
        setStep(1);
      } else {
        console.error("Web3Forms error:", data);
        toast.error(data.message || "Failed to send");
        setResult("");
      }
    } catch (err) {
      console.error("Network error:", err);
      toast.error("Network error. Please try again.");
      setResult("");
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      className="scroll-mt-16 lg:scroll-mt-20 text-center p-6 py-20 lg:px-32 w-full overflow-hidden"
      id="book"
    >
      <ToastContainer />

      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Book an{" "}
        <span className="underline underline-offset-4 decoration-1 under font-light">
          Appointment
        </span>
      </h1>
      <p className="text-center text-gray-500 mb-12 max-w-80 mx-auto">
        3 quick steps — confirmation via email
      </p>

      <form onSubmit={onSubmit} className="max-w-2xl mx-auto text-gray-600 pt-2">
        {/* Stepper: completed steps stay blue */}
        <div className="mb-6 flex items-center gap-4 justify-center">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= n ? "bg-sky-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {n}
              </div>
                {n < 3 && (
                  <div
                    className={`w-12 h-0.5 ${
                      step > n ? "bg-sky-600" : "bg-gray-200"
                    }`}
                  />
                )}
            </div>
          ))}
        </div>

        {/* Honeypot (hidden) */}
        <input
          type="text"
          name="botcheck"
          autoComplete="off"
          tabIndex={-1}
          value={form.botcheck}
          onChange={(e) => setForm({ ...form, botcheck: e.target.value })}
          className="hidden"
        />

        {/* STEP 1: Name + Phone + Address (Address required) */}
        {step === 1 && (
          <div className="space-y-6 text-left">
            <label className="block">
              <span className="text-sm text-gray-600">Full Name</span>
              <input
                className="w-full border border-gray-300 rounded py-3 px-4 mt-2 focus:ring-sky-400 focus:border-sky-400"
                type="text"
                placeholder="Your Name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-600">Phone</span>
              <input
                className="w-full border border-gray-300 rounded py-3 px-4 mt-2 focus:ring-sky-400 focus:border-sky-400"
                type="tel"
                placeholder="+91 75691 09431"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-600">Address</span>
              <textarea
                className="w-full border border-gray-300 rounded py-3 px-4 mt-2 h-24 resize-y focus:ring-sky-400 focus:border-sky-400"
                placeholder="House/Flat, Street, Landmark, City, Pincode"
                autoComplete="street-address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                required
              />
            </label>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (!validStep1) {
                    toast.error(
                      "Please enter a valid name, phone number, and address."
                    );
                    return;
                  }
                  setStep(2);
                }}
                className="px-6 py-2 rounded bg-sky-600 text-white hover:bg-sky-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Date + Time + Service */}
        {step === 2 && (
          <div className="space-y-6 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm text-gray-600">Date</span>
                <input
                  className="w-full border border-gray-300 rounded py-3 px-4 mt-2 focus:ring-sky-400 focus:border-sky-400"
                  type="date"
                  min={minDate}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-600">Time</span>
                <select
                  className="w-full border border-gray-300 rounded py-3 px-4 mt-2 focus:ring-sky-400 focus:border-sky-400"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  required
                >
                  <option value="">Select a time…</option>
                  {slots.map((t) => {
                    const enabled = isSlotInFuture(t, form.date);
                    return (
                      <option key={t} value={t} disabled={!enabled}>
                        {formatTime(t)}
                        {!enabled ? " — unavailable" : ""}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-sm text-gray-600">Service</span>
              <select
                className="w-full border border-gray-300 rounded py-3 px-4 mt-2 focus:ring-sky-400 focus:border-sky-400"
                value={form.service}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    service: e.target.value,
                    customService: e.target.value === "NOT_LISTED" ? p.customService : "",
                  }))
                }
                required
              >
                <option value="">Select a service…</option>
                {services.map((s, idx) => (
                  <option key={idx} value={serviceOptionValue(s)}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            {form.service === "NOT_LISTED" && (
              <label className="block">
                <span className="text-sm text-gray-600">Describe required service</span>
                <input
                  className="w-full border border-gray-300 rounded py-3 px-4 mt-2 focus:ring-sky-400 focus:border-sky-400"
                  type="text"
                  placeholder="Briefly describe the service you need"
                  value={form.customService}
                  onChange={(e) => setForm({ ...form, customService: e.target.value })}
                  required
                />
              </label>
            )}

            <label className="block">
              <span className="text-sm text-gray-600">Additional Notes (optional)</span>
              <textarea
                className="w-full border border-gray-300 rounded py-3 px-4 mt-2 h-28 resize-none focus:ring-sky-400 focus:border-sky-400"
                placeholder="Site location, preferred slot window, etc."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </label>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={back}
                className="px-6 py-2 rounded border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!validStep2) {
                    toast.error(
                      "Please select date, time and a service (or describe it)."
                    );
                    return;
                  }
                  setStep(3);
                }}
                className="px-6 py-2 rounded bg-sky-600 text-white hover:bg-sky-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Review & Confirm */}
        {step === 3 && (
          <div className="space-y-6 text-left">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">Please confirm your booking details.</p>
              <div className="mt-3 space-y-2">
                <div>
                  <span className="text-gray-500 text-sm">Name: </span>
                  <span className="font-medium text-gray-800">{form.fullName || "-"}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Phone: </span>
                  <span className="font-medium text-gray-800">{form.phone || "-"}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Address: </span>
                  <span className="font-medium text-gray-800 whitespace-pre-line">
                    {form.address.trim()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Service: </span>
                  <span className="font-medium text-gray-800">
                    {form.service === "NOT_LISTED"
                      ? form.customService || "-"
                      : form.service || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Date & Time: </span>
                  <span className="font-medium text-gray-800">
                    {form.date || "-"} at {form.time || "-"}
                  </span>
                </div>
                {form.notes?.trim() ? (
                  <div>
                    <span className="text-gray-500 text-sm">Notes: </span>
                    <span className="font-medium text-gray-800">{form.notes.trim()}</span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={back}
                className="px-6 py-2 rounded border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={sending}
                className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
              >
                {sending ? (result || "Sending...") : "Confirm & Book"}
              </button>
            </div>
          </div>
        )}
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        You will receive a call from me (RamaKrishna) within 30 min after completing the appointment booking
      </p>
    </div>
  );
};

export default BookAppointment;