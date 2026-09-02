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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full shadow-2xl flex flex-col relative border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xl z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-lime-100 text-[#65a30d] border border-lime-200 flex items-center justify-center font-bold shadow-xs">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black font-['Outfit'] text-slate-950 flex items-center gap-2">
                <span>Code QR 242Agro</span>
                <span className="text-[10px] font-bold bg-lime-100 text-[#65a30d] border border-lime-300 px-2 py-0.5 rounded-full">
                  Netlify Live
                </span>
              </h3>
              <p className="text-xs text-slate-600">Scannez pour accéder au site depuis un smartphone</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-950 hover:bg-slate-200 transition-all cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 text-center flex flex-col items-center">
          
          {/* Style Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-2xl">
            <button
              onClick={() => setQrTheme("light")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                qrTheme === "light"
                  ? "bg-white text-slate-950 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Imprimable (Blanc)
            </button>
            <button
              onClick={() => setQrTheme("dark")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                qrTheme === "dark"
                  ? "bg-[#84cc16] text-slate-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Mode Sombre
            </button>
            <button
              onClick={() => setQrTheme("emerald")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                qrTheme === "emerald"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Vert Émeraude
            </button>
          </div>

          {/* QR Code Container */}
          <div
            ref={canvasContainerRef}
            className={`p-6 rounded-3xl border ${themeConfig.wrapperBorder} ${themeConfig.wrapperBg} transition-all relative group flex items-center justify-center shadow-md`}
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
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-mono text-[#65a30d] font-bold truncate pl-2 select-all">
                {url}
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-xl bg-lime-100 hover:bg-lime-200 text-[#65a30d] border border-lime-300 font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#65a30d]" />
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
            
            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-[#65a30d]" />
              <span>Compatible avec l'appareil photo de tous les smartphones iPhone et Android</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full pt-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#84cc16] hover:bg-lime-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-lime-500/20 border-2 border-lime-400 transition-all disabled:opacity-50 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger l'Affiche HD (PNG)</span>
            </button>

            <button
              onClick={handleShare}
              className="w-full py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer border border-slate-200 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Partager le lien</span>
            </button>
          </div>

          {/* Print Notice for Flyers */}
          <div className="p-3.5 rounded-2xl bg-lime-50 border border-lime-200 text-slate-700 text-[11px] flex items-center gap-2.5 text-left w-full">
            <Printer className="w-4 h-4 text-[#65a30d] shrink-0" />
            <span>
              <strong className="text-slate-900">Pour vos supports imprimés :</strong> Téléchargez l'affiche haute définition pour vos kakémonos, flyers ou cartes de visite à Pointe-Noire.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
