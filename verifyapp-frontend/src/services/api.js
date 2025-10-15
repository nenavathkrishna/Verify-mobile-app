const API_URL = import.meta.env.VITE_API_URL;

export const sendOTP = async (phoneNumber) => {
  const res = await fetch(`${API_URL}/api/auth/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNumber }),
  });
  return res.json();
};

export const verifyOTP = async (phoneNumber, otp) => {
  const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNumber, otp }),
  });
  return res.json();
};
