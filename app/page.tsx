"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Users,
  Trophy,
  Calendar,
  MapPin,
  Sparkles,
  CheckCircle2,
  Terminal,
  Zap,
  Radio,
  ArrowRight,
  Crosshair,
  AlertTriangle,
  Gamepad2,
} from "lucide-react";

type SuitColor = {
  name: string;
  hex: string;
  roleHint: string;
};

const SUIT_COLORS: SuitColor[] = [
  { name: "Impostor Red", hex: "#F45858", roleHint: "High Suspicion (Sus)" },
  { name: "Visor Cyan", hex: "#67C9F5", roleHint: "Comms Specialist" },
  { name: "Crewmate Gold", hex: "#FFD166", roleHint: "Electrical Survivor" },
  { name: "MedBay Green", hex: "#8DD982", roleHint: "Verified via Scan" },
  { name: "Cosmic Purple", hex: "#B8A5F5", roleHint: "Security Cam Watcher" },
  { name: "Skeld Cream", hex: "#FFE5D1", roleHint: "Silent Navigator" },
];

export default function SparkAmongUsLanding() {
  // Interactive Suit Customizer State
  const [selectedColor, setSelectedColor] = useState<SuitColor>(SUIT_COLORS[0]);

  // Interactive Mini-Tasks State (Contributes to Task Progress Bar)
  const [wiresFixed, setWiresFixed] = useState<boolean[]>([false, false, false]);
  const [shieldsPrimed, setShieldsPrimed] = useState(false);
  const [emergencyPinged, setEmergencyPinged] = useState(false);

  // Registration Form State
  const [formData, setFormData] = useState({
    crewName: "",
    scholarNo: "",
    discordTag: "",
    preferredMap: "The Skeld (Classic)",
  });
  const [submitted, setSubmitted] = useState(false);

  // Calculate dynamic task completion percentage
  const completedWiresCount = wiresFixed.filter(Boolean).length;
  const totalTasks = 5; // 3 wires + 1 shield prime + 1 registration
  const completedTasks =
    completedWiresCount + (shieldsPrimed ? 1 : 0) + (submitted ? 1 : 0);
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  const toggleWire = (index: number) => {
    setWiresFixed((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

    const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.crewName || !formData.scholarNo) return;

    try {
      await fetch("https://formsubmit.co/ajax/hello@slopemaps.in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Crewmate_Name: formData.crewName,
          Scholar_Number: formData.scholarNo,
          Discord_ID: formData.discordTag,
          Preferred_Map: formData.preferredMap,
          Selected_Suit: selectedColor.name,
        }),
      });
    } catch (error) {
      console.error("Submission error:", error);
    }

    setSubmitted(true);
  };


  return (
    <div className="min-h-screen bg-[#090B10] text-white relative">
      {/* Subtle Starfield Background Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(#67C9F5 1px, transparent 1px), radial-gradient(#B8A5F5 1px, #090B10 1px)",
          backgroundSize: "48px 48px",
          backgroundPosition: "0 0, 24px 24px",
        }}
      />

      {/* TOP NAVIGATION & LIVE TASK PROGRESS BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#090B10]/85 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#F45858] flex items-center justify-center shadow-[0_0_20px_rgba(244,88,88,0.5)] group-hover:scale-105 transition">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-heading text-lg font-bold tracking-wider block leading-none">
                SPARK <span className="text-[#67C9F5]">IIITB</span>
              </span>
              <span className="text-xs text-[#FFE5D1]/70 tracking-widest uppercase">
                Web Mission 01
              </span>
            </div>
          </a>

          {/* Interactive Ship Task Progress Bar */}
          <div className="hidden md:flex flex-col w-72 bg-white/5 border border-white/10 rounded-xl p-2.5">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-heading uppercase tracking-wider text-[#8DD982] flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Total Task Progress
              </span>
              <span className="font-mono font-bold text-[#FFE5D1]">
                {progressPercentage}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-[#8DD982] to-[#67C9F5] rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Nav Links & CTA */}
          <nav className="flex items-center gap-6">
            <a
              href="#briefing"
              className="hidden sm:inline-block text-sm text-white/80 hover:text-[#67C9F5] transition"
            >
              Briefing
            </a>
            <a
              href="#tasks"
              className="hidden sm:inline-block text-sm text-white/80 hover:text-[#FFD166] transition"
            >
              Ship Tasks
            </a>
            <a
              href="#register"
              className="px-4 py-2.5 rounded-xl font-heading font-bold text-sm bg-[#F45858] hover:bg-[#ff6b6b] text-white shadow-[0_0_20px_rgba(244,88,88,0.4)] hover:shadow-[0_0_30px_rgba(244,88,88,0.7)] hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              Join Lobby
              <ArrowRight className="w-4 h-4" />
            </a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION (Laptop-First 12-Column Grid) */}
      <section className="relative pt-12 pb-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission Intro & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F45858]/15 border border-[#F45858]/40 text-[#FFE5D1] text-xs font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#F45858] animate-ping" />
              EMERGENCY MEETING CALLED BY SPARK CLUB — IIIT BHOPAL
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08]">
              TRUST NO ONE IN{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F45858] via-[#FFD166] to-[#67C9F5]">
                THE SKELD.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed">
              Gear up, Crewmate! Spark Club is hosting IIIT Bhopal&apos;s ultimate
              inter-batch <strong className="text-[#FFE5D1]">Among Us</strong>{" "}
              LAN &amp; Discord Showdown. Complete your tasks, expose the
              impostors in voice chat, and claim the Championship Bounty before
              oxygen runs out.
            </p>

            {/* Quick Event Meta Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-xl p-3.5">
                <Calendar className="w-5 h-5 text-[#FFD166] shrink-0" />
                <div>
                  <div className="text-xs text-white/50">Date &amp; Time</div>
                  <div className="text-sm font-semibold text-[#FFE5D1]">
                    Sat, Oct 24 • 7:00 PM
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-xl p-3.5">
                <MapPin className="w-5 h-5 text-[#67C9F5] shrink-0" />
                <div>
                  <div className="text-xs text-white/50">Sector Location</div>
                  <div className="text-sm font-semibold text-[#FFE5D1]">
                    IIITB Main Lab &amp; Discord
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-xl p-3.5">
                <Trophy className="w-5 h-5 text-[#8DD982] shrink-0" />
                <div>
                  <div className="text-xs text-white/50">Bounty Pool</div>
                  <div className="text-sm font-semibold text-[#8DD982]">
                    ₹5,000 + Swag Drops
                  </div>
                </div>
              </div>
            </div>

            {/* Primary & Secondary Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#register"
                className="px-7 py-4 rounded-2xl font-heading font-bold text-base bg-[#F45858] hover:bg-[#ff6868] text-white shadow-[0_0_25px_rgba(244,88,88,0.45)] hover:shadow-[0_0_35px_rgba(244,88,88,0.8)] hover:-translate-y-0.5 transition-all flex items-center gap-2.5"
              >
                <Gamepad2 className="w-5 h-5" />
                Lock In Your Crewmate ID
              </a>

              <button
                type="button"
                onClick={() => setEmergencyPinged(!emergencyPinged)}
                className="px-6 py-4 rounded-2xl font-heading font-bold text-base bg-white/5 hover:bg-white/10 border border-white/15 text-[#FFE5D1] transition flex items-center gap-2"
              >
                <ShieldAlert className="w-5 h-5 text-[#FFD166]" />
                {emergencyPinged ? "Scanner Active: 2 Impostors" : "Scan Lobby Status"}
              </button>
            </div>

            {emergencyPinged && (
              <div className="p-4 rounded-xl bg-[#FFD166]/10 border border-[#FFD166]/40 text-[#FFD166] text-sm flex items-center gap-3 animate-pulse">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>
                  <strong>RADAR ALERT:</strong> 88/100 Crewmate slots filled! 2
                  unidentified Impostors detected in the IIITB server vents.
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Spaceship Porthole & Crewmate Customizer */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 p-6 sm:p-8 shadow-2xl">
              {/* Porthole Header */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#67C9F5] flex items-center gap-2">
                  <Radio className="w-4 h-4 animate-pulse" />
                  Customize Your Spacesuit
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/10 text-[#FFE5D1]">
                  {selectedColor.name}
                </span>
              </div>

              {/* Interactive SVG Crewmate Display inside Space Porthole */}
              <div className="relative h-64 rounded-2xl bg-[#06080C] border-2 border-white/10 flex flex-col items-center justify-center overflow-hidden">
                {/* Floating Planet in Background */}
                <div className="absolute top-6 right-8 w-12 h-12 rounded-full bg-[#B8A5F5]/20 border border-[#B8A5F5]/40 blur-[1px]" />
                <div className="absolute bottom-6 left-8 w-6 h-6 rounded-full bg-[#FFD166]/20" />

                {/* Dynamic SVG Crewmate (Zero external images to break!) */}
                <svg
                  viewBox="0 0 200 220"
                  className="w-40 h-44 drop-shadow-[0_12px_25px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-105"
                >
                  {/* Backpack */}
                  <rect
                    x="28"
                    y="68"
                    width="32"
                    height="82"
                    rx="14"
                    fill={selectedColor.hex}
                    stroke="#000"
                    strokeWidth="8"
                  />
                  {/* Main Body */}
                  <path
                    d="M55 60 C55 25, 145 25, 145 60 L145 155 C145 165, 138 170, 128 170 L115 170 L115 195 C115 202, 95 202, 95 195 L95 168 L85 168 L85 195 C85 202, 65 202, 65 195 L65 165 C58 165, 55 158, 55 150 Z"
                    fill={selectedColor.hex}
                    stroke="#000"
                    strokeWidth="8"
                  />
                  {/* Visor Glass */}
                  <rect
                    x="82"
                    y="52"
                    width="74"
                    height="46"
                    rx="22"
                    fill="#67C9F5"
                    stroke="#000"
                    strokeWidth="8"
                  />
                  {/* Visor Reflection Highlight */}
                  <rect
                    x="96"
                    y="60"
                    width="38"
                    height="14"
                    rx="7"
                    fill="#FFFFFF"
                    opacity="0.85"
                  />
                </svg>

                <div className="mt-2 text-xs font-mono text-[#FFE5D1]/80 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  TRAIT: {selectedColor.roleHint}
                </div>
              </div>

              {/* Suit Color Selector Swatches */}
              <div className="mt-6">
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-3">
                  Select Crewmate Suit Color (Official Spark Palette):
                </label>
                <div className="grid grid-cols-6 gap-2.5">
                  {SUIT_COLORS.map((color) => {
                    const isSelected = selectedColor.hex === color.hex;
                    return (
                      <button
                        key={color.hex}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        title={color.name}
                        className={`h-10 rounded-xl border-2 transition-all flex items-center justify-center ${
                          isSelected
                            ? "border-white scale-110 shadow-lg"
                            : "border-transparent opacity-75 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-black stroke-[3]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION BRIEFING SECTION (3-Card Hierarchy) */}
      <section
        id="briefing"
        className="py-16 border-t border-white/10 bg-white/[0.01]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FFD166]">
              // MISSION PROTOCOL
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2">
              HOW THE SHOWDOWN WORKS
            </h2>
            <p className="text-white/65 mt-2 text-sm sm:text-base">
              No complicated rules. Show up with your laptop or phone, join the
              assigned voice channel, and survive three elimination rounds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 hover:border-[#FFD166]/50 transition">
              <div className="w-12 h-12 rounded-xl bg-[#FFD166]/15 border border-[#FFD166]/30 flex items-center justify-center mb-5">
                <Users className="w-6 h-6 text-[#FFD166]" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#FFE5D1]">
                1. 10-Player Lobbies
              </h3>
              <p className="text-sm text-white/70 mt-2 leading-relaxed">
                Each lobby features 8 Crewmates and 2 Impostors. Mute during
                roaming phases; unmute only when an Emergency Meeting or body
                report is triggered.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 hover:border-[#8DD982]/50 transition">
              <div className="w-12 h-12 rounded-xl bg-[#8DD982]/15 border border-[#8DD982]/30 flex items-center justify-center mb-5">
                <Crosshair className="w-6 h-6 text-[#8DD982]" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#FFE5D1]">
                2. Points &amp; Deduction
              </h3>
              <p className="text-sm text-white/70 mt-2 leading-relaxed">
                Earn +10 points for task victories, +15 points for accurately
                ejecting an Impostor, and +25 points for pulling off a clean
                Impostor sweep.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 hover:border-[#B8A5F5]/50 transition">
              <div className="w-12 h-12 rounded-xl bg-[#B8A5F5]/15 border border-[#B8A5F5]/30 flex items-center justify-center mb-5">
                <Trophy className="w-6 h-6 text-[#B8A5F5]" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#FFE5D1]">
                3. Final Polus Arena
              </h3>
              <p className="text-sm text-white/70 mt-2 leading-relaxed">
                The top 10 highest-scoring players across IIIT Bhopal advance to
                the live-streamed Grand Finale on Polus for the cash prize and
                Spark Club fast-track perks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SHIP DIAGNOSTICS MINI-TASK SECTION */}
      <section id="tasks" className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#121624] to-[#0D111A] border border-white/15 p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="text-xs font-mono uppercase tracking-widest text-[#8DD982]">
                  // INTERACTIVE WARM-UP TASK
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold mt-2">
                  FIX ELECTRICAL WIRES &amp; PRIME SHIELDS
                </h2>
                <p className="text-sm text-white/70 mt-2">
                  Prove you aren&apos;t an Impostor faking tasks! Click all three
                  broken electrical conduits and prime the ship shields below to
                  boost the top Task Progress Bar to 80% before registering.
                </p>
              </div>

              {/* Interactive Controls */}
              <div className="flex flex-wrap items-center gap-4">
                {[
                  { label: "Red Conduit", color: "#F45858" },
                  { label: "Gold Conduit", color: "#FFD166" },
                  { label: "Cyan Conduit", color: "#67C9F5" },
                ].map((wire, idx) => (
                  <button
                    key={wire.label}
                    type="button"
                    onClick={() => toggleWire(idx)}
                    className={`px-4 py-3 rounded-xl font-mono text-xs font-bold border transition-all flex items-center gap-2 ${
                      wiresFixed[idx]
                        ? "bg-[#8DD982]/20 border-[#8DD982] text-[#8DD982]"
                        : "bg-black/40 border-white/15 text-white/70 hover:border-white/40"
                    }`}
                  >
                    <Zap
                      className="w-4 h-4"
                      style={{ color: wiresFixed[idx] ? "#8DD982" : wire.color }}
                    />
                    {wiresFixed[idx] ? `${wire.label}: FIXED` : `Connect ${wire.label}`}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setShieldsPrimed(!shieldsPrimed)}
                  className={`px-5 py-3 rounded-xl font-heading text-xs font-bold border transition-all flex items-center gap-2 ${
                    shieldsPrimed
                      ? "bg-[#67C9F5]/20 border-[#67C9F5] text-[#67C9F5]"
                      : "bg-[#B8A5F5]/15 border-[#B8A5F5]/40 text-[#FFE5D1] hover:bg-[#B8A5F5]/25"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {shieldsPrimed ? "Shields Primed (100%)" : "Prime Ship Shields"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CREWMATE REGISTRATION FORM SECTION */}
      <section id="register" className="py-16 pb-24 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-8">
          <div className="rounded-3xl bg-white/[0.04] border border-white/15 p-6 sm:p-10 shadow-2xl">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#F45858]">
                  // FINAL TASK: BOARDING PASS
                </span>
                <h2 className="font-heading text-3xl font-bold mt-1">
                  CREWMATE REGISTRATION
                </h2>
              </div>
              <div
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold text-black flex items-center gap-2"
                style={{ backgroundColor: selectedColor.hex }}
              >
                Suit Equipped: {selectedColor.name}
              </div>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#8DD982]/10 border border-[#8DD982]/40 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#8DD982] mx-auto" />
                <h3 className="font-heading text-2xl font-bold text-[#8DD982]">
                  BOARDING PASS CONFIRMED!
                </h3>
                <p className="text-sm text-[#FFE5D1]/90 max-w-md mx-auto">
                  Crewmate <strong>{formData.crewName}</strong> (Scholar No:{" "}
                  <strong>{formData.scholarNo}</strong>) has been cleared by
                  MedBay Scan in the <strong>{selectedColor.name}</strong> suit.
                  Task Progress is now at{" "}
                  <strong>{progressPercentage}%</strong>!
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono uppercase bg-white/10 hover:bg-white/20 text-white transition"
                >
                  Edit Registration Info
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/70 mb-2">
                      Crewmate Name / IGN *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Manoj_01"
                      value={formData.crewName}
                      onChange={(e) =>
                        setFormData({ ...formData, crewName: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-[#67C9F5] transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-white/70 mb-2">
                      IIITB Scholar Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 26U020146"
                      value={formData.scholarNo}
                      onChange={(e) =>
                        setFormData({ ...formData, scholarNo: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-[#67C9F5] transition text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/70 mb-2">
                      Discord Username *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. crewmate#0001"
                      value={formData.discordTag}
                      onChange={(e) =>
                        setFormData({ ...formData, discordTag: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-[#67C9F5] transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-white/70 mb-2">
                      Preferred Map Vote
                    </label>
                    <select
                      value={formData.preferredMap}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferredMap: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#67C9F5] transition text-sm"
                    >
                      <option value="The Skeld (Classic)">
                        The Skeld (Classic)
                      </option>
                      <option value="Polus Outpost">Polus Outpost</option>
                      <option value="MIRA HQ">MIRA HQ</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-heading font-bold text-base bg-[#F45858] hover:bg-[#ff6b6b] text-white shadow-[0_0_25px_rgba(244,88,88,0.4)] hover:shadow-[0_0_35px_rgba(244,88,88,0.75)] transition-all flex items-center justify-center gap-2"
                >
                  Confirm Boarding &amp; Complete Mission
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            Built for <strong className="text-[#FFE5D1]">SPARK Club — IIIT Bhopal</strong>{" "}
            • Web Mission 01
          </p>
          <p className="font-mono text-[#8DD982]">
            SECURITY SCORE: 100% • 0 SECRETS EXPOSED
          </p>
        </div>
      </footer>
    </div>
  );
}
