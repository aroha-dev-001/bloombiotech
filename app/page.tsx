import { Hero } from "@/components/home/Hero";
import { DataRail } from "@/components/home/DataRail";
import { Origin } from "@/components/home/Origin";
import { ProductRail } from "@/components/home/ProductRail";
import { PlantStory } from "@/components/home/PlantStory";
import { Capabilities } from "@/components/home/Capabilities";
import { Assurance } from "@/components/home/Assurance";
import { RouteGuide } from "@/components/home/RouteGuide";
import { Scale } from "@/components/home/Scale";
import { FilmRoom } from "@/components/home/FilmRoom";
import { Questions } from "@/components/home/Questions";
import { Contact } from "@/components/home/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DataRail />
      <Origin />
      <ProductRail />
      <PlantStory />
      <Capabilities />
      <Assurance />
      <RouteGuide />
      <Scale />
      <FilmRoom />
      <Questions />
      <Contact />
    </>
  );
}
