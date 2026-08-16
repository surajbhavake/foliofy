import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../api/axiox';
import { FiSend, FiMapPin, FiMail } from 'react-icons/fi';

const contactSchema = z.object({
  sender_name: z.string().min(2, 'Name is required'),
  sender_email: z.string().email('Valid email is required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const ContactSection = ({ profile }) => {
  const [isSent, setIsSent] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
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
    <section id="contact" className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-2 text-center">Get In Touch</h2>
        
        {/* Contact info row */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-600">
          {profile.location && (
            <span className="flex items-center gap-1.5">
              <FiMapPin className="text-indigo-500" /> {profile.location}
            </span>
          )}
          {profile.contact_email && (
            <a href={`mailto:${profile.contact_email}`} className="flex items-center gap-1.5 hover:text-indigo-600">
              <FiMail className="text-indigo-500" /> {profile.contact_email}
            </a>
          )}
          {profile.available_for && (
            <span className="text-indigo-600 font-medium">
              Open to: {profile.available_for}
            </span>
          )}
        </div>

        <div className="max-w-2xl mx-auto">
          {isSent ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-center">
              ✓ Message sent successfully! I'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6 space-y-4">
              {serverError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded">
                  {serverError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Your Name</label>
                  <input
                    {...register('sender_name')}
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="John Doe"
                  />
                  {errors.sender_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.sender_name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Your Email</label>
                  <input
                    {...register('sender_email')}
                    type="email"
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="john@example.com"
                  />
                  {errors.sender_email && (
                    <p className="text-red-500 text-xs mt-1">{errors.sender_email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input
                  {...register('subject')}
                  className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Project inquiry"
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <FiSend />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;