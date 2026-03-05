interface Props {
  phone: string;
}

export default function VerifyLeft({ phone }: Props) {
  return (
    <div className="verify-left">
      <div className="verify-overlay">
        <div className="verify-left-content">
          <h1>Secure OTP Verification</h1>
          <p>We sent a verification code to +91{phone}</p>
        </div>
      </div>
    </div>
  );
}