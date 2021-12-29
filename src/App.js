import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home/index";
import React from "react";
import Allmitra from "./pages/Allmitra";
import Mitra from "./pages/Mitra";
import { Provider } from "react-redux";
import store from "../src/redux/app/store";
import Signin from "./pages/Signin";
import Berita from "./pages/Berita/index";

function App() {
  let currentPathname = window.location.pathname;
  console.log(currentPathname);

  return (
    <BrowserRouter>
      <Provider store={store}>
        {currentPathname === "/signin" ? null : <Sidebar />}
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signin" exact element={<Signin />} />
          <Route path="/mitra" exact element={<Mitra />} />
          <Route path="/mapmitra" exact element={<Allmitra />} />
          <Route path="/berita" exact element={<Berita />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
