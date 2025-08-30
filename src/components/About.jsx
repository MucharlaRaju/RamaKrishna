import React from 'react'
import aboutImg from '../assets/withPatient.png'
import { FaUserMd, FaBriefcase, FaGlobe, FaPhoneAlt, FaAward } from 'react-icons/fa'

const About = () => {
  return (
    <section id='about' className='py-20 scroll-mt-20 bg-sky-50'>
      <div className='container mx-auto px-6'>
        <div className='bg-white rounded-3xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 lg:p-12'>
          <div className='flex justify-center lg:justify-start'>
            <div className='relative'>
              <img
                src={aboutImg}
                alt='K. Ramakrishna with patient'
                className='w-72 sm:w-80 lg:w-[420px] rounded-2xl object-cover shadow-xl border-4 border-sky-100'
              />
              <div className='absolute -bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm flex items-center gap-3 border border-sky-100'>
                <FaAward className='text-amber-400 w-5 h-5 drop-shadow-sm' />
                <div className='text-sm text-sky-700 font-semibold'>7+ Years Experience</div>
              </div>
            </div>
          </div>

          <div className='space-y-6'>
            <div className='flex items-center gap-3'>
              <FaUserMd className='text-sky-600 w-8 h-8' />
              <h2 className='text-3xl font-extrabold text-sky-900'>About K. Ramakrishna</h2>
            </div>

            <div className='text-gray-700 space-y-4 text-base leading-relaxed'>
              <p>
                I’m K. Ramakrishna — a professional nurse with over 7 years of experience in oncology, ICU, radiation therapy,
                chemotherapy, and bone marrow transplantation care. I hold a B.Sc. in Nursing from Indo-American College of Nursing,
                Hyderabad, and have worked with leading hospitals including Basavatarakam Indo-American Cancer Hospital, CARE Hospitals,
                and Continental Hospitals.
              </p>

              <p>
                I provide hospital-quality nursing care at home with a focus on safety, dignity and comfort. Specialties include critical care,
                wound management, IV therapy, catheter care and patient & family education.
              </p>

              <p>
                Languages: English, Telugu, Hindi, Malayalam. Outside work I enjoy teaching, reading and staying active through sports.
              </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
              <div className='bg-sky-50 border border-sky-100 rounded-lg p-3 text-center'>
                <div className='text-sm text-gray-500'>Experience</div>
                <div className='text-lg font-semibold text-sky-700'>7+ yrs</div>
              </div>
              <div className='bg-sky-50 border border-sky-100 rounded-lg p-3 text-center'>
                <div className='text-sm text-gray-500'>Patients Served</div>
                <div className='text-lg font-semibold text-sky-700'>500+</div>
              </div>
              <div className='bg-sky-50 border border-sky-100 rounded-lg p-3 text-center'>
                <div className='text-sm text-gray-500'>Languages</div>
                <div className='text-lg font-semibold text-sky-700'>4</div>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 pt-2'>
              <a
                href='#book'
                className='inline-flex items-center gap-3 bg-sky-600 hover:bg-sky-700 text-white px-5 py-3 rounded-full shadow-md transition font-medium'
              >
                <FaPhoneAlt className='w-4 h-4' />
                Book Appointment
              </a>

              <a
                href='#services'
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className='inline-flex items-center gap-3 border border-sky-200 text-sky-700 px-5 py-3 rounded-full hover:shadow-sm transition font-medium'
                aria-label='View Services'
              >
                <FaGlobe className='w-4 h-4 text-sky-600' />
                View Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
