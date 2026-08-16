// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import api from '../api/axiox';
// import { FiSend, FiMapPin, FiMail } from 'react-icons/fi';

// const contactSchema = z.object({
//   sender_name: z.string().min(2, 'Name is required'),
//   sender_email: z.string().email('Valid email is required'),
//   subject: z.string().min(3, 'Subject is required'),
//   message: z.string().min(10, 'Message must be at least 10 characters'),
// });

// const ContactSection = ({ profile }) => {
//   const [isSent, setIsSent] = useState(false);
//   const [serverError, setServerError] = useState('');

//   const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
//     resolver: zodResolver(contactSchema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       setServerError('');
//       await api.post('/contact/', data);
//       setIsSent(true);
//       reset();
//       setTimeout(() => setIsSent(false), 5000);
//     } catch (err) {
//       setServerError('Failed to send message. Please try again later.');
//     }
//   };

//   if (!profile.show_contact_form) return null;

//   return (
//     <section id="contact" className="bg-gray-50 py-16">
//       <div className="max-w-5xl mx-auto px-4">
//         <h2 className="text-2xl font-semibold mb-2 text-center">Get In Touch</h2>
        
//         {/* Contact info row */}
//         <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-600">
//           {profile.location && (
//             <span className="flex items-center gap-1.5">
//               <FiMapPin className="text-indigo-500" /> {profile.location}
//             </span>
//           )}
//           {profile.contact_email && (
//             <a href={`mailto:${profile.contact_email}`} className="flex items-center gap-1.5 hover:text-indigo-600">
//               <FiMail className="text-indigo-500" /> {profile.contact_email}
//             </a>
//           )}
//           {profile.available_for && (
//             <span className="text-indigo-600 font-medium">
//               Open to: {profile.available_for}
//             </span>
//           )}
//         </div>

//         <div className="max-w-2xl mx-auto">
//           {isSent ? (
//             <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-center">
//               ✓ Message sent successfully! I'll get back to you soon.
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6 space-y-4">
//               {serverError && (
//                 <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded">
//                   {serverError}
//                 </div>
//               )}

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Your Name</label>
//                   <input
//                     {...register('sender_name')}
//                     className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="John Doe"
//                   />
//                   {errors.sender_name && (
//                     <p className="text-red-500 text-xs mt-1">{errors.sender_name.message}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Your Email</label>
//                   <input
//                     {...register('sender_email')}
//                     type="email"
//                     className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="john@example.com"
//                   />
//                   {errors.sender_email && (
//                     <p className="text-red-500 text-xs mt-1">{errors.sender_email.message}</p>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Subject</label>
//                 <input
//                   {...register('subject')}
//                   className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Project inquiry"
//                 />
//                 {errors.subject && (
//                   <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Message</label>
//                 <textarea
//                   {...register('message')}
//                   rows={5}
//                   className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Tell me about your project..."
//                 />
//                 {errors.message && (
//                   <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
//               >
//                 <FiSend />
//                 {isSubmitting ? 'Sending...' : 'Send Message'}
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;


import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../api/axiox';
import { FiSend, FiMapPin, FiMail, FiLoader, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const contactSchema = z.object({
  sender_name: z.string().min(2, 'Name is required'),
  sender_email: z.string().email('Valid email is required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const inputClasses =
  'w-full border border-gray-200 rounded-xl p-3 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 focus:bg-white';

const errorInputClasses = 'border-red-300 focus:ring-red-500/40 focus:border-red-500';

const FieldError = ({ message }) =>
  message ? (
    <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
      <FiAlertCircle className="flex-shrink-0" />
      {message}
    </p>
  ) : null;

const ContactSection = ({ profile }) => {
  const [isSent, setIsSent] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      setServerError('');
      await api.post('/contact/', data);
      setIsSent(true);
      reset();
      setTimeout(() => setIsSent(false), 5000);
    } catch (err) {
      setServerError('Failed to send message. Please try again later.');
    }
  };

  if (!profile.show_contact_form) return null;

  return (
    <section id="contact" className="relative bg-gray-50 py-20 overflow-hidden">
      {/* Subtle decorative glow, pure CSS via Tailwind arbitrary gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-indigo-100/40 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold tracking-wider uppercase text-indigo-600">
            Contact
          </span>
          <h2 className="mt-1 text-2xl md:text-3xl font-semibold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
        </div>

        {/* Contact info row */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm">
          {profile.location && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 shadow-sm">
              <FiMapPin className="text-indigo-500" /> {profile.location}
            </span>
          )}
          {profile.contact_email && (
            <a
              href={`mailto:${profile.contact_email}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 shadow-sm transition-colors duration-200 hover:text-indigo-600 hover:border-indigo-300"
            >
              <FiMail className="text-indigo-500" /> {profile.contact_email}
            </a>
          )}
          {profile.available_for && (
            <span className="flex items-center px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-medium">
              Open to: {profile.available_for}
            </span>
          )}
        </div>

        <div className="max-w-2xl mx-auto">
          {isSent ? (
            <div className="flex flex-col items-center gap-3 bg-white border border-green-200 rounded-2xl px-6 py-10 text-center shadow-sm">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-green-600">
                <FiCheckCircle size={24} />
              </span>
              <p className="text-gray-900 font-semibold">Message sent successfully!</p>
              <p className="text-gray-500 text-sm">I'll get back to you soon.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-5"
              noValidate
            >
              {serverError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-sm">
                  <FiAlertCircle className="flex-shrink-0" />
                  {serverError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Name
                  </label>
                  <input
                    {...register('sender_name')}
                    className={`${inputClasses} ${errors.sender_name ? errorInputClasses : ''}`}
                    placeholder="John Doe"
                  />
                  <FieldError message={errors.sender_name?.message} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Email
                  </label>
                  <input
                    {...register('sender_email')}
                    type="email"
                    className={`${inputClasses} ${errors.sender_email ? errorInputClasses : ''}`}
                    placeholder="john@example.com"
                  />
                  <FieldError message={errors.sender_email?.message} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Subject
                </label>
                <input
                  {...register('subject')}
                  className={`${inputClasses} ${errors.subject ? errorInputClasses : ''}`}
                  placeholder="Project inquiry"
                />
                <FieldError message={errors.subject?.message} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Message
                </label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className={`${inputClasses} resize-none ${errors.message ? errorInputClasses : ''}`}
                  placeholder="Tell me about your project..."
                />
                <FieldError message={errors.message?.message} />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-3 rounded-xl font-medium shadow-sm transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-md hover:from-indigo-500 hover:to-indigo-500 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <FiLoader className="animate-spin motion-reduce:animate-none" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;