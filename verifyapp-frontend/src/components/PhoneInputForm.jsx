import { useState } from "react";
import { sendOTP } from "../services/api";

export default function PhoneInputForm({ onSent }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await sendOTP(phone);
      if (res.message) {
        setMessage("OTP sent successfully!");
        onSent(phone);
      } else {
        setMessage(res.error || "Failed to send OTP");
      }
    } catch (err) {
      setMessage("Something went wrong.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Phone Verification</h2>
      <input
        type="tel"
        placeholder="+1234567890"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send OTP"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
