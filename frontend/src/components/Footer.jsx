import React, { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      alert("You have subscribed successfully!");
      setEmail("");
    }
  };

  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet nulla auctor, vestibulum magna sed, convallis ex.
          </p>
        </div>
        <div className="footer-section">
          <h3>Help & Support</h3>
          <ul>
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Returns & Refunds</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Stay Connected</h3>
          <ul>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>
            Sign up for our newsletter to stay up-to-date on the latest news,
            promotions, and products.
          </p>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button onClick={handleSubscribe}>Subscribe</button>
          {subscribed && <p>Thank you for subscribing!</p>}
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Ecommerce Website. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;