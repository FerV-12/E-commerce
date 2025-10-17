// ...existing code...
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "./CartContext";

function Landing() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [modalProduct, setModalProduct] = useState(null);

  const { addToCart, count } = useContext(CartContext);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // sync local badge animation state with context count
  useEffect(() => {
    setCartCount(count);
  }, [count]);

  // sample products used on this page (id must be unique across app)
  const featuredProducts = {
    tv: {
      id: 101,
      name: 'Samsung 75" Smart TV',
      price: 50000,
      image: "/images/tv1.avif",
      desc: "Large 75\" 4K HDR smart TV with ultra-slim bezels and built-in streaming apps.",
      recommend: "Mount above low console or place on a minimal stand. Use accent lighting behind TV to reduce eye strain and create cinematic feel."
    },
    table: {
      id: 102,
      name: "Minimalist Wooden Table",
      price: 1300,
      image: "/images/table.jfif",
      desc: "Solid oak finish table with clean lines — fits modern dining or work spaces.",
      recommend: "Pair with neutral chairs and a simple centerpiece; good for compact dining areas or as a versatile workspace."
    },
    sofa: {
      id: 103,
      name: "Comfy L Shape Sofa",
      price: 17000,
      image: "/images/sofa.webp",
      desc: "Spacious L-shaped sofa with removable covers and firm supportive cushions.",
      recommend: "Place in corner to maximize floor space; layer with throw pillows and a textured rug for coziness."
    },
    chandelier: {
      id: 104,
      name: "Premium Chandelier",
      price: 120000,
      image: "/images/chan2.jpg",
      desc: "Statement chandelier with hand-blown glass and warm LED illumination.",
      recommend: "Center above dining table or foyer to create an elegant focal point; dimmable for ambiance."
    },
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setModalProduct(null);
    };
    if (modalProduct) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalProduct]);

  // 🎨 STYLES
  const styles = {
    container: {
      display: "flex",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background:
        "linear-gradient(135deg, #f8fafc 0%, #fbeee6 50%, #f6d6c3 100%)",
      minHeight: "100vh",
      overflow: "hidden",
      position: "relative",
    },
    bgParticles: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 0,
    },
    particle: {
      position: "absolute",
      width: "4px",
      height: "4px",
      background: "rgba(255,255,255,0.3)",
      borderRadius: "50%",
      animation: "float 6s ease-in-out infinite",
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
      borderRadius: "50%", // 🟢 Bilog yung logo
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
    cartBadge: {
      position: "absolute",
      top: "-8px",
      right: "-8px",
      background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      color: "white",
      borderRadius: "50%",
      width: "24px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontWeight: "bold",
      animation: cartCount > 0 ? "bounce 0.6s ease-out" : "none",
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
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "48px",
      position: "relative",
      zIndex: 1,
    },
    section: {
      background: "rgba(255,255,255,0.7)",
      backdropFilter: "blur(20px)",
      padding: "36px",
      borderRadius: "24px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
      marginBottom: "32px",
      transform: isLoaded ? "translateY(0)" : "translateY(100px)",
      opacity: isLoaded ? 1 : 0,
      transition: "all 0.8s ease",
      border: "1px solid rgba(255,255,255,0.3)",
      overflow: "hidden",
      position: "relative",
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: "800",
      marginBottom: "24px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    productCard: {
      display: "flex",
      gap: "32px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    productImg: {
      width: "240px",
      height: "180px",
      objectFit: "cover",
      borderRadius: "20px",
      boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
      border: "3px solid rgba(255,255,255,0.5)",
      cursor: "pointer",
      transition: "all 0.4s ease",
    },
    productInfo: { flex: 1, minWidth: "200px" },
    productName: {
      fontSize: "20px",
      fontWeight: "700",
      marginBottom: "8px",
    },
    productDesc: {
      fontSize: "14px",
      color: "#6b7280",
      margin: "12px 0",
      lineHeight: "1.6",
    },
    productPrice: {
      color: "#059669",
      fontWeight: "800",
      fontSize: "20px",
      marginBottom: "16px",
      textAlign: "center",
    },
    buttons: {
      display: "flex",
      gap: "16px",
      justifyContent: "center",
    },
    btn: {
      padding: "12px 24px",
      borderRadius: "50px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "14px",
      transition: "all 0.3s ease",
    },
    cartBtn: {
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "#fff",
    },
    buyBtn: {
      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      color: "#fff",
    },
    rightCard: {
      background: "rgba(255,255,255,0.95)",
      borderRadius: "20px",
      padding: "24px",
      boxShadow: "0 16px 40px rgba(0,0,0,0.1)",
      marginBottom: "32px",
      textAlign: "center",
      transition: "all 0.8s ease",
      border: "1px solid rgba(255,255,255,0.3)",
    },
    rightImg: {
      width: "100%",
      height: "140px",
      objectFit: "cover",
      borderRadius: "16px",
      marginBottom: "16px",
    },

    // modal styles
    modalOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.46)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: 20,
    },
    modalCard: {
      width: "100%",
      maxWidth: 720,
      background: "#fff",
      borderRadius: 12,
      padding: 20,
      boxShadow: "0 20px 60px rgba(2,6,23,0.2)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
      alignItems: "start",
    },
    modalImg: { width: "100%", height: 280, objectFit: "cover", borderRadius: 8 },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    closeBtn: { background: "transparent", border: "none", fontSize: 20, cursor: "pointer" },
    modalFooter: { gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", gap: 8 },
    detailText: { color: "#374151", lineHeight: 1.5 },
  };

  // 🎞 KEYFRAMES
  const keyframes = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
  `;

  // ✨ Floating particles
  const particles = Array.from({ length: 15 }, (_, i) => (
    <div
      key={i}
      style={{
        ...styles.particle,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 6}s`,
      }}
    />
  ));

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      <div style={styles.bgParticles}>{particles}</div>

      {/* SIDEBAR */}
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
              {cartCount > 0 && <div style={styles.cartBadge}>{cartCount}</div>}
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
          <button style={{ ...styles.btn, ...styles.buyBtn }}>
            Customer Service
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <div>
          {/* Latest Release */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>🚀 Latest Release</h3>
            <div style={styles.productCard}>
              <img
                src={featuredProducts.tv.image}
                alt="Smart TV"
                style={styles.productImg}
                onClick={() => setModalProduct(featuredProducts.tv)}
              />
              <div style={styles.productInfo}>
                <p style={styles.productName}>{featuredProducts.tv.name}</p>
                <p style={styles.productDesc}>
                  {featuredProducts.tv.desc}
                </p>
                <p style={styles.productPrice}>₱{featuredProducts.tv.price}</p>
                <div style={styles.buttons}>
                  <button
                    style={{ ...styles.btn, ...styles.cartBtn }}
                    onClick={() => handleAddToCart(featuredProducts.tv)}
                  >
                    Add to Cart 🛒
                  </button>
                  <button
                    style={{ ...styles.btn, ...styles.buyBtn }}
                    onClick={() => setModalProduct(featuredProducts.tv)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Must Have Item */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>⭐ Must Have Item</h3>
            <div style={styles.productCard}>
              <img
                src={featuredProducts.table.image}
                alt="Wooden Table"
                style={styles.productImg}
                onClick={() => setModalProduct(featuredProducts.table)}
              />
              <div style={styles.productInfo}>
                <p style={styles.productName}>{featuredProducts.table.name}</p>
                <p style={styles.productDesc}>
                  {featuredProducts.table.desc}
                </p>
                <p style={styles.productPrice}>₱{featuredProducts.table.price}</p>
                <div style={styles.buttons}>
                  <button
                    style={{ ...styles.btn, ...styles.cartBtn }}
                    onClick={() => handleAddToCart(featuredProducts.table)}
                  >
                    Add to Cart 🛒
                  </button>
                  <button
                    style={{ ...styles.btn, ...styles.buyBtn }}
                    onClick={() => setModalProduct(featuredProducts.table)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div style={styles.rightCard}>
            <img src={featuredProducts.sofa.image} alt="L-Shape Sofa" style={styles.rightImg} onClick={() => setModalProduct(featuredProducts.sofa)} />
            <p style={styles.productName}>{featuredProducts.sofa.name}</p>
            <p style={styles.productDesc}>
              {featuredProducts.sofa.desc}
            </p>
            <p style={styles.productPrice}>₱{featuredProducts.sofa.price}</p>
            <div style={styles.buttons}>
              <button
                style={{ ...styles.btn, ...styles.cartBtn }}
                onClick={() => handleAddToCart(featuredProducts.sofa)}
              >
                Add to Cart 🛒
              </button>
              <button style={{ ...styles.btn, ...styles.buyBtn }} onClick={() => setModalProduct(featuredProducts.sofa)}>
                Details
              </button>
            </div>
          </div>

          <div style={styles.rightCard}>
            <img
              src={featuredProducts.chandelier.image}
              alt="Chandelier"
              style={styles.rightImg}
              onClick={() => setModalProduct(featuredProducts.chandelier)}
            />
            <p style={styles.productName}>{featuredProducts.chandelier.name}</p>
            <p style={styles.productDesc}>
              {featuredProducts.chandelier.desc}
            </p>
            <p style={styles.productPrice}>₱{featuredProducts.chandelier.price}</p>
            <div style={styles.buttons}>
              <button
                style={{ ...styles.btn, ...styles.cartBtn }}
                onClick={() => handleAddToCart(featuredProducts.chandelier)}
              >
                Add to Cart 🛒
              </button>
              <button style={{ ...styles.btn, ...styles.buyBtn }} onClick={() => setModalProduct(featuredProducts.chandelier)}>
                Details
              </button>
            </div>
          </div>
        </div>
      </main>

      {modalProduct && (
        <div
          style={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalProduct(null);
          }}
        >
          <div role="dialog" aria-modal="true" aria-label={`${modalProduct.name} details`} style={styles.modalCard}>
            <div>
              <img src={modalProduct.image} alt={modalProduct.name} style={styles.modalImg} onError={(e) => (e.currentTarget.src = "/images/placeholder.png")} />
            </div>

            <div>
              <div style={styles.modalHeader}>
                <div>
                  <h2 style={{ margin: 0 }}>{modalProduct.name}</h2>
                  <div style={{ color: "#6b7280", marginTop: 6 }}>₱{modalProduct.price}</div>
                </div>
                <button aria-label="Close details" onClick={() => setModalProduct(null)} style={styles.closeBtn}>✕</button>
              </div>

              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Short description</div>
                <p style={styles.detailText}>{modalProduct.desc}</p>

                <div style={{ fontWeight: 700, marginTop: 12, marginBottom: 6 }}>How to use / Recommendation</div>
                <p style={styles.detailText}>{modalProduct.recommend}</p>
              </div>

              <div style={styles.modalFooter}>
                <button onClick={() => { handleAddToCart(modalProduct); setModalProduct(null); }} style={{ background: "#10b981", color: "#fff", padding: "10px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700 }}>Add to Cart</button>
                <button onClick={() => setModalProduct(null)} style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #e6e6e6", background: "#fff", cursor: "pointer" }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Landing;