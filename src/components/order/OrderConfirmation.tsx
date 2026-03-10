import { Link } from "react-router-dom";
import { Plan } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle, Users, MapPin, Copy, Calendar,
  Download, Phone, Mail, CreditCard, User,
} from "lucide-react";
import { useState } from "react";

const DOC_LABELS: Record<string, string> = {
  cc: "C.C.", ce: "C.E.", passport: "Pasaporte", ti: "T.I.",
};

const formatCOP = (v: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency", currency: "COP", maximumFractionDigits: 0,
  }).format(v);

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("es-CO", {
    day: "2-digit", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`));

const calcAge = (birthDate: string): number => {
  const [y, m, d] = birthDate.split("-").map(Number);
  const today = new Date();
  let age = today.getFullYear() - y;
  if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) age--;
  return age;
};

interface OrderConfirmationProps {
  plan: Plan;
  numTourists: number;
  reservationCode: string;
  turistas?: any[];
  subtotal?: number;
  impuestos?: number;
  total?: number;
  selectedDate?: string | null;
  cobrarIva?: boolean;
  porcentajeIva?: number;
}

export default function OrderConfirmation({
  plan,
  numTourists,
  reservationCode,
  turistas = [],
  subtotal = 0,
  impuestos = 0,
  total = 0,
  selectedDate,
  cobrarIva = false,
  porcentajeIva = 19,
}: OrderConfirmationProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(reservationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const docLabel = (type: string, number: string) => {
      const label = DOC_LABELS[type] || type || "";
      return label && number ? `${label} ${number}` : number || "";
    };

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Reserva ${reservationCode} — Vive Silver</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 680px; margin: 40px auto; color: #2d3748; padding: 0 24px; }
    .header { border-bottom: 3px solid #3D4A3A; padding-bottom: 16px; margin-bottom: 24px; }
    .header h1 { color: #3D4A3A; font-size: 22px; font-weight: 700; }
    .header p { color: #718096; font-size: 13px; margin-top: 4px; }
    .code-box { background: #f5f0e8; border: 1px solid #e2d9c8; border-radius: 10px; padding: 14px 20px; margin: 20px 0; }
    .code-box .label { font-size: 12px; color: #718096; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
    .code-box .code { font-family: monospace; font-size: 26px; font-weight: 800; color: #3D4A3A; letter-spacing: 3px; }
    .section { margin: 24px 0; }
    .section-title { font-size: 12px; font-weight: 700; color: #718096; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 12px; }
    .row { display: flex; justify-content: space-between; align-items: flex-start; padding: 5px 0; font-size: 14px; gap: 12px; }
    .row .lbl { color: #718096; flex-shrink: 0; }
    .row .val { font-weight: 500; color: #2d3748; text-align: right; }
    .tourist-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; margin-bottom: 8px; font-size: 13px; }
    .tourist-card .name { font-weight: 600; color: #3D4A3A; margin-bottom: 2px; }
    .tourist-card .doc { color: #718096; }
    .payment-box { background: #f7fafc; border-radius: 10px; padding: 14px 18px; }
    .payment-row { display: flex; justify-content: space-between; padding: 5px 0; font-size: 14px; }
    .payment-row.total { font-weight: 700; font-size: 16px; border-top: 2px solid #3D4A3A; padding-top: 10px; margin-top: 6px; color: #3D4A3A; }
    .contact-box { background: #f0f5ee; border: 1px solid #c9d9bf; border-radius: 10px; padding: 14px 18px; }
    .contact-box .contact-title { font-weight: 700; color: #3D4A3A; margin-bottom: 8px; font-size: 14px; }
    .contact-item { display: flex; align-items: center; gap: 8px; font-size: 14px; padding: 3px 0; color: #2d3748; }
    .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 14px; font-size: 11px; color: #a0aec0; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Vive Silver — Comprobante de Reserva</h1>
    <p>Generado el ${new Date().toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" })}</p>
  </div>

  <div class="code-box">
    <div class="label">Código de reserva</div>
    <div class="code">${reservationCode}</div>
  </div>

  <div class="section">
    <div class="section-title">Plan reservado</div>
    <div class="row"><span class="lbl">Plan</span><span class="val">${plan.title}</span></div>
    ${plan.location ? `<div class="row"><span class="lbl">Lugar</span><span class="val">${plan.location}</span></div>` : ""}
    ${plan.category ? `<div class="row"><span class="lbl">Categoría</span><span class="val">${plan.category}</span></div>` : ""}
    ${selectedDate ? `<div class="row"><span class="lbl">Fecha</span><span class="val">${formatDate(selectedDate)}</span></div>` : ""}
    <div class="row"><span class="lbl">Personas</span><span class="val">${numTourists}</span></div>
  </div>

  ${plan.description ? `<div class="section">
    <div class="section-title">Descripción del plan</div>
    <p style="font-size:14px; color:#4a5568; line-height:1.6;">${plan.description}</p>
  </div>` : ""}

  ${plan.includes && plan.includes.length > 0 ? `<div class="section">
    <div class="section-title">Lo que incluye</div>
    <ul style="list-style:none; font-size:14px; color:#4a5568;">
      ${plan.includes.map((item: string) => `<li style="padding: 3px 0;">✓ ${item}</li>`).join("")}
    </ul>
  </div>` : ""}

  ${
    turistas.length > 0
      ? `<div class="section">
    <div class="section-title">Turistas (${turistas.length})</div>
    ${turistas
      .map(
        (t, i) => `
    <div class="tourist-card">
      <div class="name">Turista ${i + 1}: ${t.name || "—"}</div>
      ${t.documentType || t.documentNumber ? `<div class="doc">${docLabel(t.documentType, t.documentNumber)}</div>` : ""}
      ${t.birthDate ? `<div class="doc">Nacimiento: ${formatDate(t.birthDate)} · ${calcAge(t.birthDate)} años</div>` : ""}
      ${t.city ? `<div class="doc">Ciudad: ${t.city}</div>` : ""}
    </div>`
      )
      .join("")}
  </div>`
      : ""
  }

  <div class="section">
    <div class="section-title">Resumen de pago</div>
    <div class="payment-box">
      <div class="payment-row"><span>Subtotal</span><span>${formatCOP(subtotal)}</span></div>
      ${cobrarIva ? `<div class="payment-row"><span>IVA (${porcentajeIva}%)</span><span>${formatCOP(impuestos)}</span></div>` : ""}
      <div class="payment-row total"><span>Total pagado</span><span>${formatCOP(total)}</span></div>
    </div>
  </div>

  ${
    plan.providerPhone || plan.providerEmail
      ? `<div class="section">
    <div class="section-title">Contacto del proveedor</div>
    <div class="contact-box">
      <div class="contact-title">Puedes comunicarte directamente:</div>
      ${plan.providerPhone ? `<div class="contact-item">📱 ${plan.providerPhone}</div>` : ""}
      ${plan.providerEmail ? `<div class="contact-item">✉️ ${plan.providerEmail}</div>` : ""}
    </div>
  </div>`
      : ""
  }

  <div class="footer">Este documento es un comprobante de tu reserva en Vive Silver. Consérvalo para cualquier consulta.</div>
</body>
</html>`;

    const w = window.open("", "_blank", "width=750,height=750");
    if (!w) return;
    w.document.write(html);
    w.document.close();
    setTimeout(() => w.print(), 400);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sage/20 mb-6">
          <CheckCircle className="w-12 h-12 text-sage" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-primary mb-2">¡Reserva recibida!</h1>
        <p className="text-stormy text-lg">Gracias por confiar en Vive Silver.</p>
        <p className="text-stormy/70 mt-2 text-sm">
          En las próximas 24–48 horas te contactaremos para afinar detalles.
        </p>
      </div>

      {/* Reservation code */}
      <div className="bg-cream border border-cream/80 rounded-xl p-5 mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs text-stormy/60 uppercase tracking-wider mb-1">Código de reserva</p>
          <span className="text-2xl font-bold text-primary tracking-wider font-mono">
            {reservationCode}
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={copyCode} className="text-golden">
          <Copy className="w-4 h-4 mr-1" />
          {copied ? "Copiado!" : "Copiar"}
        </Button>
      </div>

      {/* Plan card */}
      <Card className="overflow-hidden mb-5">
        {plan.image && (
          <div className="relative h-44">
            <img src={plan.image} alt={plan.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              {plan.category && (
                <span className="inline-block bg-sage text-white px-3 py-1 rounded-full text-xs font-semibold mb-2">
                  {plan.category}
                </span>
              )}
              <h2 className="text-lg font-serif font-bold text-white">{plan.title}</h2>
            </div>
          </div>
        )}
        {!plan.image && (
          <div className="px-6 pt-5">
            <h2 className="text-lg font-semibold text-primary">{plan.title}</h2>
          </div>
        )}

        <CardContent className="p-5 space-y-2.5">
          {plan.location && (
            <div className="flex items-center gap-2.5 text-sm text-stormy">
              <MapPin className="w-4 h-4 text-golden flex-shrink-0" />
              <span>{plan.location}</span>
            </div>
          )}
          {selectedDate && (
            <div className="flex items-center gap-2.5 text-sm text-stormy">
              <Calendar className="w-4 h-4 text-golden flex-shrink-0" />
              <span>{formatDate(selectedDate)}</span>
            </div>
          )}
          <div className="flex items-center gap-2.5 text-sm text-stormy">
            <Users className="w-4 h-4 text-golden flex-shrink-0" />
            <span>{numTourists} persona{numTourists !== 1 ? "s" : ""}</span>
          </div>
        </CardContent>
      </Card>

      {/* Plan description */}
      {plan.description && (
        <Card className="mb-5">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
              Descripción del plan
            </h3>
            <p className="text-sm text-stormy leading-relaxed">{plan.description}</p>
          </CardContent>
        </Card>
      )}

      {/* What's included */}
      {plan.includes && plan.includes.length > 0 && (
        <Card className="mb-5">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
              Lo que incluye
            </h3>
            <ul className="space-y-1.5">
              {plan.includes.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stormy">
                  <span className="text-sage mt-0.5 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Tourists */}
      {turistas.length > 0 && (
        <Card className="mb-5">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
              Turistas ({turistas.length})
            </h3>
            <div className="space-y-2">
              {turistas.map((t, i) => (
                <div key={i} className="flex items-start gap-3 bg-cream/60 rounded-lg p-3">
                  <User className="w-4 h-4 text-golden flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-primary">
                      Turista {i + 1}: {t.name || "—"}
                    </p>
                    {(t.documentType || t.documentNumber) && (
                      <p className="text-stormy/70 flex items-center gap-1 mt-0.5">
                        <CreditCard className="w-3 h-3" />
                        {DOC_LABELS[t.documentType] || t.documentType || ""}{" "}
                        {t.documentNumber || ""}
                      </p>
                    )}
                    {t.birthDate && (
                      <p className="text-stormy/60 text-xs mt-0.5">
                        Nac. {formatDate(t.birthDate)} · <span className="font-medium text-stormy/80">{calcAge(t.birthDate)} años</span>
                      </p>
                    )}
                    {t.city && (
                      <p className="text-stormy/60 text-xs mt-0.5">
                        Ciudad de residencia: <span className="font-medium text-stormy/80">{t.city}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment summary */}
      {total > 0 && (
        <Card className="mb-5">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
              Resumen de pago
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-stormy">
                <span>Subtotal</span>
                <span>{formatCOP(subtotal)}</span>
              </div>
              {cobrarIva && (
                <div className="flex justify-between text-sm text-stormy">
                  <span>IVA ({porcentajeIva}%)</span>
                  <span>{formatCOP(impuestos)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-primary border-t border-cream pt-2 mt-1">
                <span>Total pagado</span>
                <span className="text-lg">{formatCOP(total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Provider contact */}
      {(plan.providerPhone || plan.providerEmail) && (
        <Card className="mb-6 border-sage/30 bg-sage/5">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
              Contacto del proveedor
            </h3>
            <p className="text-xs text-stormy/70 mb-3">
              Puedes comunicarte directamente con el proveedor de este plan:
            </p>
            {plan.providerPhone && (
              <div className="flex items-center gap-2.5 text-sm text-stormy mb-2">
                <Phone className="w-4 h-4 text-sage flex-shrink-0" />
                <span className="font-medium">{plan.providerPhone}</span>
              </div>
            )}
            {plan.providerEmail && (
              <div className="flex items-center gap-2.5 text-sm text-stormy">
                <Mail className="w-4 h-4 text-sage flex-shrink-0" />
                <span className="font-medium">{plan.providerEmail}</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          variant="outline"
          onClick={handleDownload}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Descargar / Imprimir comprobante
        </Button>
        <Link to="/planes">
          <Button size="default" className="w-full sm:w-auto px-8">
            Volver a planes
          </Button>
        </Link>
        <p className="text-stormy text-sm">
          ¿Prefieres hablar ahora?{" "}
          <a
            href="https://wa.me/573116606105"
            target="_blank"
            rel="noopener noreferrer"
            className="text-golden font-medium hover:underline"
          >
            Escríbenos por WhatsApp.
          </a>
        </p>
      </div>
    </div>
  );
}
