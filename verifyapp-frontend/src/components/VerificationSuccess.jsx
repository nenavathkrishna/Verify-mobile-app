import React from "react";

const VerificationSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-gray-700 text-lg">
          Your phone number has been successfully verified.
        </p>
      </div>
    </div>
  );
};

export default VerificationSuccess;
