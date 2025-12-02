import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";

import Landing from "./pages/Landing.tsx";
import LifeMovesFast from "./pages/LifeMovesFast";
import TotalCoins from "./pages/TotalCoins.tsx";
import TotalPnl from "./pages/TotalPnl.tsx";
import Winrate from "./pages/Winrate.tsx";
import Hold from "./pages/Hold.tsx";
import UpsDowns from "./pages/UpsDowns";
import MostActiveDay from "./pages/MostActiveDay.tsx";
import TopTrade from "./pages/TopTrade.tsx";
import TopTradesList from "./pages/TopTradesList.tsx";
import WorstTrade from "./pages/WorstTrade.tsx";
import { useWalletWrapped } from "./hooks/use-wallet-wrapped";
import { useEffect } from "react";

const ROUTE_ORDER = [
  "/life-moves-fast",
  "/total-coins",
  "/total-pnl",
  "/winrate",
  "/hold-time",
  "/ups-downs",
  "/most-active-day",
  "/top-trade",
  "/top-trades-list",
  "/worst-trade",
];

// Animált wrapper minden oldal köré
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -80, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ width: "100%", height: "100%" }}
    >
      {children}
    </motion.div>
  );
};

// Diavetítés-szerű vezérlő a card-hoz alul
const SlideControls = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const index = ROUTE_ORDER.indexOf(location.pathname);
  const total = ROUTE_ORDER.length;

  const hasPrev = index > 0;
  const hasNext = index < total - 1;

  const goPrev = () => {
    if (hasPrev) {
      navigate(ROUTE_ORDER[index - 1]);
    }
  };

  const goNext = () => {
    if (hasNext) {
      navigate(ROUTE_ORDER[index + 1]);
    }
  };

  if (index === -1) return null;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 24,
        marginBottom: 40,
      }}
    >
      <div
        className="slider-controls"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "4px 12px",
          borderRadius: 999,
          background: "#222",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          fontFamily: "inherit",
          fontSize: 12,
          color: "#f5f5f5",
        }}
      >
        <button
          className="slider-btn"
          onClick={goPrev}
          disabled={!hasPrev}
          style={{
            padding: "4px 10px",
            borderRadius: 999,
            border: "none",
            background: "#3a3a3a",
            color: "#f5f5f5",
            fontSize: 12,
            cursor: hasPrev ? "pointer" : "default",
            fontWeight: 500,
            opacity: hasPrev ? 1 : 0.35,
          }}
        >
          ⟵ Previous
        </button>

        <span
          className="slider-status"
          style={{ padding: "0 4px", opacity: 0.85 }}
        >
          {index + 1} / {total}
        </span>

        <button
          className="slider-btn"
          onClick={goNext}
          disabled={!hasNext}
          style={{
            padding: "4px 10px",
            borderRadius: 999,
            border: "none",
            background: "#3a3a3a",
            color: "#f5f5f5",
            fontSize: 12,
            cursor: hasNext ? "pointer" : "default",
            fontWeight: 500,
            opacity: hasNext ? 1 : 0.35,
          }}
        >
          Next ⟶
        </button>
      </div>
    </div>
  );
};


function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const {isLoading, walletWrapped, LoadWallet} = useWalletWrapped();

  const onSubmit = (wallet: string) => {
    LoadWallet(wallet)
  };

  /**
   * Navigate to the first page when wallet data is loaded
   */
  useEffect(() => {
    if (walletWrapped !== null) navigate(ROUTE_ORDER[0]);
  }, [walletWrapped]);

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Landing 
                  onSubmit={onSubmit}
                  isLoading={isLoading}
                />
              </PageTransition>
            }
          />

          <Route
            path="/life-moves-fast"
            element={
              <PageTransition>
                <LifeMovesFast />
              </PageTransition>
            }
          />

          <Route
            path="/total-coins"
            element={
              <PageTransition>
                <TotalCoins
                  walletWrapped={walletWrapped}
                />
              </PageTransition>
            }
          />

          <Route
            path="/total-pnl"
            element={
              <PageTransition>
                <TotalPnl 
                  walletWrapped={walletWrapped}
                />
              </PageTransition>
            }
          />

          <Route
            path="/winrate"
            element={
              <PageTransition>
                <Winrate
                  walletWrapped={walletWrapped}
                />
              </PageTransition>
            }
          />

          <Route
            path="/hold-time"
            element={
              <PageTransition>
                <Hold
                  walletWrapped={walletWrapped}
                />
              </PageTransition>
            }
          />

          <Route
            path="/ups-downs"
            element={
              <PageTransition>
                <UpsDowns />
              </PageTransition>
            }
          />

          <Route
            path="/most-active-day"
            element={
              <PageTransition>
                <MostActiveDay
                  walletWrapped={walletWrapped}
                />
              </PageTransition>
            }
          />

          <Route
            path="/top-trade"
            element={
              <PageTransition>
                <TopTrade
                  walletWrapped={walletWrapped}
                />
              </PageTransition>
            }
          />

          <Route
            path="/top-trades-list"
            element={
              <PageTransition>
                <TopTradesList
                  walletWrapped={walletWrapped}
                />
              </PageTransition>
            }
          />

          <Route
            path="/worst-trade"
            element={
              <PageTransition>
                <WorstTrade
                  walletWrapped={walletWrapped}
                />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>

      {/* Diavetítés vezérlő – mindig az aktuális lap alatt */}
      {location.pathname !== "/" ? (
        <SlideControls />
      ): undefined}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          // base style for ALL toasts (including loading)
          style: {
            background: "#111111",
            color: "#ffffff",
            borderRadius: "999px", // pill like your button
            border: "1px solid #3a3a3a",
            padding: "10px 18px",
            fontSize: "14px",
          },
        }}
      />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
