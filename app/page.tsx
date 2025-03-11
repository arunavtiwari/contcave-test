import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";
import Cover from "@/components/Cover";
import FAQ from "@/components/FAQ";
import Feature from "@/components/Features";
import FeaturesTab from "@/components/FeaturesTab";
import FunFact from "@/components/FunFact";
import Hero from "@/components/Hero";
import "./landing.css";

export default async function Home() {

  return (
    <main>
      <Hero />
      <Feature />
      <FeaturesTab />
      <FunFact />
      <FAQ />
      <CTA />
      {/* <Cover /> */}
      {/* <Contact /> */}
      {/* <Blog/> */}
    </main>
  );
}
