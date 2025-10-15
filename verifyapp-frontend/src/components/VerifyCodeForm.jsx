import { useState } from "react";
import { verifyOTP } from "../services/api";

export default function VerifyCodeForm({ phone, onVerified }) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");
    const res = await verifyOTP(phone, otp);
    
    if (res.message) {
      // call callback to tell App that verification is successful
      onVerified();
    } else {
      setMessage(res.error || "Verification failed");
    }
  };

  return (
    <form onSubmit={handleVerify} className="form">
      <h2>Enter OTP sent to {phone}</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      <button type="submit">Verify</button>
      {message && <p>{message}</p>}
    </form>
  );
}
