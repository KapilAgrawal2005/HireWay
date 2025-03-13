import React from "react";
import Hero from "../Home Components/Hero";
import CarousalandBanner from "../Home Components/CarousalandBanner";
import CardandFaqs from "../Home Components/CardandFaqs";
const Home = () => {
  return (
    <>
      <main className="min-h-screen mx-20 flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
        <Hero />
        <CarousalandBanner />
        <CardandFaqs />
      </main>
    </>
  );
};
export default Home;
