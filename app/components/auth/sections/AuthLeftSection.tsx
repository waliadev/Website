import { AUTH_LEFT_SECTION } from "@/constants/auth";

export default function AuthLeftSection() {
  return (
    <div className="authLeftSection">
      <div className="authLeftContent">
        <h1>{AUTH_LEFT_SECTION.title}</h1>
        <p>{AUTH_LEFT_SECTION.description}</p>
      </div>
    </div>
  );
}