import React, { useEffect, useState } from "react";
import { FaBullhorn } from "react-icons/fa";
import { getAnnouncements } from "../../api/api";
import Loader from "../../components/Loader";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await getAnnouncements();
        setAnnouncements(response.message || []);
      } catch (err) {
        console.error("Announcements fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#1C2128] pt-6 pb-8">
      <div className="max-w-3xl mx-auto px-4 flex flex-col gap-4">
        {/* Header */}
        <h1 className="text-white text-3xl font-bold flex items-center gap-3">
          <FaBullhorn className="text-[#FACC15]" /> Announcements
        </h1>
        <p className="text-gray-400 text-sm">
          Stay updated with the latest news and updates from the gym.
        </p>

        {/* Announcements List */}
        <div className="flex flex-col gap-4 mt-2">
          {announcements.length === 0 ? (
            <p className="text-gray-500 text-center py-10 italic">
              No announcements available
            </p>
          ) : (
            announcements.map((a) => (
              <div
                key={a._id}
                className="bg-[#262B33] rounded-2xl p-4 shadow-lg border border-gray-700/20 hover:shadow-2xl transition duration-200"
              >
                <div className="flex items-start gap-3">
                  <FaBullhorn className="text-[#FACC15] mt-1" />
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold text-lg">{a.title}</span>
                      <span className="text-gray-400 text-xs">{formatDate(a.publishDate)}</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{a.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
