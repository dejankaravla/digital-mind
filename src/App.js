import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

import Explore from "./Pages/Explore/Explore";
import Nft from "./Pages/NFT/Nft";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Explore />}></Route>
        </Routes>
        <Routes>
          <Route path="/nft" element={<Nft />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
