import Link from "next/link";
import GoogleLoginButton from "@/app/components/auth/GoogleLoginButton";

export default function SocialLoginSection() {
  return (
    <>
      <div className="divider">
        <span style={{textAlign:"center"}}>OR</span>
      </div>

      <GoogleLoginButton />

      <p className="termsText">
        By continuing you agree to our{" "}
        <Link href="/terms-and-conditions" className="linkText">
          Terms
        </Link>{" "}
        &{" "}
        <Link href="/privacy-and-policy" className="linkText">
          Privacy Policy
        </Link>
      </p>
    </>
  );
}