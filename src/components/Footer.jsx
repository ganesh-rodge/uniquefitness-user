import { FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-[#23272a] text-white py-6 px-4 flex flex-col md:flex-row items-center justify-between relative">
      <div className="mb-4 md:mb-0 flex items-center gap-2">
        <img src="/logoFull.jpeg" alt="Unique Fitness Logo" className="h-8 w-8 rounded" />
        <span className="font-bold text-lg tracking-widest">UNIQUE FITNESS</span>
      </div>
      <div className="flex flex-col md:flex-row gap-6 mb-4 md:mb-0 items-center">
        <Link to="/dashboard" className="hover:text-[#EAB308] transition">Home</Link>
        <Link to="/about" className="hover:text-[#EAB308] transition">About</Link>
        <Link to="/contact" className="hover:text-[#EAB308] transition">Contact</Link>
        <Link to="/privacy" className="hover:text-[#EAB308] transition">Privacy</Link>
        <span className="text-xs md:text-sm text-gray-300 mt-2 md:mt-0 md:ml-6 text-center md:text-left">
          Unique Health and Gitness Gym, 2nd Floor, Moule Hall, Anand Chaya, Satpur, Nashik, 422012
        </span>
      </div>
      <div className="flex gap-4">
        <a href="#" aria-label="Instagram" className="hover:text-[#EAB308] transition transform hover:scale-110 active:scale-95 duration-200"><FaInstagram size={22} /></a>
        <a href="#" aria-label="Facebook" className="hover:text-[#EAB308] transition transform hover:scale-110 active:scale-95 duration-200"><FaFacebookF size={22} /></a>
        <a href="#" aria-label="Twitter" className="hover:text-[#EAB308] transition transform hover:scale-110 active:scale-95 duration-200"><FaTwitter size={22} /></a>
        <a href="#" aria-label="WhatsApp" className="hover:text-[#EAB308] transition transform hover:scale-110 active:scale-95 duration-200"><FaWhatsapp size={22} /></a>
      </div>
    </footer>
  );
}
