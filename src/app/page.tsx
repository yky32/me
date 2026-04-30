import { FeatureStrip } from "@/components/home/feature-strip";
import { HomeHero } from "@/components/home/hero";
import { TechStrip } from "@/components/home/tech-strip";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TechStrip />
      <FeatureStrip />
    </>
  );
}
