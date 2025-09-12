import { FaUserCircle, FaHome, FaBullhorn, FaDumbbell, FaAppleAlt } from "react-icons/fa";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();
	return (
	<nav className="w-full flex justify-center items-center  bg-[#181A1B] pt-4 sticky top-0 left-0 z-50">
			<div
				className="flex items-center justify-between w-[95%] px-5 py-1.5 rounded-3xl"
				style={{
					background: "linear-gradient(90deg, #5a5a3a 0%, #3a4a3a 100%)",
				}}
			>
				<img src="/logo.png" alt="Logo" className="h-11  rounded-xl mr-4 ml-2" />
				{/* Desktop Menu */}
				<div className="flex-1 hidden md:flex justify-center gap-8">
					<NavLink to="/dashboard" className="nav-link text-white transition-all duration-200 hover:text-[#EAB308] hover:scale-110">Home</NavLink>
					<NavLink to="/announcements" className="nav-link text-white transition-all duration-200 hover:text-[#EAB308] hover:scale-110">Announcements</NavLink>
					<NavLink to="/workout" className="nav-link text-white transition-all duration-200 hover:text-[#EAB308] hover:scale-110">Workout</NavLink>
					<NavLink to="/diet" className="nav-link text-white transition-all duration-200 hover:text-[#EAB308] hover:scale-110">Diet</NavLink>
				</div>
				<FaUserCircle className="text-white text-2xl ml-4 hidden md:block cursor-pointer" onClick={()=>navigate("/profile")}/>
				{/* Hamburger Icon for Mobile */}
				<button
					className="md:hidden text-2xl ml-4 focus:outline-none"
					onClick={() => setMenuOpen(!menuOpen)}
				>
					<FiMenu style={{ color: '#EAB308' }} />
				</button>
			</div>
			{/* Mobile Menu Dropdown */}
			{menuOpen && (
				<>
					{/* Transparent backdrop to close menu when clicking outside */}
					<div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)}></div>
					<div
						className="md:hidden absolute top-20 left-0 right-0 mx-auto w-[96%] max-w-md flex items-end flex-col gap-4 bg-gradient-to-r from-[#5a5a3a] to-[#3a4a3a] p-5 rounded-xl z-50"
					>
						<div className="flex flex-col items-start w-full">
							<Link to="/home" className="nav-link-mobile flex items-center gap-3 text-white text-lg font-medium text-left w-full px-4 py-2 rounded-lg transition-all duration-200 hover:text-[#EAB308] hover:bg-[#232A36] hover:scale-105" onClick={() => setMenuOpen(false)}>
								<FaHome className="text-xl" /> Home
							</Link>
							<Link to="/announcements" className="nav-link-mobile flex items-center gap-3 text-white text-lg font-medium text-left w-full px-4 py-2 rounded-lg transition-all duration-200 hover:text-[#EAB308] hover:bg-[#232A36] hover:scale-105" onClick={() => setMenuOpen(false)}>
								<FaBullhorn className="text-xl" /> Announcements
							</Link>
							<Link to="/workout" className="nav-link-mobile flex items-center gap-3 text-white text-lg font-medium text-left w-full px-4 py-2 rounded-lg transition-all duration-200 hover:text-[#EAB308] hover:bg-[#232A36] hover:scale-105" onClick={() => setMenuOpen(false)}>
								<FaDumbbell className="text-xl" /> Workout
							</Link>
							<Link to="/diet" className="nav-link-mobile flex items-center gap-3 text-white text-lg font-medium text-left w-full px-4 py-2 rounded-lg transition-all duration-200 hover:text-[#EAB308] hover:bg-[#232A36] hover:scale-105" onClick={() => setMenuOpen(false)}>
								<FaAppleAlt className="text-xl" /> Diet
							</Link>
							<Link to="/profile" className="nav-link-mobile flex items-center gap-3 text-white text-lg font-medium text-left w-full px-4 py-2 rounded-lg transition-all duration-200 hover:text-[#EAB308] hover:bg-[#232A36] hover:scale-105" onClick={() => setMenuOpen(false)}>
								<FaUserCircle className="text-xl" onClick={()=>navigate("/profile")}/> Profile
							</Link>
						</div>
					</div>
				</>
			)}
		</nav>
	);
}
