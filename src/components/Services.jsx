import { motion } from 'framer-motion'
import React from 'react'
import { FaHeartbeat, FaPills, FaBandAid, FaStethoscope, FaProcedures } from 'react-icons/fa'
import { GiMedicalDrip, GiSyringe } from 'react-icons/gi'
import { RiSyringeLine } from 'react-icons/ri'
import { MdSchool } from 'react-icons/md'

const services = [
  {
    icon: <FaHeartbeat className='w-10 h-10 text-amber-500' />,
    title: 'Vital sign checks (BP, pulse, temperature, etc.)',
    description: 'Regular monitoring of blood pressure, pulse, temperature, and breathing to keep track of your health.'
  },
  {
    icon: <FaPills className='w-10 h-10 text-green-500' />,
    title: 'Medication management and administration',
    description: 'Safe and timely giving of medicines as prescribed by the doctor, avoiding missed doses or errors.'
  },
  {
    icon: <FaBandAid className='w-10 h-10 text-yellow-500' />,
    title: 'Wound care and dressing changes',
    description: 'Cleaning and covering wounds properly to promote healing and prevent infection.'
  },
  {
    icon: <GiMedicalDrip className='w-10 h-10 text-pink-500' />,
    title: 'Catheter care and management',
    description: 'Professional care of urinary catheters to maintain hygiene and prevent complications.'
  },
  {
    icon: <FaStethoscope className='w-10 h-10 text-violet-500' />,
    title: 'Basic health assessments (e.g., blood glucose monitoring)',
    description: 'Simple tests like checking sugar levels to monitor ongoing health conditions.'
  },
  {
    icon: <RiSyringeLine className='w-10 h-10 text-red-500' />,
    title: 'IV therapy (e.g., IV fluids, antibiotics)',
    description: 'Giving fluids, antibiotics, or other treatments directly through a vein safely.'
  },
  {
    icon: <MdSchool className='w-10 h-10 text-sky-500' />,
    title: 'Providing education on self-care and disease management',
    description: 'Guiding patients and families on how to take care of health and manage long-term conditions at home.'
  },
  {
    icon: <GiSyringe className='w-10 h-10 text-orange-500' />,
    title: 'IM & Subcutaneous administration',
    description: 'Giving injections (in muscle or under the skin) as prescribed by the doctor.'
  },
  {
    icon: <FaProcedures className='w-10 h-10 text-teal-500' />,
    title: "Ryle's tube insertion & management",
    description: 'Safe placement and care of feeding tubes for patients who cannot eat normally.'
  }
]

const Services = () => {
  return (
    <section id='services' className='scroll-mt-20 pt-24 pb-8 bg-gradient-to-br from-white to-sky-50'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-sky-900 mb-4'>
            My Nursing Care Services
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            I provide professional nursing care services at home, ensuring comfort, safety, and compassionate support tailored to each patient’s needs.
          </p>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {services.map((service, index)=>(
            <motion.div key={index}
              className='bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition-all border border-sky-100 hover:border-sky-300'
              whileHover={{scale: 1.05}}
              transition={{type: "spring", stiffiness:300}}
            >
              <div className='flex items-center justify-center mb-4'>
                {service.icon}
              </div>
              <h3 className='text-lg font-semibold text-sky-600 text-center mb-2'>
                {service.title}
              </h3>
              <p className='text-gray-600 text-sm text-center'>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services