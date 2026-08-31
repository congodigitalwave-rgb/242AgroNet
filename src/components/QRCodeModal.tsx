import React, { useState, useRef } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import {
  QrCode,
  Download,
  Copy,
  Check,
  ExternalLink,
  Share2,
  X,
  Sparkles,
  Smartphone,
  Printer,
  ShieldCheck
} from "lucide-react";
import { CONTACT_INFO } from "../data";
import { Logo242Agro } from "./Logo242Agro";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [qrTheme, setQrTheme] = useState<"light" | "dark" | "emerald">("light");
  const [downloading, setDownloading] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const url = CONTACT_INFO.websiteUrl || "https://242agropn.netlify.app/";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "242Agro - Agriculture Urbaine Hors-Sol à Pointe-Noire",
          text: "Découvrez 242Agro, la plateforme d'agriculture urbaine hors-sol et d'élevage intégré clé en main à Pointe-Noire.",
          url: url,
        });
      } catch (err) {
        console.log("Share dismissed", err);
      }
    } else {
      handleCopy();
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    try {
      // Find the canvas rendered by QRCodeCanvas
      const qrCanvas = canvasContainerRef.current?.querySelector("canvas");
      if (!qrCanvas) return;

      // Create a high-res marketing card canvas
      const cardWidth = 1000;
      const cardHeight = 1300;
      const exportCanvas = document.createElement("canvas");
      exportCanvas.width = cardWidth;
      exportCanvas.height = cardHeight;
      const ctx = exportCanvas.getContext("2d");

      if (!ctx) return;

      // Draw background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, cardHeight);
      bgGrad.addColorStop(0, "#08101e");
      bgGrad.addColorStop(1, "#020617");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, cardWidth, cardHeight);

      // Border outline with rounded corners
      ctx.lineWidth = 8;
      ctx.strokeStyle = "#10b981";
      ctx.strokeRect(30, 30, cardWidth - 60, cardHeight - 60);

      // Inner subtle border
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.strokeRect(40, 40, cardWidth - 80, cardHeight - 80);

      // Header Brand Text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 56px system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("242Agro", cardWidth / 2, 130);

      // Subtitle
      ctx.fillStyle = "#34d399";
      ctx.font = "bold 26px system-ui, -apple-system, sans-serif";
      ctx.fillText("AGRICULTURE URBAINE HORS-SOL & ÉLEVAGE", cardWidth / 2, 180);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "22px system-ui, -apple-system, sans-serif";
      ctx.fillText("Pointe-Noire • République du Congo", cardWidth / 2, 220);

      // Draw white container for QR code
      const qrContainerSize = 640;
      const qrContainerX = (cardWidth - qrContainerSize) / 2;
      const qrContainerY = 270;

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.roundRect(qrContainerX, qrContainerY, qrContainerSize, qrContainerSize, 36);
      ctx.fill();

      // Shadow / Ring for QR box
      ctx.lineWidth = 10;
      ctx.strokeStyle = "#e2e8f0";
      ctx.stroke();

      // Draw the QR Code inside
      const qrDrawSize = 540;
      const qrDrawOffset = (qrContainerSize - qrDrawSize) / 2;
      ctx.drawImage(
        qrCanvas,
        qrContainerX + qrDrawOffset,
        qrContainerY + qrDrawOffset,
        qrDrawSize,
        qrDrawSize
      );

      // Instructions bottom
      ctx.fillStyle = "#f8fafc";
      ctx.font = "bold 34px system-ui, -apple-system, sans-serif";
      ctx.fillText("Scannez pour visiter le site & simuler votre devis", cardWidth / 2, 980);

      // URL text pill
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.beginPath();
      ctx.roundRect(cardWidth / 2 - 280, 1030, 560, 60, 30);
      ctx.fill();
      ctx.strokeStyle = "rgba(52, 211, 153, 0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#6ee7b7";
      ctx.font = "bold 26px monospace";
      ctx.fillText("https://242agropn.netlify.app", cardWidth / 2, 1070);

      // Contact phone
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "24px system-ui, -apple-system, sans-serif";
      ctx.fillText("WhatsApp & Téléphone : +242 06 874 22 77", cardWidth / 2, 1160);

      // Convert to downloadable link
      const dataUrl = exportCanvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.download = "242Agro_QRCode_PointeNoire.png";
      a.href = dataUrl;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Error generating QR download", err);
    } finally {
      setDownloading(false);
    }
  };

  const getThemeProps = () => {
    switch (qrTheme) {
      case "dark":
        return {
          fgColor: "#10b981",
          bgColor: "#090d16",
          wrapperBg: "bg-slate-900",
          wrapperBorder: "border-emerald-500/40",
        };
      case "emerald":
        return {
          fgColor: "#064e3b",
          bgColor: "#ecfdf5",
          wrapperBg: "bg-emerald-50",
          wrapperBorder: "border-emerald-300",
        };
      case "light":
      default:
        return {
          fgColor: "#090d16",
          bgColor: "#ffffff",
          wrapperBg: "bg-white",
          wrapperBorder: "border-slate-200 shadow-2xl",
        };
    }
  };

  const themeConfig = getThemeProps();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div className="bg-slate-900/95 backdrop-blur-2xl border border-white/20 text-white rounded-3xl max-w-lg w-full shadow-2xl shadow-black/80 flex flex-col relative ring-1 ring-white/10 overflow-hidden">
        
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-20 bg-emerald-500/20 blur-3xl -z-10 pointer-events-none" />

        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-slate-900/90 backdrop-blur-xl z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-emerald-950/40 border border-emerald-300/40">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Outfit'] text-white flex items-center gap-2">
                <span>Code QR 242Agro</span>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Netlify Live
                </span>
              </h3>
              <p className="text-xs text-slate-300">Scannez pour accéder au site depuis un smartphone</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 text-center flex flex-col items-center">
          
          {/* Style Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-2xl">
            <button
              onClick={() => setQrTheme("light")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                qrTheme === "light"
                  ? "bg-white text-slate-900 shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Imprimable (Blanc)
            </button>
            <button
              onClick={() => setQrTheme("dark")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                qrTheme === "dark"
                  ? "bg-emerald-500 text-slate-950 shadow-md font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Mode Sombre
            </button>
            <button
              onClick={() => setQrTheme("emerald")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                qrTheme === "emerald"
                  ? "bg-emerald-600 text-white shadow-md font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Vert Émeraude
            </button>
          </div>

          {/* QR Code Container */}
          <div
            ref={canvasContainerRef}
            className={`p-6 rounded-3xl border ${themeConfig.wrapperBorder} ${themeConfig.wrapperBg} transition-all relative group flex items-center justify-center`}
          >
            {/* The Canvas rendered for export */}
            <QRCodeCanvas
              value={url}
              size={240}
              level="H"
              includeMargin={false}
              fgColor={themeConfig.fgColor}
              bgColor={themeConfig.bgColor}
              imageSettings={{
                src: "/logo242agro.svg",
                height: 48,
                width: 48,
                excavate: true,
              }}
            />
          </div>

          {/* URL Pill & Copy Action */}
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
              <span className="font-mono text-emerald-300 truncate pl-2 select-all">
                {url}
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>
            
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Compatible avec l'appareil photo de tous les smartphones iPhone et Android</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full pt-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-emerald-950/40 border border-emerald-400/30 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger l'Affiche HD (PNG)</span>
            </button>

            <button
              onClick={handleShare}
              className="w-full py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer border border-white/10 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Partager le lien</span>
            </button>
          </div>

          {/* Print Notice for Flyers */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-slate-300 text-[11px] flex items-center gap-2.5 text-left w-full">
            <Printer className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Pour vos supports imprimés :</strong> Téléchargez l'affiche haute définition pour vos kakémonos, flyers ou cartes de visite à Pointe-Noire.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
