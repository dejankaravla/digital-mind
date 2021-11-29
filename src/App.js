import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Explore from "./Pages/Explore/Explore";
import Nft from "./Pages/NFT/Nft";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/nft" element={<Nft />}></Route>
          <Route path="/" element={<Explore />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
