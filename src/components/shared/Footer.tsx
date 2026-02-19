import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoLocationSharp, IoMailSharp, IoCallSharp } from "react-icons/io5";

const linkColumns = [
  {
    title: "Pages",
    links: [
      "Home",
      "Shop",
      "About",
      "Contact",
      "Blog",
      "Privacy policy",
      "FAQs",
    ],
  },
  {
    title: "Utility",
    links: [
      "Style guide",
      "Instruction",
      "Changelog",
      "Licenses",
    ],
  },
];

const socialLinks = [
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaTwitter, label: "Twitter" },
  { icon: FaYoutube, label: "YouTube" },
];

const contactInfo = [
  { icon: IoMailSharp, text: "medistore@gmail.com" },
  { icon: IoCallSharp, text: "(222) 555-1111" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-primary">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Link columns */}
          <div className="flex gap-12 md:gap-16 lg:col-span-1">
            {linkColumns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 text-base font-semibold">{column.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="/"
                        className="text-sm text-primary/80 underline decoration-primary/30 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary/60"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Center - Logo & tagline */}
          <div className="flex flex-col items-center justify-center lg:col-span-2">
            <div className="flex items-center gap-2">
              {/* Medical cross icon */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="15"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M16 8v16M8 16h16"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-serif text-3xl tracking-wide">MediStore</span>
            </div>
            <p className="mt-4 max-w-65 text-center text-sm leading-relaxed text-primary/70">
              We provides the ultimate solution for your online store and all
              the healthcare needs.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label }) => (
                <Link
                  key={label}
                  href="/"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-opacity hover:opacity-80"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right - Address & Contact */}
          <div className="lg:col-span-1">
            {/* Address */}
            <div className="mb-8">
              <h3 className="mb-4 text-base font-semibold">Address</h3>
              <div className="flex items-start gap-2 text-sm text-primary/80">
                <IoLocationSharp className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span className="leading-relaxed">
                  1666 Parker Rd. Allentown,
                  <br />
                  New France 31133
                </span>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 text-base font-semibold">Contact</h3>
              <div className="flex flex-col gap-2.5">
                {contactInfo.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 text-sm text-primary/80"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
