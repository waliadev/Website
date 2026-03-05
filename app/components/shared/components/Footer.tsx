"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footerTop">
          {/* BRAND */}
          <div className="footerBrand">
            <div className="logo footerLogo">
              <span className="logoBroker footerBroker">Broker</span>
              <span className="logoDash">dash</span>
            </div>

            <p className="tagline">
              Find trusted property dealers and dream homes across India.
            </p>

            <div className="storeButtons">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                />
              </a>

              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                />
              </a>
            </div>
          </div>

          {/* COMPANY LINKS */}
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* LEGAL LINKS */}
          <div>
            <h4>Legal</h4>
            <ul>
              <li>
                <Link href="/privacy-and-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4>Contact</h4>
            <p>📧 support@brokerdash.com</p>
            <p>📞 +91 8178197411</p>
          </div>
        </div>

        <div className="footerBottom">
          © {new Date().getFullYear()} Hyperstream Pvt. Ltd. |
          All Rights Reserved
        </div>
      </footer>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #020617, #0f172a);
          color: white;
          padding: 70px 20px 20px;
        }

        .footerTop {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 40px;
          max-width: 1200px;
          margin: auto;
        }

        .tagline {
          margin-top: 12px;
          color: #cbd5e1;
          line-height: 1.6;
        }

        .storeButtons {
          display: flex;
          gap: 10px;
          margin-top: 16px;
          align-items: center;
        }

        .storeButtons img {
          height: 40px;
          width: auto;
          display: block;
          transition: transform 0.25s ease, filter 0.25s ease;
        }

        .storeButtons a:hover img {
          transform: translateY(-2px) scale(1.05);
          filter: brightness(1.1);
        }

        .logo {
          font-size: 30px;
          font-weight: 900;
          display: flex;
          align-items: center;
          letter-spacing: -0.5px;
          font-family: "Segoe UI", Arial, sans-serif;
        }

        .logoDash {
          color: #ff6a00;
          font-style: italic;
          margin-left: 2px;
        }

        .footerBroker {
          color: #ffffff;
        }

        h4 {
          margin-bottom: 14px;
          font-size: 16px;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        li {
          margin-bottom: 10px;
        }

        li a {
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        li a:hover {
          color: white;
        }

        .footerBottom {
          text-align: center;
          margin-top: 55px;
          padding-top: 22px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          opacity: 0.65;
          font-size: 13.5px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 480px) {
          .storeButtons img {
            height: 36px;
          }
        }
      `}</style>
    </>
  );
}