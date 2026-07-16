import { useEffect, useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HiveIcon from "@mui/icons-material/Hive";
import LiquorIcon from "@mui/icons-material/Liquor";
import { Ham, Milk } from "lucide-react";

const CATEGORY_CONFIG = [
  {
    id: "preparate-carne",
    title: "Preparate din carne",
    description: "Afumături și preparate tradiționale realizate după rețete locale.",
    icon: "meat",
  },
  {
    id: "lactate",
    title: "Lactate",
    description: "Brânzeturi și produse lactate inspirate din gospodăriile tradiționale.",
    icon: "milk",
  },
  {
    id: "miere",
    title: "Miere",
    description: "Produse apicole atent selecționate, cu gust și aromă naturală.",
    icon: "honey",
  },
  {
    id: "dulceturi",
    title: "Dulcețuri",
    description: "Bunătăți din fructe pregătite pentru cămara unei gospodării.",
    icon: "jam",
  },
  {
    id: "muraturi-zacusca",
    title: "Murături și zacuscă",
    description: "Rețete de sezon, pregătite cu legume și condimente atent alese.",
    icon: "pickles",
  },
  {
    id: "bauturi",
    title: "Băuturi tradiționale",
    description: "Specialități regionale prezentate în cadrul selecției magazinului.",
    icon: "drinks",
  },
];

const CATEGORY_NAMES = Object.fromEntries(CATEGORY_CONFIG.map((category) => [category.id, category.title]));

const PRODUCT_IMAGE_FALLBACKS = {
  1: "/assets/Preparate din carne/Caltabos.webp",
  2: "/assets/Preparate din carne/Slana-ardeleneasca.webp",
  3: "/assets/Preparate din carne/Carnati-mangalita.webp",
  4: "/assets/Preparate din carne/Costita-afumata.webp",
};

const DEFAULT_BADGES = ["/assets/Badge/Fabricat-in-Maramures-1_iconita.webp.webp", "/assets/Badge/100-natural-logo.png.webp", "/assets/Badge/Hand-made-logo.webp.webp"];

function JamJarIcon() {
  return (
    <svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 5h12" />
      <path d="M9 8h14" />
      <path d="M10 8v3l-2 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V14l-2-3V8" />
      <path d="M11 17h10v6H11z" />
      <circle cx="14" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  );
}

function PickleJarIcon() {
  return (
    <svg viewBox="0 0 32 32" width="27" height="27" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 5h14" />
      <path d="M8 8h16" />
      <path d="M9 8v3l-2 3v10a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V14l-2-3V8" />
      <path d="M12 15c2 2 2 6 0 9" />
      <path d="M16 14c2 3 2 7 0 11" />
      <path d="M20 15c2 2 2 6 0 9" />
    </svg>
  );
}

function CategoryIcon({ type }) {
  if (type === "meat") return <Ham size={26} strokeWidth={1.8} />;
  if (type === "milk") return <Milk size={26} strokeWidth={1.8} />;
  if (type === "honey") return <HiveIcon />;
  if (type === "jam") return <JamJarIcon />;
  if (type === "pickles") return <PickleJarIcon />;
  return <LiquorIcon />;
}

function SocialIcon({ type }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    width: "22",
    height: "22",
    fill: "currentColor",
    "aria-hidden": "true",
  };

  if (type === "facebook") {
    return (
      <svg {...commonProps}>
        <path d="M13.5 22v-8h2.8l.4-3.1h-3.2V8.8c0-.9.3-1.6 1.7-1.6H17V4.4c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.6v2h-3V14h3v8h3.5Z" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg {...commonProps}>
        <path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm-.2 2A3 3 0 0 0 4 7v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm10.5 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg {...commonProps}>
        <path d="M5.2 3.5A2.2 2.2 0 1 1 5.2 8a2.2 2.2 0 0 1 0-4.5ZM3.3 9.5h3.8V21H3.3V9.5Zm6.1 0H13v1.6h.1c.5-.9 1.7-2 3.6-2 3.9 0 4.6 2.5 4.6 5.9v6h-3.8v-5.3c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21H9.4V9.5Z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M9.6 18.3C5 19.7 5 16 3.2 15.5m12.8 5.6v-3.6c0-1 .1-1.5-.5-2.1 1.8-.2 3.7-.9 3.7-4a3.2 3.2 0 0 0-.9-2.2 3 3 0 0 0-.1-2.2s-.7-.2-2.3.9a8 8 0 0 0-4.2 0C10.1 6.8 9.4 7 9.4 7a3 3 0 0 0-.1 2.2 3.2 3.2 0 0 0-.9 2.2c0 3.1 1.9 3.8 3.7 4-.5.5-.6 1-.6 2.1v3.6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [sortOrder, setSortOrder] = useState("initial");
  const [activePanel, setActivePanel] = useState(null);
  const [ratings, setRatings] = useState({});
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountMode, setAccountMode] = useState("login");
  const [accountMessage, setAccountMessage] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/products.json");
        if (!response.ok) throw new Error("Produsele nu au putut fi încărcate.");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setProductsError(error instanceof Error ? error.message : "A apărut o eroare.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setAccountOpen(false);
        setActivePanel(null);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-open", searchOpen || accountOpen || Boolean(activePanel));
    return () => document.body.classList.remove("modal-open");
  }, [searchOpen, accountOpen, activePanel]);

  const sortedProducts = useMemo(() => {
    const productsCopy = [...products];
    if (sortOrder === "asc") return productsCopy.sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") return productsCopy.sort((a, b) => b.price - a.price);
    return productsCopy;
  }, [products, sortOrder]);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase("ro");
    if (!query) return [];
    return products.filter((product) => {
      const categoryName = CATEGORY_NAMES[product.category] || "";
      return [product.name, product.description, categoryName].join(" ").toLocaleLowerCase("ro").includes(query);
    });
  }, [products, searchQuery]);

  const favoriteItems = products.filter((product) => favoriteProducts.includes(product.id));
  const cartItems = products
    .map((product) => ({
      ...product,
      quantity: cartProducts.filter((id) => id === product.id).length,
    }))
    .filter((product) => product.quantity > 0);

  const cartSubtotal = cartItems.reduce((total, product) => total + product.price * product.quantity, 0);
  const freeShippingLimit = 250;
  const shippingCost = cartSubtotal === 0 || cartSubtotal >= freeShippingLimit ? 0 : 20;
  const orderTotal = cartSubtotal + shippingCost;

  function toggleFavorite(productId) {
    setFavoriteProducts((current) => (current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]));
  }

  function addToCart(productId) {
    setCartProducts((current) => [...current, productId]);
  }

  function decreaseCartQuantity(productId) {
    setCartProducts((current) => {
      const index = current.indexOf(productId);
      return index === -1 ? current : current.filter((_, currentIndex) => currentIndex !== index);
    });
  }

  function removeFromFavorites(productId) {
    setFavoriteProducts((current) => current.filter((id) => id !== productId));
  }

  function removeFromCart(productId) {
    setCartProducts((current) => current.filter((id) => id !== productId));
  }

  function rateProduct(productId, rating) {
    setRatings((current) => ({ ...current, [productId]: rating }));
  }

  function handleProductImageError(event, productId) {
    const fallback = PRODUCT_IMAGE_FALLBACKS[productId];
    if (fallback && event.currentTarget.src !== new URL(fallback, window.location.origin).href) {
      event.currentTarget.src = fallback;
      return;
    }
    event.currentTarget.style.visibility = "hidden";
  }

  function handleBadgeImageError(event) {
    event.currentTarget.style.display = "none";
  }

  function openProduct(productId) {
    setSearchOpen(false);
    window.setTimeout(() => {
      document.getElementById(`produs-${productId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  }

  function handleAccountSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");

    if (!email || !password) {
      setAccountMessage("Completează adresa de e-mail și parola.");
      return;
    }

    if (accountMode === "login") {
      const savedEmail = localStorage.getItem("demoAccountEmail");
      setAccountMessage(savedEmail === email ? "Autentificare reușită. Bine ai revenit!" : "Utilizatorul nu a fost găsit. Creează mai întâi un cont demonstrativ.");
      return;
    }

    const name = String(data.get("name") || "").trim();
    if (!name) {
      setAccountMessage("Completează numele pentru a crea contul.");
      return;
    }

    localStorage.setItem("demoAccountEmail", email);
    localStorage.setItem("demoAccountName", name);
    setAccountMessage("Contul demonstrativ a fost creat. Te poți autentifica folosind aceeași adresă.");
    event.currentTarget.reset();
  }

  function handleContactSubmit(event) {
    event.preventDefault();
    setContactMessage("Mulțumim! Mesajul tău a fost înregistrat pentru această demonstrație.");
    event.currentTarget.reset();
  }

  function renderProductCard(product) {
    const badges = product.badges?.length ? product.badges : DEFAULT_BADGES;

    return (
      <article className="product-card" id={`produs-${product.id}`} key={product.id}>
        <div className="product-image-wrapper">
          <img src={product.image} alt={product.name} className="product-image" loading="lazy" onError={(event) => handleProductImageError(event, product.id)} />
          <button type="button" className={`favorite-button ${favoriteProducts.includes(product.id) ? "favorite-active" : ""}`} onClick={() => toggleFavorite(product.id)} aria-pressed={favoriteProducts.includes(product.id)} aria-label={favoriteProducts.includes(product.id) ? `Elimină ${product.name} din produsele preferate` : `Adaugă ${product.name} la produsele preferate`}>
            {favoriteProducts.includes(product.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </button>
        </div>

        <div className="product-content">
          <p className="product-category">{CATEGORY_NAMES[product.category]}</p>
          <h3>{product.name}</h3>
          <p className="product-description">{product.description}</p>

          <div className="product-meta">
            <span>{product.weight}</span>
            <strong>{product.price} lei</strong>
          </div>

          <div className="product-rating" aria-label={`Evaluare: ${ratings[product.id] || 0} din 5 stele`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button type="button" key={star} className={star <= (ratings[product.id] || 0) ? "rating-active" : ""} onClick={() => rateProduct(product.id, star)} aria-label={`Acordă ${star} ${star === 1 ? "stea" : "stele"}`} aria-pressed={star === ratings[product.id]}>
                {star <= (ratings[product.id] || 0) ? "★" : "☆"}
              </button>
            ))}
            <span>{ratings[product.id] ? "1 evaluare" : "0 evaluări"}</span>
          </div>

          <div className="product-badges" aria-label="Caracteristicile produsului">
            {badges.map((badge, index) => (
              <img key={`${product.id}-${badge}`} src={badge} alt={["Fabricat în Maramureș", "Produs natural", "Lucrat manual"][index] || "Caracteristică produs"} loading="lazy" onError={handleBadgeImageError} />
            ))}
          </div>

          <p className="product-note">Fotografiile au caracter informativ. Aspectul produsului poate varia în funcție de sezon, producător și lotul de fabricație.</p>

          <button type="button" className="add-to-cart-button" onClick={() => addToCart(product.id)} aria-label={`Adaugă ${product.name} în coș`}>
            Adaugă în coș
          </button>
        </div>
      </article>
    );
  }

  return (
    <>
      <a className="skip-link" href="#continut-principal">
        Sari direct la conținut
      </a>

      <header className="hero" id="acasa">
        <nav className="main-navbar" aria-label="Navigarea principală">
          <a className="site-logo" href="#acasa">
            Bunătăți din Ardeal &amp; Maramureș
          </a>

          <ul className="nav-links">
            <li>
              <a href="#acasa">Acasă</a>
            </li>
            <li>
              <a href="#despre-noi">Despre noi</a>
            </li>
            <li>
              <a href="#categorii">Categorii</a>
            </li>
            <li>
              <a href="#produse">Produse</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>

          <div className="nav-actions" aria-label="Acțiuni utilizator">
            <button type="button" onClick={() => setSearchOpen(true)} aria-label="Caută produse" title="Caută produse">
              <SearchIcon />
            </button>
            <button type="button" onClick={() => setAccountOpen(true)} aria-label="Deschide contul utilizatorului" title="Cont">
              <AccountCircleOutlinedIcon />
            </button>
            <button type="button" onClick={() => setActivePanel("favorites")} aria-label="Deschide produsele preferate" title="Favorite">
              <FavoriteBorderIcon />
              <span className="nav-counter" aria-label={`${favoriteProducts.length} produse preferate`}>
                {favoriteProducts.length}
              </span>
            </button>
            <button type="button" onClick={() => setActivePanel("cart")} aria-label="Deschide coșul de cumpărături" title="Coș">
              <ShoppingCartOutlinedIcon />
              <span className="nav-counter" aria-label={`${cartProducts.length} produse în coș`}>
                {cartProducts.length}
              </span>
            </button>
          </div>
        </nav>

        <div className="hero-particles" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index}></span>
          ))}
        </div>
        <div className="hero-light" aria-hidden="true"></div>

        <div className="hero-overlay">
          <div className="hero-content">
            <p className="hero-label">Gust autentic din Transilvania</p>
            <h1>
              BUNĂTĂȚI DIN ARDEAL
              <br />
              <span>&amp; MARAMUREȘ</span>
            </h1>
            <p className="hero-slogan">Produse tradiționale românești, livrate la ușa ta</p>
            <div className="hero-buttons">
              <a className="hero-button primary-button" href="#produse">
                Vezi produsele
              </a>
              <a className="hero-button secondary-button" href="#categorii">
                Descoperă categoriile
              </a>
            </div>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="modal-overlay" onClick={() => setSearchOpen(false)}>
          <section className="utility-modal search-modal" role="dialog" aria-modal="true" aria-labelledby="search-title" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div>
                <p className="modal-eyebrow">Catalog rapid</p>
                <h2 id="search-title">Caută produse sau categorii</h2>
              </div>
              <button type="button" className="close-panel-button" onClick={() => setSearchOpen(false)} aria-label="Închide căutarea">
                ×
              </button>
            </div>

            <label className="search-field" htmlFor="product-search">
              <SearchIcon aria-hidden="true" />
              <input id="product-search" type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Exemplu: miere, brânză, dulceață..." autoFocus />
            </label>

            <div className="search-results" aria-live="polite">
              {!searchQuery.trim() && <p className="empty-panel-message">Scrie denumirea unui produs sau a unei categorii.</p>}
              {searchQuery.trim() && searchResults.length === 0 && <p className="empty-panel-message">Nu am găsit produse pentru această căutare.</p>}
              {searchResults.map((product) => (
                <button type="button" className="search-result" key={product.id} onClick={() => openProduct(product.id)}>
                  <img src={product.image} alt="" onError={(event) => handleProductImageError(event, product.id)} />
                  <span>
                    <strong>{product.name}</strong>
                    <small>
                      {CATEGORY_NAMES[product.category]} · {product.price} lei
                    </small>
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {accountOpen && (
        <div className="modal-overlay" onClick={() => setAccountOpen(false)}>
          <section className="utility-modal account-modal" role="dialog" aria-modal="true" aria-labelledby="account-title" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div>
                <p className="modal-eyebrow">Cont demonstrativ</p>
                <h2 id="account-title">{accountMode === "login" ? "Autentificare" : "Creează un cont"}</h2>
              </div>
              <button type="button" className="close-panel-button" onClick={() => setAccountOpen(false)} aria-label="Închide fereastra contului">
                ×
              </button>
            </div>

            <div className="account-tabs" role="tablist" aria-label="Alege tipul formularului">
              <button
                type="button"
                className={accountMode === "login" ? "active" : ""}
                onClick={() => {
                  setAccountMode("login");
                  setAccountMessage("");
                }}
              >
                Autentificare
              </button>
              <button
                type="button"
                className={accountMode === "register" ? "active" : ""}
                onClick={() => {
                  setAccountMode("register");
                  setAccountMessage("");
                }}
              >
                Cont nou
              </button>
            </div>

            <form className="account-form" onSubmit={handleAccountSubmit}>
              {accountMode === "register" && (
                <label>
                  Nume și prenume
                  <input type="text" name="name" autoComplete="name" required />
                </label>
              )}
              <label>
                Adresă de e-mail
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label>
                Parolă
                <input type="password" name="password" autoComplete={accountMode === "login" ? "current-password" : "new-password"} minLength="6" required />
              </label>
              <button type="submit" className="form-submit-button">
                {accountMode === "login" ? "Intră în cont" : "Creează contul"}
              </button>
            </form>

            {accountMessage && (
              <p className="form-feedback" role="status">
                {accountMessage}
              </p>
            )}
            <p className="demo-note">Funcționalitate demonstrativă. Datele sunt salvate doar local, în browserul tău.</p>
          </section>
        </div>
      )}

      {activePanel && (
        <div className="shop-panel-overlay" onClick={() => setActivePanel(null)}>
          <aside className="shop-panel" role="dialog" aria-modal="true" aria-labelledby="shop-panel-title" onClick={(event) => event.stopPropagation()}>
            <div className="shop-panel-header">
              <h2 id="shop-panel-title">{activePanel === "favorites" ? "Produse preferate" : "Coș de cumpărături"}</h2>
              <button type="button" className="close-panel-button" onClick={() => setActivePanel(null)} aria-label="Închide panoul">
                ×
              </button>
            </div>

            <div className="shop-panel-content">
              {activePanel === "favorites" &&
                (favoriteItems.length === 0 ? (
                  <p className="empty-panel-message">Nu ai produse favorite.</p>
                ) : (
                  favoriteItems.map((product) => (
                    <article className="panel-product" key={product.id}>
                      <img src={product.image} alt={product.name} className="panel-product-image" onError={(event) => handleProductImageError(event, product.id)} />
                      <div className="panel-product-info">
                        <h3>{product.name}</h3>
                        <p>{product.price} lei</p>
                      </div>
                      <button type="button" className="panel-remove-button" onClick={() => removeFromFavorites(product.id)} aria-label={`Elimină ${product.name} din favorite`}>
                        ×
                      </button>
                    </article>
                  ))
                ))}

              {activePanel === "cart" &&
                (cartItems.length === 0 ? (
                  <p className="empty-panel-message">Coșul este gol.</p>
                ) : (
                  <>
                    {cartItems.map((product) => (
                      <article className="panel-product panel-cart-product" key={product.id}>
                        <img src={product.image} alt={product.name} className="panel-product-image" onError={(event) => handleProductImageError(event, product.id)} />
                        <div className="panel-product-info">
                          <h3>{product.name}</h3>
                          <p>
                            {product.price} lei / {product.weight}
                          </p>
                          <div className="quantity-controls" aria-label={`Cantitate pentru ${product.name}`}>
                            <button type="button" onClick={() => decreaseCartQuantity(product.id)} aria-label="Scade cantitatea">
                              −
                            </button>
                            <span>{product.quantity}</span>
                            <button type="button" onClick={() => addToCart(product.id)} aria-label="Crește cantitatea">
                              +
                            </button>
                          </div>
                          <p className="panel-product-subtotal">Subtotal: {(product.price * product.quantity).toFixed(2)} lei</p>
                        </div>
                        <button type="button" className="panel-remove-button" onClick={() => removeFromCart(product.id)} aria-label={`Elimină ${product.name} din coș`}>
                          ×
                        </button>
                      </article>
                    ))}
                    <div className="cart-summary">
                      <div>
                        <span>Subtotal produse</span>
                        <strong>{cartSubtotal.toFixed(2)} lei</strong>
                      </div>
                      <div>
                        <span>Transport</span>
                        <strong>{shippingCost === 0 ? "Gratuit" : `${shippingCost.toFixed(2)} lei`}</strong>
                      </div>
                      <div className="cart-summary-total">
                        <span>Total comandă</span>
                        <strong>{orderTotal.toFixed(2)} lei</strong>
                      </div>
                      {cartSubtotal > 0 && cartSubtotal < freeShippingLimit && <p>Mai adaugă {(freeShippingLimit - cartSubtotal).toFixed(2)} lei pentru transport gratuit.</p>}
                    </div>
                  </>
                ))}
            </div>
          </aside>
        </div>
      )}

      <main id="continut-principal">
        <section id="despre-noi" className="about-section" aria-labelledby="despre-title">
          <div className="about-layout">
            <figure className="about-image-card about-image-left">
              <img src="/assets/Despre/casa-traditionala.webp" alt="Casă tradițională din Maramureș" loading="lazy" />
            </figure>
            <div className="about-container">
              <p className="section-label">Povestea noastră</p>
              <h2 id="despre-title">Despre noi</h2>
              <div className="about-text">
                <p>Bunătăți din Ardeal &amp; Maramureș s-a născut din dorința de a aduce mai aproape gusturile, tradițiile și meșteșugurile autentice din nord-vestul Transilvaniei.</p>
                <p>În această regiune conviețuiesc de generații români, maghiari, șvabi și alte comunități care au contribuit la un patrimoniu culinar bogat și divers.</p>
                <p>Prin acest magazin promovăm producători locali, gospodării de familie și mici artizani care păstrează metode tradiționale de lucru și respectul pentru calitate.</p>
                <p>Oferta se dezvoltă treptat cu produse tradiționale, specialități regionale, produse artizanale și obiecte care păstrează identitatea locului.</p>
              </div>
            </div>
            <figure className="about-image-card about-image-right">
              <img src="/assets/Despre/interior-maramures.webp" alt="Interior tradițional cu țesături și obiecte din Maramureș" loading="lazy" />
            </figure>
          </div>
        </section>

        <section id="categorii" className="categories-section" aria-labelledby="categorii-title">
          <div className="categories-container">
            <p className="categories-label">Alege gustul preferat</p>
            <h2 id="categorii-title">Categorii de produse</h2>
            <div className="categories-grid">
              {CATEGORY_CONFIG.map((category) => (
                <article className="category-card" key={category.id}>
                  <div className="category-symbol" aria-hidden="true">
                    <CategoryIcon type={category.icon} />
                  </div>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <a href={`#categorie-${category.id}`} aria-label={`Vezi produsele din categoria ${category.title}`}>
                    Descoperă produsele
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="produse" className="products-section" aria-labelledby="produse-title">
          <div className="products-container">
            <div className="products-heading">
              <div>
                <p className="products-label">Selecție tradițională</p>
                <h2 id="produse-title">Produse tradiționale</h2>
              </div>
              <label className="sort-label" htmlFor="sort-products">
                Sortează după preț
                <select id="sort-products" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                  <option value="initial">Ordine inițială</option>
                  <option value="asc">Preț crescător</option>
                  <option value="desc">Preț descrescător</option>
                </select>
              </label>
            </div>

            {loading && <p className="products-status">Se încarcă produsele...</p>}
            {productsError && (
              <p className="products-status products-error" role="alert">
                {productsError}
              </p>
            )}

            {!loading &&
              !productsError &&
              CATEGORY_CONFIG.map((category) => {
                const categoryProducts = sortedProducts.filter((product) => product.category === category.id);
                if (categoryProducts.length === 0) return null;

                return (
                  <section className="product-category-group" id={`categorie-${category.id}`} key={category.id} aria-labelledby={`titlu-${category.id}`}>
                    <div className="category-group-heading">
                      <span className="category-group-icon" aria-hidden="true">
                        <CategoryIcon type={category.icon} />
                      </span>
                      <div>
                        <p>Selecție regională</p>
                        <h3 id={`titlu-${category.id}`}>{category.title}</h3>
                      </div>
                    </div>
                    <div className="products-grid">{categoryProducts.map(renderProductCard)}</div>
                  </section>
                );
              })}
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="contact-shell">
            <aside className="contact-info">
              <p className="contact-eyebrow">Suntem aici pentru tine</p>
              <h2 id="contact-title">Hai să păstrăm legătura</h2>
              <p className="contact-lead">Contactează-ne cu încredere dacă ai poftă de bunătăți din zonă. Căutăm produse locale, comenzi personalizate și chiar obiecte vintage sau retro, din podul bunicii ori de la târgurile de vechituri.</p>

              <ul className="contact-details">
                <li>
                  <span aria-hidden="true">✉</span>
                  <a href="mailto:helga.sabo@example.com">helga.sabo@example.com</a>
                </li>
                <li>
                  <span aria-hidden="true">⌖</span>
                  <span>Satu Mare, România</span>
                </li>
              </ul>

              <div className="social-links" aria-label="Rețele sociale">
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <SocialIcon type="facebook" />
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <SocialIcon type="instagram" />
                </a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <SocialIcon type="linkedin" />
                </a>
                <a href="https://github.com/larixsh" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <SocialIcon type="github" />
                </a>
              </div>
            </aside>

            <div className="contact-form-card">
              <p className="contact-form-kicker">Spune-ne ce cauți</p>
              <h3>Cu ce te putem ajuta?</h3>

              <form className="contact-form" onSubmit={handleContactSubmit}>
                <fieldset className="interest-options">
                  <legend>Sunt interesat de</legend>
                  {["Produse tradiționale", "Comandă personalizată", "Producător local", "Vintage / Retro"].map((option, index) => (
                    <label key={option}>
                      <input type="radio" name="interest" value={option} defaultChecked={index === 0} />
                      <span>{option}</span>
                    </label>
                  ))}
                </fieldset>

                <label>
                  Numele tău
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label>
                  Adresa de e-mail
                  <input type="email" name="email" autoComplete="email" required />
                </label>
                <label>
                  Mesajul tău<textarea name="message" rows="5" minLength="10" required></textarea>
                </label>

                <label className="consent-field">
                  <input type="checkbox" required />
                  <span>Sunt de acord ca datele introduse să fie folosite pentru a răspunde solicitării mele.</span>
                </label>

                <button type="submit" className="form-submit-button">
                  Trimite mesajul <span aria-hidden="true">→</span>
                </button>
              </form>

              {contactMessage && (
                <p className="form-feedback" role="status">
                  {contactMessage}
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="main-footer">
        <p>Creat de Helga Sabo © 2026</p>
      </footer>
    </>
  );
}

export default App;
