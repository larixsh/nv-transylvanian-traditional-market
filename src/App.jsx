import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
function App() {
  return (
    <>
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

            <button type="button" aria-label="Deschide produsele preferate" title="Favorite">
              <FavoriteBorderIcon />
              <span className="nav-counter" aria-label="0 produse preferate">
                0
              </span>
            </button>

            <button type="button" aria-label="Deschide coșul de cumpărături" title="Coș">
              <ShoppingCartOutlinedIcon />
              <span className="nav-counter" aria-label="0 produse în coș">
                0
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

      <main>
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
                  PC
                </div>

                <h3>Preparate din carne</h3>

                <p>Afumături și preparate tradiționale realizate după rețete locale.</p>

                <a href="#produse" aria-label="Vezi produsele din categoria Preparate din carne">
                  Descoperă produsele
                </a>
              </article>

              <article className="category-card">
                <div className="category-symbol" aria-hidden="true">
                  LA
                </div>

                <h3>Lactate</h3>

                <p>Brânzeturi și produse lactate inspirate din gospodăriile tradiționale.</p>

                <a href="#produse" aria-label="Vezi produsele din categoria Lactate">
                  Descoperă produsele
                </a>
              </article>

              <article className="category-card">
                <div className="category-symbol" aria-hidden="true">
                  MI
                </div>

                <h3>Miere</h3>

                <p>Produse apicole atent selecționate, cu gust și aromă naturală.</p>

                <a href="#produse" aria-label="Vezi produsele din categoria Miere">
                  Descoperă produsele
                </a>
              </article>

              <article className="category-card">
                <div className="category-symbol" aria-hidden="true">
                  DU
                </div>

                <h3>Dulcețuri</h3>

                <p>Bunătăți din fructe pregătite pentru cămara unei gospodării.</p>

                <a href="#produse" aria-label="Vezi produsele din categoria Dulcețuri">
                  Descoperă produsele
                </a>
              </article>

              <article className="category-card">
                <div className="category-symbol" aria-hidden="true">
                  MU
                </div>

                <h3>Murături și zacuscă</h3>

                <p>Rețete de sezon, pregătite cu legume și condimente atent alese.</p>

                <a href="#produse" aria-label="Vezi produsele din categoria Murături și zacuscă">
                  Descoperă produsele
                </a>
              </article>

              <article className="category-card">
                <div className="category-symbol" aria-hidden="true">
                  BT
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

        <section id="produse" className="temporary-section" aria-labelledby="produse-title">
          <h2 id="produse-title">Produse tradiționale</h2>
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
