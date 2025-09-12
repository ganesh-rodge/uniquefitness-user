import { FaDumbbell } from "react-icons/fa";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <style>
        {`
          @keyframes dumbbell-rotate {
            0%   { transform: rotate(0deg);}
            25%  { transform: rotate(45deg);}
            75%  { transform: rotate(-45deg);}
            100% { transform: rotate(0deg);}
          }
        `}
      </style>
      <FaDumbbell
        className="text-yellow-500"
        style={{
          fontSize: "4rem",
          animation: "dumbbell-rotate 2s infinite",
        }}
      />
    </div>
  );
}
