/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Circle, 
  Globe, 
  Rotate3d, 
  Layers, 
  ArrowRight, 
  Binary, 
  Compass,
  Link as LinkIcon,
  ChevronRight,
  Info
} from 'lucide-react';
import katex from 'katex';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Math = ({ formula, displayMode = false, className }: { formula: string; displayMode?: boolean; className?: string }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      katex.render(formula, containerRef.current, {
        throwOnError: false,
        displayMode,
      });
    }
  }, [formula, displayMode]);

  return <span ref={containerRef} className={cn("inline-block", className)} />;
};

const SectionHeading = ({ children, icon: Icon, label, index }: { children: React.ReactNode; icon?: any; label: string; index?: string }) => (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-4">
      {index && <span className="font-mono text-white bg-indigo-600 px-2 py-0.5 text-xs font-bold">{index}</span>}
      <span className="technical-label">{label}</span>
    </div>
    <h2 className="text-3xl md:text-5xl font-bold italic tracking-tight font-serif" style={{ color: 'var(--text-main)' }}>{children}</h2>
  </div>
);

const Card = ({ children, className, title }: { children: React.ReactNode; className?: string; title?: string }) => (
  <div className={cn("glass-card p-6 md:p-8", className)}>
    {title && <h3 className="text-xl font-medium mb-4 font-mono tracking-tight" style={{ color: 'var(--text-main)' }}>{title}</h3>}
    {children}
  </div>
);

// --- Sections ---

