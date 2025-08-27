const AboutUs = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content px-4 md:px-10 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-red-500">
          About Us
        </h1>

        <div className="space-y-6 text-lg">
          <p>
            Our platform is built to connect{" "}
            <span className="font-semibold text-red-500">
              voluntary blood donors
            </span>{" "}
            with patients in need, across Bangladesh. We believe in the power of
            community and the life-saving impact a single donation can have.
          </p>

          <p>
            Whether you're a <span className="font-semibold">donor</span>, a{" "}
            <span className="font-semibold">volunteer</span>, or just someone
            wanting to help, this platform provides a safe and efficient way to{" "}
            <span className="text-red-500 font-semibold">request</span> or{" "}
            <span className="text-red-500 font-semibold">donate blood</span>.
          </p>

          <p>
            All users are verified, and our system ensures transparency,
            privacy, and the ability to track donation requests — keeping
            everything simple and secure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-red-50 rounded-xl border border-red-200 shadow">
            <h3 className="text-2xl font-bold text-red-600 mb-2">
              Our Mission
            </h3>
            <p>
              To make life-saving blood accessible to all, by creating a
              reliable and real-time network of donors, volunteers, and medical
              support teams.
            </p>
          </div>

          <div className="p-6 bg-red-50 rounded-xl border border-red-200 shadow">
            <h3 className="text-2xl font-bold text-red-600 mb-2">Our Vision</h3>
            <p>
              A nation where no life is lost due to a shortage of blood,
              empowered by a community-driven digital platform.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold text-red-500">
            Together, we save lives.
          </h2>
          <p className="mt-2 text-lg">
            Join us in this life-changing mission today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
