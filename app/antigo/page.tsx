"use client";

import { useMemo, useState } from "react";

const PRODUCTS = [
  { name: "Camiseta Preta Aviador", price: "R$ 29,90" },
  { name: "Camiseta Preta Los Angeles 23", price: "R$ 34,90" },
  { name: "Camiseta Clara New York Fashion", price: "R$ 39,90" },
  { name: "Camiseta Streetwear 'Prison' - Break the Silence", price: "R$ 25,90" },
  { name: "Camiseta Ghost Split", price: "R$ 44,90" },
];

const BUTTON_HOTSPOTS = [
  { left: 11.1, width: 8.2 },
  { left: 28.1, width: 8.2 },
  { left: 45.2, width: 8.2 },
  { left: 62.2, width: 8.2 },
  { left: 79.3, width: 8.2 },
];

export default function AntigoPage() {
  const [cart, setCart] = useState<number[]>([]);
  const [notice, setNotice] = useState("");

  const cartLabel = useMemo(() => {
    const total = cart.length;
    return total === 1 ? "1 item no carrinho" : `${total} itens no carrinho`;
  }, [cart]);

  const addToCart = (index: number) => {
    setCart((current) => [...current, index]);
    setNotice(`${PRODUCTS[index].name} adicionado ao carrinho.`);
    window.setTimeout(() => setNotice(""), 1900);
  };

  return (
    <div className="csvault-v1">
      <section className="csvault-v1__hero" aria-label="ThAspect V1 - tela inicial preservada do CS-Vault">
        <img
          src="/antigo/csvault/home-original.jpg"
          alt="Tela inicial original da ThAspect V1 preservada no CS-Vault"
          className="csvault-v1__hero-image"
        />

        <a className="csvault-hotspot csvault-hotspot--inicio" href="/antigo" aria-label="Início" />
        <a
          className="csvault-hotspot csvault-hotspot--carrinho"
          href="#carrinho-antigo"
          aria-label={`Carrinho - ${cartLabel}`}
        />
        <a className="csvault-hotspot csvault-hotspot--checkout" href="#checkout-antigo" aria-label="Checkout" />
        <a className="csvault-hotspot csvault-hotspot--entrar" href="#conta-antiga" aria-label="Entrar" />
        <a className="csvault-hotspot csvault-hotspot--cadastrar" href="#conta-antiga" aria-label="Cadastrar" />
        <a className="csvault-hotspot csvault-hotspot--produtos" href="#catalogo-antigo" aria-label="Confira nossos produtos" />
      </section>

      <section id="catalogo-antigo" className="csvault-v1__catalog-section" aria-label="Catálogo original ThAspect V1">
        <div className="csvault-v1__catalog-shell">
          <div className="csvault-v1__catalog-art">
            <img
              src="/antigo/csvault/catalog-original.jpg"
              alt="Catálogo original ThAspect V1 com cinco camisetas"
              className="csvault-v1__catalog-image"
            />

            {BUTTON_HOTSPOTS.map((button, index) => (
              <button
                key={PRODUCTS[index].name}
                type="button"
                className="csvault-v1__product-hotspot"
                style={{ left: `${button.left}%`, width: `${button.width}%` }}
                onClick={() => addToCart(index)}
                aria-label={`Adicionar ${PRODUCTS[index].name} ao carrinho por ${PRODUCTS[index].price}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="carrinho-antigo" className="csvault-v1__legacy-panel">
        <div>
          <span className="csvault-v1__eyebrow">CARRINHO</span>
          <strong>{cartLabel}</strong>
        </div>
        <p>
          {cart.length === 0
            ? "O carrinho está vazio."
            : cart.map((index) => PRODUCTS[index].name).join(" · ")}
        </p>
      </section>

      <section id="checkout-antigo" className="csvault-v1__legacy-panel csvault-v1__legacy-panel--dark">
        <div>
          <span className="csvault-v1__eyebrow">CHECKOUT</span>
          <strong>Versão acadêmica original</strong>
        </div>
        <p>Fluxo preservado como registro histórico do projeto ThAspect documentado no CS-Vault.</p>
      </section>

      <section id="conta-antiga" className="csvault-v1__legacy-panel">
        <div>
          <span className="csvault-v1__eyebrow">CONTA</span>
          <strong>Entrar / Cadastrar</strong>
        </div>
        <p>Interface histórica preservada sem autenticação ativa.</p>
      </section>

      <footer className="csvault-v1__footer">© 2024 ThAspect&nbsp;&nbsp; Todos os direitos reservados.</footer>

      {notice ? <div className="csvault-v1__toast" role="status">{notice}</div> : null}
    </div>
  );
}
