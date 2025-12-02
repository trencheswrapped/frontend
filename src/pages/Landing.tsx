import { useEffect, useState } from "react";

interface LandingProps {
  onSubmit: (wallet: string) => void;
  isLoading: boolean;
}

function Landing({
  onSubmit,
  isLoading,
}: LandingProps) {
  useEffect(() => {
    document.body.className = "page-landing";
    return () => {
      document.body.className = "";
    };
  }, []);

  const [wallet, setWallet] = useState("");

  return (
    <div className="landing-wrapper">
      <div className="year-watermark">25</div>

      <div className="landing-content">
        <div className="landing-title-year">2025</div>
        <div className="landing-title-main">Trenches Wrapped</div>
        <p className="landing-subtitle">
          Your trenching highlights and more. Drop your wallet, we’ll track the
          chaos, and turn it into a story.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!isLoading) onSubmit(wallet);
          }}
          className="wallet-form"
        >
          <input
            className="wallet-input"
            type="text"
            placeholder="Wallet Address"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          />
          <button disabled={isLoading} className="wallet-button" type="submit">
            {isLoading ? "Loading..." : "Check"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default Landing;
