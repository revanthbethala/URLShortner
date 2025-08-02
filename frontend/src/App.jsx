import { useState } from "react";
import UrlForm from "./pages/UrlForm";
import Stats from "./pages/Stats";
import AllUrls from "./pages/AllUrls";

function App() {
  const [statsUrl, setStatsUrl] = useState("");
  const [showCard, setShowCard] = useState("form");

  return (
    <div>
      <header>
        <nav className="flex items-center justify-between py-3 px-8">
          <h3 className="text-xl font-bold">URL Shortener</h3>
          <ul className="flex items-center justify-center gap-4 cursor-pointer font-medium ">
            <li onClick={() => setShowCard("urls")} className="hover:underline hover:underline-offset-2 ">ALL URLS</li>
            <li onClick={() => setShowCard("form")} className="hover:underline hover:underline-offset-2 ">URL Form</li>
          </ul>
        </nav>
      </header>
      <div>
        {showCard === "stats" ? (
          <Stats statsUrl={statsUrl} />
        ) : showCard === "urls" ? (
          <AllUrls setShowCard={setShowCard} setStatsUrl={setStatsUrl} />
        ) : (
          <UrlForm />
        )}
      </div>
    </div>
  );
}

export default App;
