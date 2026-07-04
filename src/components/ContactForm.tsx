import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;

    setLoading(true);
    setStatusMessage('');

    emailjs
      .sendForm(
        'service_jz62qdr',     // Your Service ID
        'template_b3gii4a',    // Your Template ID
        formRef.current,
        'hJ9wKv3rwHVliJO9O'    // Your Public Key
      )
      .then(
        () => {
          setLoading(false);
          setStatusMessage('🎉 Message sent successfully! I will get back to you soon.');
          formRef.current?.reset();
        },
        (error) => {
          setLoading(false);
          setStatusMessage('❌ Failed to send message. Please try again later.');
          console.error('EmailJS Error:', error);
        }
      );
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Me</h2>
      
      <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name" // EmailJS {{name}} ভেরিয়েবলের সাথে মিল রাখা হয়েছে
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email" // EmailJS {{email}} ভেরিয়েবলের সাথে মিল রাখা হয়েছে
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            name="message" // EmailJS {{message}} ভেরিয়েবলের সাথে মিল রাখা হয়েছে
            rows={4}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            placeholder="Write your message here..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition disabled:bg-indigo-400"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {statusMessage && (
        <p className="mt-4 text-center text-sm font-medium text-gray-700">
          {statusMessage}
        </p>
      )}
    </div>
  );
}
