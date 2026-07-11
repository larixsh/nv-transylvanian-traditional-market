import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // FETCH AJAX - Se uită în folderul public/
  useEffect(() => {
    fetch("/products.json")
      .then((response) => {
        if (!response.ok) throw new Error("Nu am găsit JSON-ul");
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error("Eroare AJAX:", err));
  }, []);

  return (
    <div className="bg-[#FFFAF1] min-h-screen">
      <Header cartCount={cart.length} />

      <main className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-4xl font-serif text-[#3E2723] mb-10 text-center">Produse Tradiționale</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={() => setCart([...cart, product])} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
