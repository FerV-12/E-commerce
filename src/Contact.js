import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Contact() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { setIsLoaded(true); }, []);

  const styles = {
    container: {
      display: "flex",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "linear-gradient(135deg, #fbeee6 0%, #f6d6c3 100%)",
      minHeight: "100vh",
      overflow: "hidden",
      position: "relative",
    },
    sidebar: {
      width: "220px",
      background: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(10px)",
      padding: "24px",
      boxShadow: "4px 0 12px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderTopRightRadius: "18px",
      borderBottomRightRadius: "18px",
      transform: isLoaded ? "translateX(0)" : "translateX(-100%)",
      transition: "transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      zIndex: 2,
      position: "relative",
    },
    logoBox: {
      textAlign: "center",
      marginBottom: "48px",
      transform: isLoaded ? "scale(1)" : "scale(0)",
      transition: "transform 0.6s ease-out 0.3s",
    },
    logoImg: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      objectFit: "cover",
      marginBottom: "12px",
    },
    logo: {
      fontSize: "28px",
      fontWeight: "900",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "2px",
      marginBottom: "8px",
      animation: "pulse 2s ease-in-out infinite",
    },
    tagline: {
      fontSize: "14px",
      color: "#6366f1",
      fontStyle: "italic",
      opacity: 0.8,
    },
    menu: { listStyle: "none", padding: 0, margin: 0 },
    menuItem: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "16px 20px",
      color: "#1f2937",
      fontWeight: "600",
      textDecoration: "none",
      cursor: "pointer",
      borderRadius: "16px",
      transition: "all 0.3s ease",
      marginBottom: "8px",
      position: "relative",
      overflow: "hidden",
      transform: isLoaded ? "translateX(0)" : "translateX(-50px)",
      opacity: isLoaded ? 1 : 0,
    },
    helpBox: {
      marginTop: "32px",
      padding: "24px",
      background:
        "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.1) 100%)",
      borderRadius: "20px",
      textAlign: "center",
      fontSize: "16px",
      color: "#6366f1",
      boxShadow: "0 8px 32px rgba(99,102,241,0.1)",
      border: "1px solid rgba(99,102,241,0.2)",
    },
    main: {
      flex: 1,
      padding: "48px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    contactCard: {
      background: "rgba(255,255,255,0.95)",
      borderRadius: "24px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
      padding: "36px",
      maxWidth: "500px",
      textAlign: "center",
      marginTop: "32px",
      border: "1px solid rgba(255,255,255,0.3)",
    },
    contactTitle: {
      fontSize: "28px",
      fontWeight: "800",
      marginBottom: "24px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    contactText: {
      fontSize: "18px",
      color: "#444",
      lineHeight: "1.7",
      marginBottom: "16px",
    },
    contactInfo: {
      fontSize: "16px",
      color: "#6366f1",
      marginBottom: "8px",
    },
    contactForm: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      marginTop: "24px",
    },
    input: {
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "16px",
    },
    button: {
      padding: "12px 24px",
      borderRadius: "50px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "16px",
      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      color: "#fff",
      marginTop: "8px",
    },
  };

  const keyframes = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
  `;

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.logoBox}>
            <img src="/images/chan2.jpg" alt="Logo" style={styles.logoImg} />
            <div style={styles.logo}>Serene Home</div>
            <p style={styles.tagline}>Where modern meets premium ✨</p>
          </div>
          <ul style={styles.menu}>
            <li style={styles.menuItem}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                🏠 Home
              </Link>
            </li>
            <li style={styles.menuItem}>
              <Link to="/product" style={{ textDecoration: "none", color: "inherit" }}>
                🛍️ Product
              </Link>
            </li>
            <li style={styles.menuItem}>
              <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
                🛒 Cart
              </Link>
            </li>
            <li style={styles.menuItem}>
              <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
                📖 About Us
              </Link>
            </li>
            <li style={styles.menuItem}>
              <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
                📞 Contact
              </Link>
            </li>
          </ul>
        </div>
        <div style={styles.helpBox}>
          <p style={{ marginBottom: "16px", fontWeight: "600" }}>Need Help? 🤝</p>
          <p style={{ marginBottom: "16px", fontWeight: "600" }}>
            About Account Management or ordering & Payment refund and FAQ
          </p>
          <button>Customer Service</button>
        </div>
      </aside>
      <main style={styles.main}>
        <div style={styles.contactCard}>
          <h2 style={styles.contactTitle}>Contact Us</h2>
          <p style={styles.contactText}>
            For inquiries, suggestions, or concerns, please reach out to us using the information below or the contact form.
          </p>
          <div style={styles.contactInfo}>
            <div>Email: <a href="mailto:serenehome@email.com">serenehome@email.com</a></div>
            <div>Phone: <a href="tel:09123456789">0912-345-6789</a></div>
            <div>Address: 123 Serene St., Makati City, Philippines</div>
          </div>
          <form style={styles.contactForm}>
            <input style={styles.input} type="text" placeholder="Your Name" />
            <input style={styles.input} type="email" placeholder="Your Email" />
            <textarea style={styles.input} rows={4} placeholder="Your Message"></textarea>
            <button style={styles.button} type="submit">Send Message</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Contact;