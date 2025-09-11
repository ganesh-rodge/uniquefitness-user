import React from "react";
import { FaBullhorn } from "react-icons/fa";

const announcements = [
	{
		title: "New Yoga Classes Starting!",
		date: "05 Sep 2025 · Friday",
		message:
			"We're excited to announce that morning yoga sessions will begin from next week. Register at the front desk!",
		highlight: true,
	},
	{
		title: "New Equipment Arrived!",
		date: "01 Sep 2025 · Thursday",
		message:
			"We have added new weightlifting equipment to enhance your workout experience. Come check it out!",
		highlight: true,
	},
	{
		title: "Special Fitness Class This Weekend!",
		date: "30 Aug 2025 · Saturday",
		message: "Join us for a special fitness class this weekend!",
		highlight: true,
	},
];

export default function Announcements() {
	return (
		<div className="min-h-screen bg-[#181A1B] flex flex-col items-center justify-center px-2 py-8">
			<div className="rounded-xl p-6 w-full max-w-lg mx-auto">
				<h1 className="text-white text-3xl font-bold mb-2 flex items-center gap-2">
					<FaBullhorn className="text-[#EAB308]" /> Announcements
				</h1>
				<p className="text-gray-300 mb-6">
					Stay updated with the latest news and updates from the gym
				</p>
				<div className="flex flex-col gap-4">
					{announcements.map((a, idx) => (
						<div
							key={idx}
							className="bg-[#10151F] rounded-lg p-4 flex flex-col gap-2 shadow-md"
						>
							<div className="flex items-center gap-2 mb-1">
								{a.highlight && (
									<FaBullhorn className="text-[#EAB308] text-lg" />
								)}
								<span className="text-white font-bold">{a.title}</span>
								<span className="text-gray-400 ml-auto text-xs">
									{a.date}
								</span>
							</div>
							<p className="text-gray-300 text-sm">{a.message}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
