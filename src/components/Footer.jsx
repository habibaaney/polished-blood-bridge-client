import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaLocationArrow,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white">
      <div className="mx-auto px-4 py-10 grid gap-8 grid-cols-1 md:grid-cols-3">
        {/* About */}
        <div>
          <h2 className="text-xl font-bold mb-3">BloodLink</h2>
          <p>
            A community-driven blood donation platform connecting donors and
            recipients to save lives. Join us and be a real-life hero.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a className="link link-hover" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="link link-hover" href="/donation-request">
                Find Donors
              </a>
            </li>
            <li>
              <a className="link link-hover" href="/blog-posts">
                Blogs
              </a>
            </li>
            <li>
              <a className="link link-hover" href="/about">
                About Us
              </a>
            </li>
            <li>
              <a className="link link-hover" href="/contactUs">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h2 className="text-xl font-bold mb-3">Contact Us</h2>
          <p className="flex items-center gap-2">
            <FaLocationArrow /> Dhaka, Bangladesh
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope /> support@bloodlink.org
          </p>
          <p className="flex items-center gap-2">
            <FaPhoneAlt /> +880 1234-567890
          </p>

          <div className="flex gap-4 mt-4">
            <a
              href="https://facebook.com"
              className="text-white hover:text-gray-200 text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              className="text-white hover:text-gray-200 text-xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              className="text-white hover:text-gray-200 text-xl"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center bg-red-700 py-4 text-sm">
        © {new Date().getFullYear()} BloodBridge All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
