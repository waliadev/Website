import { VERIFY_LEFT_SECTION } from "@/constants/auth";

interface Props {
  phone: string;
}

export default function VerifyLeft({ phone }: Props) {
  return (
    <div className="verify-left">
      <div className="verify-overlay">
        <div className="verify-left-content">
          <h1>{VERIFY_LEFT_SECTION.title}</h1>
          <p>
            {VERIFY_LEFT_SECTION.description} +91{phone}
          </p>
        </div>
      </div>
    </div>
  );
}