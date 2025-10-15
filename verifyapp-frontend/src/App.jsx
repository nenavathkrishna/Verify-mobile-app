import { useState } from "react";
import PhoneInputForm from "./components/PhoneInputForm";
import VerifyCodeForm from "./components/VerifyCodeForm";
import VerificationSuccess from "./components/VerificationSuccess";
import "./app.css";

function App() {
  const [phone, setPhone] = useState("");
  const [verified, setVerified] = useState(false); // new state

  return (
    <div className="container">
      {!phone ? (
        <PhoneInputForm onSent={setPhone} />
      ) : !verified ? (
        <VerifyCodeForm phone={phone} onVerified={() => setVerified(true)} />
      ) : (
        <VerificationSuccess />
      )}
    </div>
  );
}

export default App;
