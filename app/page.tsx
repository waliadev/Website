"use client";

import Navbar from "@/app/components/shared/components/Navbar";
import Hero from "@/app/components/home/components/Hero";
import HeroBanner from "@/app/components/home/components/HeroBanner";
import AgentCards from "@/app/components/home/components/AgentCards";
import HomePage from "@/app/components/home/components";
import Footer from "@/app/components/shared/components/Footer";


export default function Dashboard() {


  return (
    <>
      <Navbar />
      <HomePage/>
      <Footer />
    </>
  );
}