const App = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen font-sans geometric-grid transition-colors duration-300">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-50 accent-glow"
        style={{ scaleX }}
      />

      <div className="max-w-5xl mx-auto px-6 py-20 space-y-32">
        
        {/* HERO SECTION */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end border-b pb-10 mb-20"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div className="space-y-4">
            <p className="technical-label">From Projective Geometry to Physical Rotation</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter font-serif italic" style={{ color: 'var(--text-main)' }}>
              RP<sup>n</sup> Visualized
            </h1>
          </div>
          <div className="hidden md:block text-right font-mono text-[10px] leading-tight uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Manifold Theory / SO(3) Topology<br />
            Visual Guide v1.02
          </div>
        </motion.header>

        <section className="max-w-3xl mx-auto text-center space-y-8">
          <p className="text-2xl leading-relaxed font-serif italic" style={{ color: 'var(--text-main)', opacity: 0.8 }}>
            "在数学和物理中，当我们无法直觉地理解一个高维流形时，从低维的类比开始构筑图像是最稳妥的方法。"
          </p>
          <div className="h-px w-24 bg-indigo-500 mx-auto" />
        </section>

        {/* INTRODUCTION */}
        <section className="space-y-12">
          <SectionHeading label="Core Concept" icon={Info} index="01">什么是实投影空间？</SectionHeading>
          <Card className="border-l-4" style={{ borderLeftColor: 'var(--accent-color)' }}>
            <p className="text-xl leading-relaxed font-serif" style={{ color: 'var(--text-main)', opacity: 0.9 }}>
              简单来说，<Math formula="RP^n" /> 是把 <Math formula="n+1" /> 维空间中所有<span className="font-bold italic font-serif" style={{ color: 'var(--accent-color)' }}>“经过原点的直线”</span>看作一个整体而构成的集合。
            </p>
          </Card>
        </section>

        {/* RP1 SECTION */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          <SectionHeading label="Dimension 1" icon={Circle} index="02">RP¹：从直线到圆环</SectionHeading>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                想象一个二维平面 <Math formula="\mathbb{R}^2" />。我们要构造 <Math formula="RP^1" />。
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--accent-color)' }} />
                  <p style={{ color: 'var(--text-main)', opacity: 0.8 }}>每一条经过原点的直线，都可以由它与 <Math formula="x" /> 轴的夹角 <Math formula="\phi" /> 来决定。</p>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--accent-color)' }} />
                  <p style={{ color: 'var(--text-main)', opacity: 0.8 }}>
                    当夹角达到 <Math formula="\pi" /> 时，这条直线其实又回到了夹角为 <Math formula="0" /> 的状态。
                  </p>
                </li>
              </ul>
              <Card title="Identification (粘贴法)" className="bg-indigo-600/5">
                <p className="math-font text-xs mb-2" style={{ color: 'var(--accent-color)' }}>x ~ λx for λ ∈ R \ {'{0}'}</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  拿一段线段 <Math formula="[0, \pi]" />，将左端点 <Math formula="0" /> 和右端点 <Math formula="\pi" /> 粘合。
                </p>
              </Card>
            </div>
            <div className="flex flex-col items-center justify-center p-8 border glass-card space-y-6">
              <div className="text-center">
                <span className="technical-label">Topology Result</span>
                <div className="text-4xl font-bold italic font-serif mt-2" style={{ color: 'var(--text-main)' }}>S¹ (Circle)</div>
              </div>
              <div className="flex justify-center py-4">
                <svg width="160" height="160" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" className="text-indigo-400 opacity-50" />
                  <circle cx="50" cy="10" r="3" fill="currentColor" className="text-indigo-500" />
                  <circle cx="50" cy="90" r="3" fill="currentColor" className="text-indigo-500" />
                  <path d="M50 10 C 80 10, 80 90, 50 90" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-600" />
                  <text x="55" y="12" fill="currentColor" fontSize="6" className="font-mono text-indigo-500">0</text>
                  <text x="55" y="92" fill="currentColor" fontSize="6" className="font-mono text-indigo-500">π</text>
                </svg>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="section-line" />

        {/* RP2 SECTION */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          <SectionHeading label="Dimension 2" icon={Globe} index="03">RP²：圆盘粘合</SectionHeading>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <p className="leading-relaxed text-lg italic font-serif" style={{ color: 'var(--text-muted)' }}>
                考虑三维空间中的直线。对跖点等值 <Math formula="P \sim -P" />。
              </p>
              <div className="grid gap-4">
                <Card title="Mapping" className="p-4 md:p-6">
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>每一条穿过原点的直线都会在球面上留下两个交点（对跖点）。</p>
                </Card>
                <Card title="Definition" className="p-4 md:p-6">
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}><Math formula="RP^2" /> 就是把球面上所有相对的两个点看作同一个点。</p>
                </Card>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-8 border glass-card space-y-6">
              <div className="text-center">
                <span className="technical-label">Shape Representation</span>
                <div className="text-2xl font-bold italic font-serif mt-2" style={{ color: 'var(--text-main)' }}>Identification Disk</div>
              </div>
              <div className="flex justify-center py-4">
                <svg width="160" height="160" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="currentColor" stroke="currentColor" strokeWidth="1" className="text-indigo-500/10 stroke-indigo-500" />
                  <path d="M10 50 L 90 50" stroke="currentColor" strokeWidth="1" className="text-slate-400 opacity-20" />
                  <path d="M50 10 L 50 90" stroke="currentColor" strokeWidth="1" className="text-slate-400 opacity-20" />
                  <circle cx="21" cy="21" r="2.5" fill="currentColor" className="text-indigo-400" />
                  <circle cx="79" cy="79" r="2.5" fill="currentColor" className="text-indigo-400" />
                  <path d="M24 24 L 76 76" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="text-indigo-500" />
                  <text x="15" y="18" fill="currentColor" fontSize="6" className="font-mono text-slate-500">P</text>
                  <text x="80" y="88" fill="currentColor" fontSize="6" className="font-mono text-slate-500">-P</text>
                </svg>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="section-line" />

        {/* RP3 SECTION */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          <SectionHeading label="Dimension 3" icon={Layers} index="04">RP³ 与旋转空间 SO(3)</SectionHeading>
          
          <div className="border border-indigo-600 bg-indigo-950/10 p-10 accent-glow space-y-8 transition-colors duration-300">
            <p className="text-2xl font-bold italic font-serif" style={{ color: 'var(--text-main)' }}>
              SO(3) 的拓扑结构正好就是 RP³。
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>Vector Form</div>
                  <h4 className="text-xl font-bold font-mono uppercase tracking-tight" style={{ color: 'var(--text-main)' }}>Rodrigues Vector</h4>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    每一个旋转可以用一个矢量 <Math formula="\boldsymbol{\theta}" /> 表示：轴为方向，角为模。
                  </p>
                </div>
                
                <div className="space-y-4 border-l pl-8" style={{ borderLeftColor: 'var(--border-color)' }}>
                  <h4 className="text-lg font-bold uppercase italic tracking-tighter" style={{ color: 'var(--text-main)' }}>Surface Identity</h4>
                  <p className="font-bold text-xl italic font-serif" style={{ color: 'var(--accent-color)' }}>
                    Rotation(n, π) ≡ Rotation(-n, π)
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    在球面上，每一个点和它正直对面的点代表相同的物理旋转。
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--accent-color)' }}>3D Manifold Visual</div>
                <div className="flex justify-center p-6 border glass-card relative overflow-hidden">
                  <svg width="180" height="180" viewBox="0 0 100 100">
                    <defs>
                      <radialGradient id="ballGradient">
                        <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#000" stopOpacity="0.1" />
                      </radialGradient>
                    </defs>
                    <circle cx="50" cy="50" r="40" fill="url(#ballGradient)" stroke="currentColor" strokeWidth="2" className="text-indigo-500" />
                    <ellipse cx="50" cy="50" rx="40" ry="12" fill="none" stroke="currentColor" strokeWidth="1" className="text-white opacity-20" />
                    <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="text-white opacity-30" />
                    <circle cx="50" cy="10" r="3" fill="currentColor" className="text-pink-500" />
                    <circle cx="50" cy="90" r="3" fill="currentColor" className="text-pink-500" />
                    <path d="M50 10 Q 75 10 75 50 T 50 90" fill="none" stroke="currentColor" strokeWidth="1" className="text-pink-400 opacity-40" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CONNECTION SECTION */}
        <section className="pt-32 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <footer className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-3 space-y-6">
              <h3 className="technical-label">The Quaternion Connection (旋量与双覆盖)</h3>
              <p className="text-lg leading-relaxed font-serif" style={{ color: 'var(--text-muted)' }}>
                四元数空间 <Math formula="S^3" /> 是 <Math formula="SO(3)" /> 的双覆盖。
                由于 <Math formula="q" /> 与 <Math formula="-q" /> 对应同一个旋转，物理系统在 <Math formula="RP^3" /> 中旋转 360° 回到原点时，其内在相位在 <Math formula="S^3" /> 中仅移动了 180°。这就是费米子旋转 720° 才能回到初始态的几何本质。
              </p>
            </div>
            <div className="md:col-span-1 border-l pl-6 flex flex-col justify-center text-center" style={{ borderLeftColor: 'var(--border-color)' }}>
              <div className="text-6xl font-serif italic" style={{ color: 'var(--text-main)' }}>2 : 1</div>
              <div className="text-[10px] uppercase tracking-tighter font-mono mt-2" style={{ color: 'var(--text-muted)' }}>Mapping Ratio S³ → RP³</div>
            </div>
          </footer>
        </section>

        {/* FINAL FOOTER */}
        <footer className="py-10 text-center">
          <p className="text-[10px] font-mono tracking-[0.5em] uppercase" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
            Visual Guide v1.02 / Manifold Visualization Project
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
