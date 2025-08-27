import { Link } from "react-router";
import animation from "../assets/blood donner.json";
import Lottie from "lottie-react";

const Banner = () => {
  return (
    <section className="bg-contain bg-fixed">
      <div
        id="banner"
        className="flex min-h-screen bg-white bg-opacity-95 flex-col-reverse md:flex-row items-center justify-around"
      >
        <div className="text space-y-4 text-center md:text-start">
          <h1 className="text-5xl font-bold">
            Donate <span className="text-red-500">Blood</span>, Save
            <span className="text-red-400"> Lives</span>
          </h1>

          <div className="max-w-[520px] md:rounded-full p-2 bg-red-500 text-white">
            <marquee direction="left">
              Your blood can give someone another chance at life.
            </marquee>
          </div>

          <h2 className="text-3xl">Be a hero. Join our mission today!</h2>

          <div className="buttons flex gap-3 justify-center md:justify-start">
            <Link to="/registration">
              <button className="border bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-full">
                Become a Donor
              </button>
            </Link>
            <Link to="/about">
              <button className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold px-6 py-2 rounded-full">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        <div className="max-w-[400px]">
          <Lottie animationData={animation} loop={true} />
        </div>
      </div>
    </section>
  );
};

export default Banner;
