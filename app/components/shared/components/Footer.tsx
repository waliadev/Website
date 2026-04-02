"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { FOOTER } from "@/constants/footer";

export default function Footer() {
  return (
    <footer className="bd-footer">
      <div className="bd-footer-top">

        {/* ================= BRAND ================= */}
        <div className="bd-footer-brand">
          <div className="bd-footer-logo">
            <span className="bd-footer-broker">
              {FOOTER.BRAND.NAME1}
            </span>
            <span className="bd-footer-dash">
              {FOOTER.BRAND.NAME2}
            </span>
          </div>

          <p className="bd-footer-tagline">
            {FOOTER.BRAND.TAGLINE}
          </p>

          {/* 🔥 STORE BUTTONS FIXED */}
          <div className="bd-footer-storeButtons">
            <a
              href={FOOTER.STORE_LINKS.APP_STORE}
              target="_blank"
              rel="noopener noreferrer"
            >
               <img src={FOOTER.STORE_LINKS.APP_STORE} alt="App Store" />
            </a>

            <a
              href={FOOTER.STORE_LINKS.PLAY_STORE}
              target="_blank"
              rel="noopener noreferrer"
            >
                <img src={FOOTER.STORE_LINKS.PLAY_STORE} alt="Play Store" />
            </a>
          </div>
        </div>

        {/* ================= COMPANY ================= */}
        <div>
          <h4>Company</h4>
          <ul>
            <li>
              <Link href={ROUTES.ABOUT}>About Us</Link>
            </li>
            <li>
              <Link href={ROUTES.CONTACT}>Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* ================= LEGAL ================= */}
        <div>
          <h4>Legal</h4>
          <ul>
            <li>
              <Link href={ROUTES.PRIVACY}>Privacy Policy</Link>
            </li>
            <li>
              <Link href={ROUTES.TERMS}>Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        {/* ================= CONTACT ================= */}
        <div>
          <h4>Contact</h4>
          <p>📧 {FOOTER.CONTACT.EMAIL}</p>
          <p>📞 {FOOTER.CONTACT.PHONE}</p>
        </div>

      </div>

      {/* ================= BOTTOM ================= */}
      <div className="bd-footer-bottom">
        © {new Date().getFullYear()} {FOOTER.COPYRIGHT}
      </div>
    </footer>
  );
}