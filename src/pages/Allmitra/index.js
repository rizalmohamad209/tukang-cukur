import React from "react";
import Header from "../../components/Header";
import Mapmitra from "../../components/Mapmitra";

export default function Allmitra() {
  return (
    <div className="container mx-auto">
      <div className="ml-64 py-5">
        <Header />
        <h1 className="font-bold text-2xl mb-2">Mitra Yang Tersebar</h1>
        <Mapmitra />
      </div>
    </div>
  );
}
