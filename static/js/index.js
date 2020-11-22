import React, { useState, useEffect } from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./Header";


const App = () => {
  return (
    <Router>
      <div>
        <Header />
      </div>
    </Router>
  );
}

render(<App />, document.getElementById("root"));
