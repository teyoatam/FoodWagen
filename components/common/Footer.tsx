import { Input } from "../ui/input";

export default function Footer() {
  return (
  <footer className="food-bg-[#222] food-text-white food-mt-16 food-text-xs">
      <div className="food-container food-mx-auto food-grid md:food-grid-cols-4 food-gap-8 food-py-12">
        <div>
          <h4 className="food-font-semibold food-mb-3 food-text-white">Company</h4>
          <ul className="food-space-y-2 food-text-white/70">
            <li>About us</li>
            <li>Team</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h4 className="food-font-semibold food-mb-3 food-text-white">Contact</h4>
          <ul className="food-space-y-2 food-text-white/70">
            <li>Help & Support</li>
            <li>Partner with us</li>
            <li>Ride with us</li>
          </ul>
        </div>
        <div>
          <h4 className="food-font-semibold food-mb-3 food-text-white">Legal</h4>
          <ul className="food-space-y-2 food-text-white/70">
            <li>Terms & Conditions</li>
            <li>Refund & Cancellation</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
        <div>
          <h4 className="food-font-semibold food-mb-3 food-text-white">FOLLOW US</h4>
          <div className="food-flex food-items-center food-gap-3 food-mb-3">
            {/* social icons */}
            <button aria-label="Instagram" className="food-bg-white/6 food-p-2 food-rounded-full">
              <svg className="food-w-4 food-h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z"/></svg>
            </button>
            <button aria-label="Facebook" className="food-bg-white/6 food-p-2 food-rounded-full">
              <svg className="food-w-4 food-h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" d="M18 2h-3a4 4 0 00-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 011-1h3z"/></svg>
            </button>
            <button aria-label="Twitter" className="food-bg-white/6 food-p-2 food-rounded-full">
              <svg className="food-w-4 food-h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </button>
          </div>

          <p className="food-text-white/70 food-font-medium food-mb-3">Receive exclusive offers in your mailbox</p>

          <form className="food-mt-3 food-flex food-items-center" onSubmit={(e) => e.preventDefault()}>
            <div className="food-flex-1">
              <label className="food-relative food-block">
                {/* <span className="food-absolute food-left-3 food-top-1/2 -food-translate-y-1/2 food-text-white/60">
                  <svg className="food-w-4 food-h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </span> */}
                <Input
                  className="food-w-full food-pl-3  food-py-3 food-rounded-l-md  food-text-black   focus:food-outline-none"
                  placeholder="Enter Your email"
                  aria-label="Subscribe email"
                />
              </label>
            </div>
            <button
              type="submit"
              className="food-ml-4 food-rounded-md food-px-6 food-py-3 food-text-white food-font-semibold"
              style={{ background: "linear-gradient(180deg,#FFBA26,#FF9B00)", boxShadow: "0 12px 30px rgba(255,186,38,0.35)" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="food-border-t food-border-white/10">
        <div className="food-container food-mx-auto food-flex food-items-center food-justify-between food-py-4 food-text-xs food-text-white/60">
          <span>All rights Reserved © <strong>Your Company, 2025</strong></span>
          <span>Made with <span aria-hidden>♥</span> by <strong>Themewagon</strong></span>
        </div>
      </div>
    </footer>
  );
}
