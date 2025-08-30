// WhatsAppButton.jsx
import whatsappIcon from "../assets/whatsapp.png";

const WhatsAppButton = () => {
  const COUNTRY_CODE = "+91";
  const PHONE = "7569109431";
  const MESSAGE = "Hello! I’d like to book an appointment.";
  const WA_LINK = `https://wa.me/${COUNTRY_CODE}${PHONE}?text=${encodeURIComponent(
    MESSAGE
  )}`;

  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 group"
    >
      <span className="sr-only">Chat on WhatsApp</span>

      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] shadow-lg shadow-green-500/20 ring-1 ring-black/5 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <img
          src={whatsappIcon}
          alt="WhatsApp"
          className="w-7 h-7 md:w-8 md:h-8 object-contain"
          draggable="false"
        />
      </div>
    </a>
  );
};

export default WhatsAppButton;