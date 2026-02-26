import { useState, useEffect, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getReviewsForPlan, createReview } from "@/lib/api";
import type { ReviewData } from "@/lib/api";

const HCAPTCHA_SITE_KEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY || "";

function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
}: {
  value: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
  size?: "sm" | "md";
}) {
  const [hover, setHover] = useState(0);
  const sizeClass = size === "sm" ? "w-4 h-4" : "w-7 h-7";

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          className={`${readonly ? "cursor-default" : "cursor-pointer"} transition-colors`}
        >
          <svg
            className={`${sizeClass} ${
              star <= (hover || value)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 fill-gray-300"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: ReviewData }) {
  const initial = review.nombre.charAt(0).toUpperCase();
  const date = new Date(review.createdAt).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex gap-4 py-4 border-b last:border-b-0">
      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm flex-shrink-0">
        {initial}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-sm text-gray-900">{review.nombre}</span>
          <StarRating value={review.rating} readonly size="sm" />
          <span className="text-xs text-gray-400">{date}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{review.comentario}</p>
      </div>
    </div>
  );
}

interface Props {
  planId: string;
}

export default function ReviewSection({ planId }: Props) {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    rating: 0,
    comentario: "",
  });
  const [captchaToken, setCaptchaToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const captchaRef = useRef<HCaptcha>(null);

  useEffect(() => {
    getReviewsForPlan(planId).then((data) => {
      setReviews(data.resenas);
      setAvgRating(data.rating);
      setTotalReviews(data.total);
    });
  }, [planId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.rating === 0) {
      setError("Selecciona una calificación");
      return;
    }

    if (HCAPTCHA_SITE_KEY && !captchaToken) {
      setError("Completa el captcha");
      return;
    }

    setLoading(true);
    try {
      await createReview({
        planId,
        nombre: formData.nombre,
        email: formData.email,
        rating: formData.rating,
        comentario: formData.comentario,
        captchaToken: captchaToken || undefined,
      });
      setSuccess(true);
      setFormData({ nombre: "", email: "", rating: 0, comentario: "" });
      setCaptchaToken("");
      captchaRef.current?.resetCaptcha();
    } catch (err: any) {
      setError(err.message || "Error al enviar reseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader className="bg-forest text-white rounded-t-xl">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Reseñas</CardTitle>
          {totalReviews > 0 && (
            <div className="flex items-center gap-2">
              <StarRating value={Math.round(avgRating)} readonly size="sm" />
              <span className="text-white/90 text-sm">
                {avgRating.toFixed(1)} ({totalReviews})
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Toggle form */}
        <button
          type="button"
          onClick={() => { setIsFormOpen(!isFormOpen); setSuccess(false); setError(""); }}
          className="text-sm font-medium text-primary hover:underline mb-4 flex items-center gap-1"
        >
          <svg
            className={`w-4 h-4 transition-transform ${isFormOpen ? "rotate-90" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Deja tu reseña
        </button>

        {isFormOpen && (
          <>
            {success ? (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                ¡Gracias por tu reseña! Será visible después de revisión.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 mb-6 pb-6 border-b">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="review-name">Nombre</Label>
                    <Input
                      id="review-name"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="review-email">Correo electrónico</Label>
                    <Input
                      id="review-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label>Calificación</Label>
                  <StarRating
                    value={formData.rating}
                    onChange={(v) => setFormData({ ...formData, rating: v })}
                  />
                </div>
                <div>
                  <Label htmlFor="review-comment">Comentario</Label>
                  <div className="relative">
                    <textarea
                      id="review-comment"
                      value={formData.comentario}
                      onChange={(e) => {
                        if (e.target.value.length <= 200) {
                          setFormData({ ...formData, comentario: e.target.value });
                        }
                      }}
                      placeholder="Cuéntanos tu experiencia..."
                      className="flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                    <span className="absolute bottom-2 right-3 text-xs text-gray-400">
                      {formData.comentario.length}/200
                    </span>
                  </div>
                </div>
                {HCAPTCHA_SITE_KEY && (
                  <HCaptcha
                    ref={captchaRef}
                    sitekey={HCAPTCHA_SITE_KEY}
                    onVerify={(token) => setCaptchaToken(token)}
                    onExpire={() => setCaptchaToken("")}
                  />
                )}
                <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar reseña"}
                </Button>
              </form>
            )}
          </>
        )}

        {/* Reviews list */}
        {reviews.length > 0 ? (
          <div>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">
            Aún no hay reseñas para este plan.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
