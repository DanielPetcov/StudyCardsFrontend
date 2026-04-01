export function DemoVideo({ src, poster }: { src: string; poster?: string }) {
  return (
    <div className="relative mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border bg-muted/50">
      <video
        src={src}
        poster={poster}
        controls
        className="h-full w-full object-cover"
        preload="metadata"
      />
    </div>
  )
}
