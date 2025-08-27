import Banner from "../components/Banner";
import ContactUs from "../components/ContactUs";
import ExtraSections from "../components/ExtraSections";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <div className="min-h-screen flex items-center justify-center">
        <FeatureSection></FeatureSection>
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <ExtraSections></ExtraSections>
      </div>

      <div className="min-h-screen flex items-center justify-center">
        <ContactUs></ContactUs>
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <Footer></Footer>
      </div>
    </>
  );
};

export default Home;
