import React, { useState } from 'react';

const VerifyOTPPage = () => {
  const [otp, setOtp] = useState('');

  const handleVerifyOTP = async () => {
    try {
      // Send request to verify OTP
      // Assuming you have an endpoint like '/api/user/verify-otp'
      const response = await fetch('http://localhost:3002/api/user/verifyOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ otp }) // Assuming OTP is sent in the request body
      });
      const data = await response.json();
      console.log(data);

      // Handle response from server
      // Redirect user based on response
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Verify OTP</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); }}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="otp" className="sr-only">OTP</label>
              <input id="otp" name="otp" type="text" autoComplete="otp" required value={otp} onChange={(e) => setOtp(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter OTP" />
            </div>
          </div>
          <div>
            <button type="button" onClick={handleVerifyOTP} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTPPage;
