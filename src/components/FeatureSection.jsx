// const FeatureSection = () => {
//   const features = [
//     {
//       title: "Find Donors Easily",
//       desc: "Search and connect with verified blood donors in your area based on blood group and location.",
//       icon: "❤️",
//     },
//     {
//       title: "Make Blood Requests",
//       desc: "Submit urgent blood requests with location and timing details. Track status in real-time.",
//       icon: "🩸",
//     },
//     {
//       title: "Role-Based Dashboard",
//       desc: "Dedicated dashboards for Donors, Admins, and Volunteers to manage activities efficiently.",
//       icon: "🛠️",
//     },
//     {
//       title: "Blog & Awareness",
//       desc: "Read and publish blogs to raise awareness, educate users, and encourage donation.",
//       icon: "📚",
//     },
//     {
//       title: "Secure Login",
//       desc: "JWT and Firebase-based authentication ensures your data and actions remain secure.",
//       icon: "🔒",
//     },
//     {
//       title: "Real-Time Updates",
//       desc: "Get notified of donation requests, approvals, or changes instantly.",
//       icon: "⚡",
//     },
//   ];

//   return (
//     <section className="py-16 bg-base-100 text-center">
//       <div className="max-w-6xl mx-auto px-4">
//         <h2 className="text-4xl font-bold text-red-600 mb-4">Our Features</h2>
//         <p className="text-gray-600 mb-10">
//           Empowering communities through technology — save lives faster and
//           smarter.
//         </p>
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {features.map((feature, idx) => (
//             <div
//               key={idx}
//               className="card bg-white shadow-md hover:shadow-lg transition duration-300 border border-red-100"
//             >
//               <div className="card-body items-center text-center">
//                 <div className="text-5xl mb-4">{feature.icon}</div>
//                 <h3 className="card-title text-xl font-semibold text-red-500">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">{feature.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeatureSection;

import { motion } from "framer-motion";

const FeatureSection = () => {
  const features = [
    {
      title: "Find Donors Easily",
      desc: "Search and connect with verified blood donors in your area based on blood group and location.",
      icon: "❤️",
    },
    {
      title: "Make Blood Requests",
      desc: "Submit urgent blood requests with location and timing details. Track status in real-time.",
      icon: "🩸",
    },
    {
      title: "Role-Based Dashboard",
      desc: "Dedicated dashboards for Donors, Admins, and Volunteers to manage activities efficiently.",
      icon: "🛠️",
    },
    {
      title: "Blog & Awareness",
      desc: "Read and publish blogs to raise awareness, educate users, and encourage donation.",
      icon: "📚",
    },
    {
      title: "Secure Login",
      desc: "JWT and Firebase-based authentication ensures your data and actions remain secure.",
      icon: "🔒",
    },
    {
      title: "Real-Time Updates",
      desc: "Get notified of donation requests, approvals, or changes instantly.",
      icon: "⚡",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-16 bg-base-100 text-center">
      <div className="max-w-8xl mx-auto px-4">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-red-600 mb-4"
        >
          Our Features
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gray-600 mb-10"
        >
          Empowering communities through technology — save lives faster and
          smarter.
        </motion.p>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className="card bg-white shadow-md hover:shadow-xl transition duration-300 border border-red-100"
            >
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="card-title text-xl font-semibold text-red-500">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
