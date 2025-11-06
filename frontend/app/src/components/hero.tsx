import Button from "./button";

export default function Hero() {
  return (
    <div>
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        viewBox="0 0 1500 580"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="heroClip">
            <path d="M 0,0 L 0,380 Q 750,760 1500,380 L 1500,0 Z" />
          </clipPath>

          <path
            id="heroBackgroundShape"
            d="M 0,0 L 0,420 Q 750,840 1500,420 L 1500,0 Z"
          />
        </defs>
        <image
          href="/images/home-background.png"
          width="1500"
          height="600"
          clipPath="url(#heroClip)"
          preserveAspectRatio="xMidYMid slice"
        />
        <rect
          x="0"
          y="0"
          width="1500"
          height="600"
          clipPath="url(#heroClip)"
          fill="rgba(0,0,0,0.35)"
        />
      </svg>

      <div className="relative z-10 px-6 pt-20 md:pt-50">
        <h1 className="mb-4 text-5xl font-semibold md:text-6xl font-serif tracking-widest">
          COLOMBO BOOK FAIR
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl">
          Sri Lanka’s largest celebration of books, bringing together readers,
          writers, and publishers from across the country.
        </p>
      </div>

    </div>
  );
}
