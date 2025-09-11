import React from "react";
import { FaCheckCircle, FaRupeeSign, FaCalendarAlt } from "react-icons/fa";

const plans = [
	{
		name: "Monthly Plan",
		price: 999,
		duration: "/month",
		features: [
			"Access to all gym equipment",
			"Free group workout sessions",
			"Basic trainer support",
		],
	},
	{
		name: "Quarterly Plan",
		price: 2499,
		duration: "/3 months",
		features: [
			"Access to all gym equipment",
			"Free group workout sessions",
			"Trainer support included",
			"1 Free diet consultation",
		],
	},
	{
		name: "Yearly Plan",
		price: 8999,
		duration: "/year",
		features: [
			"Unlimited gym equipment access",
			"Free group workout sessions",
			"Full trainer support",
			"Quarterly diet consultations",
			"Priority booking for special events",
		],
	},
];

export default function SelectPlan() {
	return (
		<div className="min-h-screen bg-[#181A1B] flex flex-col items-center justify-center px-2 py-8">
			<div className="w-full max-w-5xl mx-auto">
				<p className="text-white text-center mb-6">
					Pick a plan that fits your fitness journey.
				</p>
				<div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
					{plans.map((plan, idx) => (
						<div
							key={idx}
							className="bg-[#232A36] rounded-lg p-8 shadow flex flex-col gap-6 flex-1 min-w-[300px] max-w-[420px] h-full md:h-[420px] justify-between"
						>
							<div>
								<div className="flex items-center gap-2 mb-3">
									<FaCalendarAlt className="text-[#EAB308] text-2xl" />
									<span className="text-white font-bold text-2xl">
										{plan.name}
									</span>
								</div>
								<div className="text-[#EAB308] font-bold text-2xl flex items-center gap-1 mb-4">
									<FaRupeeSign />
									{plan.price}
									<span className="text-lg font-medium">
										{plan.duration}
									</span>
								</div>
								<ul className="flex flex-col gap-2 mb-2">
									{plan.features.map((feature, i) => (
										<li
											key={i}
											className="flex items-center gap-2 text-white text-base"
										>
											<FaCheckCircle className="text-[#EAB308] text-lg" />{" "}
											{feature}
										</li>
									))}
								</ul>
							</div>
							<button className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full text-lg transition hover:bg-yellow-400 transform hover:scale-105 active:scale-95 duration-200">
								Buy
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
