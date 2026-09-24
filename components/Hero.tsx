"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const ANGLES = [12, 24, 30, 45] as const;

export const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [angle, setAngle] = useState<(typeof ANGLES)[number]>(24);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
      setScrollProgress(progress);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const imageTransform = useMemo(
    () => ({
      transform: `scale(${1.045 + scrollProgress * 0.04}) translate3d(${(angle - 24) * 0.18}px, ${scrollProgress * 18}px, 0)`,
    }),
    [angle, scrollProgress]
  );

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero-stage relative min-h-[660px] overflow-hidden bg-[#111] md:min-h-[720px]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/products/hero-lifestyle.jpg"
          alt="Campanha ThAspect em arquitetura brutalista"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[64%_center] will-change-transform transition-transform duration-700 ease-out motion-reduce:transform-none"
          style={imageTransform}
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,7,.98)_0%,rgba(7,7,7,.9)_27%,rgba(7,7,7,.48)_52%,rgba(7,7,7,.08)_79%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.5)_0%,transparent_50%)]" />

      <div
        aria-hidden="true"
        className="hero-plane hero-plane-blue"
        style={{ transform: `translate3d(${(angle - 24) * 1.25}px, ${scrollProgress * -18}px, 0) rotate(-${angle}deg)` }}
      />
      <div
        aria-hidden="true"
        className="hero-plane hero-plane-orange"
        style={{ transform: `translate3d(${(24 - angle) * .9}px, ${scrollProgress * 12}px, 0) rotate(${Math.max(8, angle - 8)}deg)` }}
      />

      <div className="relative z-10 mx-auto flex min-h-[660px] max-w-[1440px] items-center px-6 py-20 md:min-h-[720px] md:px-10 lg:px-14">
        <div className="max-w-[640px] text-white">
          <div className="hero-kicker mb-8 flex items-center gap-4">
            <span className="h-[3px] w-8 bg-[#FF6A00]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/90">ThAspect Streetwear · Drop 01</p>
          </div>

          <p className="hero-copy mb-4 max-w-[270px] text-sm font-bold uppercase leading-[1.45] tracking-[0.22em] text-white/90">
            Novas perspectivas sempre.
          </p>

          <h1 className="hero-title font-heading text-[49px] font-black uppercase leading-[0.91] tracking-[-0.06em] sm:text-[68px] lg:text-[82px]">
            Moda também é
            <span className="hero-accent mt-1 block text-[#FF6A00]">perspectiva.</span>
          </h1>

          <p className="hero-copy mt-7 max-w-[520px] text-[15px] leading-7 text-white/75 sm:text-base">
            Streetwear autoral construído entre arquitetura, movimento e identidade. Mude o ângulo. Encontre outro lado.
          </p>

          <div className="hero-actions mt-10 flex flex-wrap gap-3">
            <Link
              href="#catalogo"
              className="group inline-flex h-12 items-center gap-4 bg-white px-6 text-[11px] font-black uppercase tracking-[0.15em] text-[#111] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0057FF] hover:text-white"
            >
              Ver coleção
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#manifesto"
              className="group inline-flex h-12 items-center gap-3 border border-white/45 px-6 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#111]"
            >
              Conhecer a marca
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-5 z-20 hidden items-end gap-3 text-white md:flex lg:right-10">
        <div className="mb-1 text-right">
          <p className="text-[8px] font-bold uppercase tracking-[0.26em] text-white/45">Angle mode</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em]">Another side</p>
        </div>
        <div className="flex border border-white/25 bg-black/25 backdrop-blur-md">
          {ANGLES.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setAngle(value)}
              className={`h-10 w-12 text-[9px] font-black tracking-[0.12em] transition-colors ${angle === value ? "bg-[#0057FF] text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`}
              aria-pressed={angle === value}
              aria-label={`Usar perspectiva de ${value} graus`}
            >
              {value}°
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-[5px] bg-[linear-gradient(90deg,#FF6A00_0_12%,#0057FF_12%_46%,rgba(255,255,255,.15)_46%_100%)]" />
    </section>
  );
};
