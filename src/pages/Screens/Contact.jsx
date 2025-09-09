import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission logic here
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#10151F] flex flex-col items-center justify-center px-4 py-8">
      <div className=" rounded-xl shadow-lg p-8 w-full max-w-2xl flex flex-col gap-6 items-center">
        <h1 className="text-white text-3xl font-bold mb-2 text-center">Contact Us</h1>
        <div className="flex flex-col sm:flex-row sm:gap-12 gap-6 w-full justify-center items-center flex-wrap">
          <div className="flex items-center gap-2 text-lg text-white whitespace-nowrap">
            <FaPhoneAlt className="text-[#EAB308]" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-2 text-lg text-white whitespace-nowrap">
            <FaEnvelope className="text-[#EAB308]" />
            <span>uniquefitness@gmail.com</span>
          </div>
          <a
            href="https://chat.whatsapp.com/your-group-link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-[#1DA851] transition whitespace-nowrap"
          >
            <FaWhatsapp className="text-2xl" /> Join WhatsApp Group
          </a>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4 mt-6">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="bg-[#232A36] text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            className="bg-[#232A36] text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={4}
            className="bg-[#232A36] text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <button
            type="submit"
            className="bg-[#EAB308] text-black font-bold rounded-md py-2 transition hover:bg-yellow-400"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
