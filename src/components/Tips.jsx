import { button, section } from "framer-motion/client";
import React, { useState } from "react";
import { FaTint, FaAppleAlt, FaRunning, FaBed, FaTooth, FaEye } from "react-icons/fa";

const Tips = () => {
  const [activeTip, setActiveTip] = useState(0);
  const tips = [
    {
      title: "Stay Hydrated",
      content:
        "Drink at least 7-8 glasses of water daily to keep your body refreshed and energized.",
      icon: <FaTint className="w-8 h-8 text-sky-500" />,
    },
    {
      title: "Eat Balanced Meals",
      content:
        "Include fruits, vegetables, whole grains, and lean proteins in your daily diet for overall health.",
      icon: <FaAppleAlt className="w-8 h-8 text-green-500" />,
    },
    {
      title: "Exercise Regularly",
      content:
        "Engage in at least 30 minutes of physical activity, such as walking, yoga, or cycling, every day.",
      icon: <FaRunning className="w-8 h-8 text-orange-500" />,
    },
    {
      title: "Get Enough Sleep",
      content:
        "Aim for 7-9 hours of quality sleep each night to allow your body and mind to recharge.",
      icon: <FaBed className="w-8 h-8 text-blue-500" />,
    },
    
    {
      title: "Limit Screen Time",
      content:
        "Take regular breaks from mobiles, laptops, and TV to reduce eye strain and improve mental well-being.",
      icon: <FaEye className="w-8 h-8 text-purple-500" />,
    },
  ];

  return (
    <section id="tips" className="scroll-mt-16 lg:scroll-mt-20 max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Simple Health Tips</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Follow these easy habits every day to stay fit, active, and healthy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {tips.map((tip, index) => (
          <button
            key={index}
            onClick={() => setActiveTip(index)}
            className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center ${activeTip === index ? 'bg-white shadow-lg border-b-4 border-sky-400' : 'bg-gray-100 hover:bg-blue-200'}`}
            aria-pressed={activeTip === index}
          >
            <div className="mb-2">{tip.icon}</div>
            <h3 className="font-medium text-gray-800 text-sm md:text-base">{tip.title}</h3>
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-r from-sky-50 to-blue-100 rounded-2xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0 bg-white p-6 rounded-xl shadow-md">
            {tips[activeTip].icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{tips[activeTip].title}</h3>
            <p className="text-gray-600 text-lg leading-relaxed">{tips[activeTip].content}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="flex space-x-2">
          {tips.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTip(index)}
              className={`w-3 h-3 rounded-full transition-all ${activeTip === index ? 'bg-sky-500' : 'bg-gray-300'}`}
              aria-label={`Go to tip ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tips;