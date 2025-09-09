import { FaUserCircle, FaHome, FaBullhorn, FaDumbbell, FaAppleAlt } from "react-icons/fa";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	return (
	<nav className="w-full flex justify-center items-center py-4 bg-transparent fixed top-0 left-0 z-40">
			<div
				className="flex items-center justify-between w-[95%] px-5 py-1.5 rounded-3xl"
				style={{
					background: "linear-gradient(90deg, #5a5a3a 0%, #3a4a3a 100%)",
				}}
			>
				<img src="/logo.png" alt="Logo" className="h-11  rounded-xl mr-4 ml-2" />
				{/* Desktop Menu */}
				<div className="flex-1 hidden md:flex justify-center gap-8">
					<a href="#home" className="nav-link">Home</a>
					<a href="#announcements" className="nav-link">Announcements</a>
					<a href="#workout" className="nav-link">Workout</a>
					<a href="#diet" className="nav-link">Diet</a>
				</div>
				<FaUserCircle className="text-white text-2xl ml-4 hidden md:block" />
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
							<a href="#home" className="nav-link-mobile flex items-center gap-3 text-white text-lg font-medium text-left w-full px-4 py-2 rounded-lg transition" onClick={() => setMenuOpen(false)}>
								<FaHome className="text-xl" /> Home
							</a>
							<a href="#announcements" className="nav-link-mobile flex items-center gap-3 text-white text-lg font-medium text-left w-full px-4 py-2 rounded-lg transition" onClick={() => setMenuOpen(false)}>
								<FaBullhorn className="text-xl" /> Announcements
							</a>
							<a href="#workout" className="nav-link-mobile flex items-center gap-3 text-white text-lg font-medium text-left w-full px-4 py-2 rounded-lg transition" onClick={() => setMenuOpen(false)}>
								<FaDumbbell className="text-xl" /> Workout
							</a>
							<a href="#diet" className="nav-link-mobile flex items-center gap-3 text-white text-lg font-medium text-left w-full px-4 py-2 rounded-lg transition" onClick={() => setMenuOpen(false)}>
								<FaAppleAlt className="text-xl" /> Diet
							</a>
							<a href="#profile" className="nav-link-mobile flex items-center gap-3 text-white text-lg font-medium text-left w-full px-4 py-2 rounded-lg transition" onClick={() => setMenuOpen(false)}>
								<FaUserCircle className="text-xl" /> Profile
							</a>
						</div>
					</div>
				</>
			)}
		</nav>
	);
}
