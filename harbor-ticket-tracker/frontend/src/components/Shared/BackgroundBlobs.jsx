/* Ambient background with animated gradient blobs */
function BackgroundBlobs() {
  return (
    <div className="bg-ambient" aria-hidden="true">
      <div className="bg-gradient-base"></div>
      <div className="bg-noise"></div>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
      </div>
      <div className="bg-grid"></div>
    </div>
  )
}

export default BackgroundBlobs
