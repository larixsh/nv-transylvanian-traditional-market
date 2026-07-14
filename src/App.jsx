import { useEffect, useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HiveIcon from "@mui/icons-material/Hive";
import LiquorIcon from "@mui/icons-material/Liquor";

import { Ham, Milk } from "lucide-react";
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
function App() {
  const [products, setProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [sortOrder, setSortOrder] = useState("initial");
  const [activePanel, setActivePanel] = useState(null);
  const [ratings, setRatings] = useState({});

  const productImageFallbacks = {
    1: "/assets/Preparate din carne/Caltabos.webp",
    2: "/assets/Preparate din carne/Slana-ardeleneasca.webp",
    3: "/assets/Preparate din carne/Carnati-mangalita.webp",
    4: "/assets/Preparate din carne/Costita-afumata.webp",
  };

  const badgeImages = ["/assets/Badge/Fabricat-in-Maramures-1_iconita.webp.webp", "/assets/Badge/100-natural-logo.png.webp", "/assets/Badge/Hand-made-logo.webp.webp"];

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/products.json");

        if (!response.ok) {
          throw new Error("Produsele nu au putut fi încărcate.");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setProductsError(error.message);
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

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const sortedProducts = useMemo(() => {
    const productsCopy = [...products];

    if (sortOrder === "asc") {
      return productsCopy.sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "desc") {
      return productsCopy.sort((a, b) => b.price - a.price);
    }

    return productsCopy;
  }, [products, sortOrder]);
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
    setFavoriteProducts((currentFavorites) => (currentFavorites.includes(productId) ? currentFavorites.filter((id) => id !== productId) : [...currentFavorites, productId]));
  }

  function addToCart(productId) {
    setCartProducts((currentCart) => [...currentCart, productId]);
  }

  function decreaseCartQuantity(productId) {
    setCartProducts((currentCart) => {
      const productIndex = currentCart.indexOf(productId);

      if (productIndex === -1) {
        return currentCart;
      }

      return currentCart.filter((_, index) => index !== productIndex);
    });
  }

  function removeFromFavorites(productId) {
    setFavoriteProducts((currentFavorites) => currentFavorites.filter((id) => id !== productId));
  }

  function removeFromCart(productId) {
    setCartProducts((currentCart) => currentCart.filter((id) => id !== productId));
  }

  function rateProduct(productId, rating) {
    setRatings((currentRatings) => ({
      ...currentRatings,
      [productId]: rating,
    }));
  }

  function handleProductImageError(event, productId) {
    const fallback = productImageFallbacks[productId];

    if (fallback && event.currentTarget.src !== new URL(fallback, window.location.origin).href) {
      event.currentTarget.src = fallback;
      return;
    }

    event.currentTarget.style.visibility = "hidden";
  }

  function handleBadgeImageError(event) {
    event.currentTarget.style.display = "none";
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
            <button type="button" aria-label="Caută produse" title="Caută produse">
              <SearchIcon />
            </button>

            <button type="button" aria-label="Deschide contul utilizatorului" title="Cont">
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
        <div className="hero-particles">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="hero-light"></div>
        <div className="hero-overlay">
          <div className="hero-content">
            <p className="hero-label">Gust autentic din Transilvania</p>

            <h1>
              BUNĂTĂȚI DIN ARDEAL
              <br />
              <span>&amp; MARAMUREȘ</span>
            </h1>

            <p className="hero-slogan">Produse Tradiționale Românești, livrate la ușa ta</p>

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

                      <button type="button" className="panel-remove-button" onClick={() => removeFromFavorites(product.id)} aria-label={`Elimină ${product.name} din favorite`} title="Elimină">
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

                        <button type="button" className="panel-remove-button" onClick={() => removeFromCart(product.id)} aria-label={`Elimină ${product.name} din coș`} title="Elimină">
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

                <p>În această regiune conviețuiesc de generații români, maghiari, șvabi și alte comunități care au contribuit la un patrimoniu culinar bogat și divers. Rețetele s-au transmis din familie în familie, iar fiecare produs păstrează o parte din istoria și identitatea locului din care provine.</p>

                <p>Prin acest magazin ne dorim să promovăm producători locali, gospodării de familie și mici artizani care păstrează metode tradiționale de lucru și respectul pentru calitate. Credem că produsele autentice spun o poveste, iar fiecare alegere făcută cu grijă merită să ajungă pe masa celor care apreciază gustul adevărat.</p>

                <p>Oferta magazinului este în continuă dezvoltare și va include treptat noi categorii de produse tradiționale, specialități regionale, produse artizanale și alte bunătăți reprezentative pentru Ardeal, Maramureș și nord-vestul Transilvaniei. Ne dorim să descoperim permanent noi producători și să aducem în magazin produse care respectă tradiția, dar răspund și cerințelor de astăzi.</p>

                <p>Bunătăți din Ardeal &amp; Maramureș este mai mult decât un magazin online. Este un loc în care tradițiile locale, gusturile autentice și munca oamenilor pasionați se întâlnesc pentru a oferi o experiență cât mai apropiată de spiritul gospodăriilor din această parte a țării.</p>

                <p>Ne dorim ca fiecare vizită pe site să fie o invitație de a descoperi produse autentice și povești locale care merită cunoscute și păstrate.</p>
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
              <article className="category-card">
                <div className="category-symbol" aria-hidden="true">
                  <Ham size={26} strokeWidth={1.8} />
                </div>

                <h3>Preparate din carne</h3>

                <p>Afumături și preparate tradiționale realizate după rețete locale.</p>

                <a href="#produse" aria-label="Vezi produsele din categoria Preparate din carne">
                  Descoperă produsele
                </a>
              </article>

              <article className="category-card">
                <div className="category-symbol" aria-hidden="true">
                  <Milk size={26} strokeWidth={1.8} />
                </div>

                <h3>Lactate</h3>

                <p>Brânzeturi și produse lactate inspirate din gospodăriile tradiționale.</p>

                <a href="#produse" aria-label="Vezi produsele din categoria Lactate">
                  Descoperă produsele
                </a>
              </article>

              <article className="category-card">
                <div className="category-symbol" aria-hidden="true">
                  <HiveIcon size={26} strokeWidth={1.8} />
                </div>

                <h3>Miere</h3>

                <p>Produse apicole atent selecționate, cu gust și aromă naturală.</p>

                <a href="#produse" aria-label="Vezi produsele din categoria Miere">
                  Descoperă produsele
                </a>
              </article>

              <article className="category-card">
                <div className="category-symbol" aria-hidden="true">
                  <JamJarIcon />
                </div>

                <h3>Dulcețuri</h3>

                <p>Bunătăți din fructe pregătite pentru cămara unei gospodării.</p>

                <a href="#produse" aria-label="Vezi produsele din categoria Dulcețuri">
                  Descoperă produsele
                </a>
              </article>

              <article className="category-card">
                <div className="category-symbol" aria-hidden="true">
                  <PickleJarIcon />
                </div>

                <h3>Murături și zacuscă</h3>

                <p>Rețete de sezon, pregătite cu legume și condimente atent alese.</p>

                <a href="#produse" aria-label="Vezi produsele din categoria Murături și zacuscă">
                  Descoperă produsele
                </a>
              </article>

              <article className="category-card">
                <div className="category-symbol" aria-hidden="true">
                  <LiquorIcon size={26} strokeWidth={1.8} />
                </div>

                <h3>Băuturi tradiționale</h3>

                <p>Specialități regionale prezentate în cadrul selecției magazinului.</p>

                <a href="#produse" aria-label="Vezi produsele din categoria Băuturi tradiționale">
                  Descoperă produsele
                </a>
              </article>
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

            <div className="products-grid">
              {loading && <p className="products-status">Se încarcă produsele...</p>}

              {productsError && (
                <p className="products-status products-error" role="alert">
                  {productsError}
                </p>
              )}
              {sortedProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image-wrapper">
                    <img src={product.image} alt={product.name} className="product-image" loading="lazy" onError={(event) => handleProductImageError(event, product.id)} />
                    <button type="button" className={`favorite-button ${favoriteProducts.includes(product.id) ? "favorite-active" : ""}`} onClick={() => toggleFavorite(product.id)} aria-pressed={favoriteProducts.includes(product.id)} aria-label={favoriteProducts.includes(product.id) ? `Elimină ${product.name} din produsele preferate` : `Adaugă ${product.name} la produsele preferate`} title={favoriteProducts.includes(product.id) ? "Elimină de la favorite" : "Adaugă la favorite"}>
                      {favoriteProducts.includes(product.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </button>
                  </div>

                  <div className="product-content">
                    <p className="product-category">Preparate din carne</p>

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
                      {badgeImages.map((badge, index) => (
                        <img key={badge} src={badge} alt={["Fabricat în Maramureș", "Produs natural", "Lucrat manual"][index]} loading="lazy" onError={handleBadgeImageError} />
                      ))}
                    </div>

                    <p className="product-note">Fotografiile au caracter informativ. Aspectul produsului poate varia în funcție de sezon, producător și lotul de fabricație.</p>

                    <button type="button" className="add-to-cart-button" onClick={() => addToCart(product.id)} aria-label={`Adaugă ${product.name} în coș`}>
                      Adaugă în coș
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="temporary-section" aria-labelledby="contact-title">
          <h2 id="contact-title">Contact</h2>
        </section>
      </main>

      <footer className="main-footer">
        <p>Creat de Helga Sabo © 2026</p>
      </footer>
    </>
  );
}

export default App;
