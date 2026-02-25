import VideoPlayer from "@/components/ui/VideoPlayer";

export default function DesignadasConSentido() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-primary mb-2">
            Diseñadas con sentido
          </h2>
          <p className="text-stormy max-w-2xl mx-auto">
            Cada experiencia está pensada para que la disfrutes con calma,
            comodidad y la confianza de saber que todo está cuidado.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg">
          <VideoPlayer
            src="/assets/economia-silver.mp4"
            poster="/assets/cover-economia.png"
            className="aspect-video"
          />
        </div>
      </div>
    </section>
  );
}
