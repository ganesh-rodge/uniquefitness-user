import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#10151F] px-4 py-8">
      <div className=" rounded-xl shadow-lg p-8 w-full max-w-2xl flex flex-col gap-4 items-center">
        <img
          src="/logoFull.jpeg"
          alt="Unique Health & Fitness Logo"
          className="w-32 h-32 object-contain mb-4 mx-auto"
        />
        <h1 className="text-white text-3xl font-bold mb-2 text-center">
          About Unique Health & Fitness Gym in Nashik
        </h1>
        <p className="text-gray-300 text-center text-lg mb-2 justify-start">
          Unique Health and Fitness Gym, the best gym in Nashik, was founded by
          Amit Kanse in 2018 with the vision to provide a modern, motivating, and
          supportive environment for fitness enthusiasts in Nashik. We offer
          top-notch gym facilities, personal training, weight loss programs,
          bodybuilding, cardio, and group fitness classes for all age groups. If you are searching for "gyms in Nashik", "best gym near me", "fitness center Nashik", "personal trainer Nashik", "weight loss Nashik", "bodybuilding Nashik", "cardio classes Nashik", or "affordable gym Nashik", Unique Health & Fitness Gym is your destination for results and transformation.
        </p>
        <div className="text-gray-400 text-center mb-2">
          <span className="font-semibold text-white">Address:</span>
          <br />
          Unique Health and Fitness Gym,
          <br />
          2nd Floor, Moule Hall, Anand Chaya,
          <br />
          Satpur, Nashik, 422012
        </div>
        <p className="text-gray-300 text-center text-base">
          Our Nashik gym offers a wide range of equipment, certified trainers,
          and personalized fitness plans to help you achieve your health goals.
          Whether you are a beginner or a seasoned athlete, we welcome you to
          join our unstoppable fitness community! Searching for gyms near me in
          Nashik? Visit Unique Health & Fitness Gym for the best results in
          weight loss, muscle gain, and overall wellness. We are known for our expert trainers, modern equipment, flexible membership plans, and friendly atmosphere. Join us for the best gym experience in Nashik!
        </p>
        <div className="mt-6 w-full">
          <hr />
          <ul className="text-gray-200 text-center space-y-2 py-2">
            <li>"Push yourself because no one else is going to do it for you."</li>
            <li>"Success starts with self-discipline."</li>
            <li>"The only bad workout is the one that didn’t happen."</li>
          </ul>
        </div>
      </div>
    </div>
  );
}