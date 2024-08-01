'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import { z } from 'zod'
import { FormDataSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = z.infer<typeof FormDataSchema>

const steps = [
  {
    id: 'Step 1',
    // name: 'Personal Information',
    name: 'தனிப்பட்ட தகவல்',
    fields: ['firstName', 'lastName', 'email']
  },
  {
    id: 'Step 2',
    // name: 'Address',
    name: 'முகவரி',
    fields: ['country', 'state', 'city', 'street', 'zip']
  },
  { id: 'Step 3', name: 'Complete' }
];

let baseUrl = `https://chipper-toffee-e75e3f.netlify.app/.netlify/functions/api`
let localUrl = `http://localhost:8888/.netlify/functions/api`;
//baseUrl = localUrl;

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema)
  })

  const processForm: SubmitHandler<Inputs> = async (data) => {
    await fetch(`${baseUrl}/add_new_neelam_user`, {
      method: "POST",
      body: JSON.stringify({ newUserData: data }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then((res) => {
      console.log(res.json())
    });
    console.log("static",data)
    reset()
  }

  type FieldName = keyof Inputs

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)()
      }
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

  return (
    <section className='absolute inset-0 flex flex-col justify-between p-24 bg-gradient-to-b from-indigo-950 to-white via-indigo-200'>
      {/* steps */}
      <nav aria-label='Progress'>
        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              {currentStep > index ? (
                <div className='group flex w-full flex-col border-l-4 border-lime-400 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-lime-400 transition-colors '>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className='flex w-full flex-col border-l-4 border-neutral-100 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                  aria-current='step'
                >
                  <span className='text-sm font-medium text-neutral-100'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : (
                <div className='group flex w-full flex-col border-l-4 border-blue-950 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-blue-950 transition-colors'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form className='mt-1 py-12' onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
            தனிப்பட்ட தகவல்
              {/* Personal Information */}
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
            உங்கள் தனிப்பட்ட விவரங்களை வழங்கவும்.
              {/* Provide your personal details. */}
            </p>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  {/* First name */}
                  முதல் பெயர்
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='firstName'
                    {...register('firstName')}
                    autoComplete='given-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.firstName?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  {/* Last name */}
                  கடைசி பெயர்
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='lastName'
                    {...register('lastName')}
                    autoComplete='family-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.lastName?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  {/* Email address */}
                  மின்னஞ்சல் முகவரி
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    type='email'
                    {...register('email')}
                    autoComplete='email'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.email?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              {/* Address */}
              முகவரி
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              {/* Address where you can receive mail. */}
              நீங்கள் அஞ்சலைப் பெறக்கூடிய முகவரி.
            </p>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='country'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  {/* Country */}
                  நாடு
                </label>
                <div className='mt-2'>
                  <select
                    id='country'
                    {...register('country')}
                    autoComplete='country-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    <option>India</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                  {errors.country?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='street'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  {/* Street address */}
                  தெரு முகவரி
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='street'
                    {...register('street')}
                    autoComplete='street-address'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.street?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.street.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-2 sm:col-start-1'>
                <label
                  htmlFor='city'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  {/* City */}
                  நகரம்
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='city'
                    {...register('city')}
                    autoComplete='address-level2'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.city?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='state'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  {/* State / Province */}
                  நிலை / மாகாணம்
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='state'
                    {...register('state')}
                    autoComplete='address-level1'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.state?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='zip'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  {/* ZIP / Postal code */}
                  ஜிப் / அஞ்சல் குறியீடு
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='zip'
                    {...register('zip')}
                    autoComplete='postal-code'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.zip?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.zip.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              {/* Completed */}
              நிறைவடைந்தது
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              {/* Thank you for your submission. */}
              உங்கள் சமர்ப்பிப்புக்கு நன்றி.
            </p>
          </>
        )}
      </form>

      {/* Navigation */}
      <div className='mt-8 pt-5'>
        <div className='flex justify-between'>
          <button
            type='button'
            onClick={prev}
            disabled={currentStep === 0}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5L8.25 12l7.5-7.5'
              />
            </svg>
          </button>
          <button
            type='button'
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 4.5l7.5 7.5-7.5 7.5'
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
