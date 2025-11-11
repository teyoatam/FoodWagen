export default function Footer() {
  return (
    <footer className="food-bg-[#222] food-text-white food-mt-16">
      <div className="food-container food-mx-auto food-grid md:food-grid-cols-4 food-gap-8 food-py-12">
        <div>
          <h4 className="food-font-semibold food-mb-3">Company</h4>
          <ul className="food-space-y-2 food-text-white/70">
            <li>About</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h4 className="food-font-semibold food-mb-3">Contact</h4>
          <ul className="food-space-y-2 food-text-white/70">
            <li>Help & Support</li>
            <li>Partner with us</li>
            <li>Chat with us</li>
          </ul>
        </div>
        <div>
          <h4 className="food-font-semibold food-mb-3">Legal</h4>
          <ul className="food-space-y-2 food-text-white/70">
            <li>Terms & Conditions</li>
            <li>Refund & Cancellation</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h4 className="food-font-semibold food-mb-3">Follow us</h4>
          <p className="food-text-white/70">Receive exclusive offers in your mailbox</p>
          <form className="food-mt-3 food-flex food-gap-2">
            <input
              className="food-flex-1 food-rounded-md food-bg-white/10 food-border food-border-white/10 food-px-3 food-py-2 focus:food-outline-none"
              placeholder="Enter your email"
              aria-label="Subscribe email"
            />
            <button type="submit" className="food-bg-orange-500 food-text-white food-rounded-md food-px-4 food-py-2">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="food-border-t food-border-white/10">
        <div className="food-container food-mx-auto food-flex food-items-center food-justify-between food-py-4 food-text-xs food-text-white/60">
          <span>All Rights Reserved © Your Company, 2025</span>
          <span>Made with ♥ by Teamwagon</span>
        </div>
      </div>
    </footer>
  );
}
