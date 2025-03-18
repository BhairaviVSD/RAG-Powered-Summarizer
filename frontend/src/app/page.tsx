"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

// Dynamically import Framer Motion (fixes hydration issues)
const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), { ssr: false });

export default function Home() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Use the correct API URL based on your environment (local or production)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5001/summarize"; // Update this after deployment

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Please enter text to summarize.");
      return;
    }
    setError("");
    setLoading(true);
    setSummary("");

    try {
      // Requesting the API to generate a summary
      const response = await axios.post(API_URL, { text });
      setSummary(response.data.summary);
    } catch (err) {
      setError("Error fetching summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 bg-gradient-to-r from-blue-100 via-purple-200 to-blue-100">
      <MotionDiv
        className="text-4xl font-bold text-blue-700 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        ✨ RAG-Powered Summarizer ✨
      </MotionDiv>

      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-6 flex flex-col items-center">
        <textarea
          className="w-full p-3 border-2 border-blue-300 rounded-md shadow-sm text-lg focus:ring-2 focus:ring-blue-500 outline-none"
          rows={5}
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md mt-4 hover:bg-blue-700 transition-all shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {summary && (
          <div className="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50 text-gray-700 rounded-md shadow-md max-w-3xl">
            <h2 className="text-lg font-semibold text-blue-600">Summary:</h2>
            <p className="mt-2 break-words">{summary}</p> {/* Ensures summary doesn't get cut off */}
          </div>
        )}
      </div>
    </div>
  );
}
