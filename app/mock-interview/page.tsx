import React from "react";
import { Mic, User } from "lucide-react";

const MockInterview = () => {
  return (
    <div className="flex items-center justify-center h-screen p-5 gap-10">
      <div
        className="w-1/3 h-1/2 rounded-3xl bg-gradient-to-r from-blue-200 to-blue-400 shadow-lg flex justify-center items-center 
  transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
      >
        <Mic className="text-gray-800 w-12 h-12 transition-transform duration-300 ease-in-out hover:scale-110 hover:text-gray-900" />
      </div>

      <div
        className="w-1/3 h-1/2 rounded-3xl bg-gradient-to-r from-blue-200 to-blue-400 shadow-lg flex justify-center items-center 
  transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
      >
        <User className="text-gray-800 w-12 h-12 transition-transform duration-300 ease-in-out hover:scale-110 hover:text-gray-900" />
      </div>
    </div>
  );
};

export default MockInterview;
