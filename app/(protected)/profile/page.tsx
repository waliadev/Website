"use client";
import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";
import ProfileHero from "@/app/components/profile/ProfileHero";
import ProfileCard from "@/app/components/profile/ProfileCard";

export default function ProfilePage() {

  return (
    <>
      <Navbar />

      <ProfileHero />

      <ProfileCard />

      <Footer />
    </>
  );
}