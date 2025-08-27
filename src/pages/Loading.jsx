import Lottie from "lottie-react";
import loading from "../assets/Heartbeat pulsing - loader.json";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-600">
      <div className="w-[200px] mb-6">
        <Lottie animationData={loading} loop={true} />
      </div>
      <h2 className="text-sm md:text-3xl  tracking-wide text-center">
        Saving lives takes a moment... Please wait
      </h2>
    </div>
  );
};

export default Loading;
