// import { motion } from "framer-motion";
// import {
//   FaUserPlus,
//   FaTint,
//   FaHandHoldingHeart,
//   FaSmile,
// } from "react-icons/fa";
// import CountUp from "react-countup";

// export default function ExtraSections() {
//   return (
//     <div className="space-y-20">
//       {/* How It Works Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <motion.h2
//             initial={{ opacity: 0, y: -30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-3xl font-bold mb-12 text-red-600"
//           >
//             How It Works
//           </motion.h2>

//           <div className="grid md:grid-cols-4 gap-8">
//             {[
//               {
//                 icon: <FaUserPlus />,
//                 title: "Register",
//                 desc: "Sign up as a donor or recipient.",
//               },
//               {
//                 icon: <FaTint />,
//                 title: "Request",
//                 desc: "Submit your blood request.",
//               },
//               {
//                 icon: <FaHandHoldingHeart />,
//                 title: "Match",
//                 desc: "We connect donors with patients.",
//               },
//               {
//                 icon: <FaSmile />,
//                 title: "Save Lives",
//                 desc: "Your donation makes a difference.",
//               },
//             ].map((step, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.2 }}
//                 className="card bg-white shadow-xl p-6 hover:scale-105 transition"
//               >
//                 <div className="text-red-500 text-5xl mb-4 flex justify-center">
//                   {step.icon}
//                 </div>
//                 <h3 className="font-semibold text-lg">{step.title}</h3>
//                 <p className="text-gray-600">{step.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <motion.h2
//             initial={{ opacity: 0, y: -30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-3xl font-bold mb-12 text-red-600"
//           >
//             What People Say
//           </motion.h2>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 text: "Thanks to Blood Bridge, I found an O+ donor in just a few hours. It saved my father’s life.",
//                 author: "Rahim, Dhaka",
//               },
//               {
//                 text: "I love being part of this platform. I’ve donated 3 times and always felt supported.",
//                 author: "Ayesha, Chittagong",
//               },
//               {
//                 text: "The request system is so smooth. It makes emergencies much less stressful.",
//                 author: "Tanvir, Sylhet",
//               },
//             ].map((t, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: i * 0.2 }}
//                 className="card bg-base-100 shadow-xl p-6"
//               >
//                 <p className="text-gray-700 italic">"{t.text}"</p>
//                 <h4 className="mt-4 font-semibold text-red-600">
//                   – {t.author}
//                 </h4>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-4xl mx-auto px-6">
//           <motion.h2
//             initial={{ opacity: 0, y: -30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-3xl font-bold text-center mb-12 text-red-600"
//           >
//             Frequently Asked Questions
//           </motion.h2>

//           <div className="space-y-4">
//             {[
//               {
//                 q: "Who can donate blood?",
//                 a: "Healthy adults aged 18–60, weighing at least 50kg, can donate blood.",
//               },
//               {
//                 q: "How often can I donate?",
//                 a: "Men can donate every 3 months, women every 4 months.",
//               },
//               {
//                 q: "Is blood donation safe?",
//                 a: "Yes, it’s completely safe. Sterile equipment is always used.",
//               },
//             ].map((faq, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.2 }}
//                 className="collapse collapse-arrow border border-red-200 bg-white rounded-xl"
//               >
//                 <input type="checkbox" />
//                 <div className="collapse-title text-lg font-medium">
//                   {faq.q}
//                 </div>
//                 <div className="collapse-content text-gray-600">{faq.a}</div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Donation Statistics Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <motion.h2
//             initial={{ opacity: 0, y: -30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-3xl font-bold mb-12 text-red-600"
//           >
//             Our Impact
//           </motion.h2>

//           <div className="grid md:grid-cols-4 gap-8">
//             {[
//               { label: "Donations", value: 1200 },
//               { label: "Active Donors", value: 800 },
//               { label: "Lives Saved", value: 500 },
//               { label: "Funds Raised ($)", value: 2500 },
//             ].map((stat, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.2 }}
//                 className="card bg-red-50 shadow-xl p-6 hover:scale-105 transition"
//               >
//                 <h3 className="text-4xl font-bold text-red-600">
//                   <CountUp end={stat.value} duration={3} />+
//                 </h3>
//                 <p className="text-gray-700">{stat.label}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Call-to-Action Section */}
//       <section className="py-16 bg-red-600 text-white text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-3xl mx-auto px-6"
//         >
//           <h2 className="text-4xl font-bold mb-6">
//             One donation can save up to 3 lives
//           </h2>
//           <p className="mb-8 text-lg">
//             Be a hero today – join Blood Bridge and make a difference.
//           </p>
//           <div className="flex justify-center gap-6">
//             <button className="btn bg-white text-red-600 hover:bg-gray-200">
//               Become a Donor
//             </button>
//             <button className="btn bg-red-800 text-white hover:bg-red-700">
//               Request Blood
//             </button>
//           </div>
//         </motion.div>
//       </section>
//     </div>
//   );
// }

import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaTint,
  FaHandHoldingHeart,
  FaSmile,
} from "react-icons/fa";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";

export default function ExtraSections() {
  const navigate = useNavigate();

  return (
    <div className="space-y-20">
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-8xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-12 text-red-600"
          >
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <FaUserPlus />,
                title: "Register",
                desc: "Sign up as a donor or recipient.",
              },
              {
                icon: <FaTint />,
                title: "Request",
                desc: "Submit your blood request.",
              },
              {
                icon: <FaHandHoldingHeart />,
                title: "Match",
                desc: "We connect donors with patients.",
              },
              {
                icon: <FaSmile />,
                title: "Save Lives",
                desc: "Your donation makes a difference.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="card bg-white shadow-xl p-6 hover:scale-105 transition"
              >
                <div className="text-red-500 text-5xl mb-4 flex justify-center">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-8xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-12 text-red-600"
          >
            What People Say
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Thanks to Blood Bridge, I found an O+ donor in just a few hours. It saved my father’s life.",
                author: "Rahim, Dhaka",
              },
              {
                text: "I love being part of this platform. I’ve donated 3 times and always felt supported.",
                author: "Ayesha, Chittagong",
              },
              {
                text: "The request system is so smooth. It makes emergencies much less stressful.",
                author: "Tanvir, Sylhet",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2 }}
                className="card bg-base-100 shadow-xl p-6"
              >
                <p className="text-gray-700 italic">"{t.text}"</p>
                <h4 className="mt-4 font-semibold text-red-600">
                  – {t.author}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12 text-red-600"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-4">
            {[
              {
                q: "Who can donate blood?",
                a: "Healthy adults aged 18–60, weighing at least 50kg, can donate blood.",
              },
              {
                q: "How often can I donate?",
                a: "Men can donate every 3 months, women every 4 months.",
              },
              {
                q: "Is blood donation safe?",
                a: "Yes, it’s completely safe. Sterile equipment is always used.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="collapse collapse-arrow border border-red-200 bg-white rounded-xl"
              >
                <input type="checkbox" />
                <div className="collapse-title text-lg font-medium">
                  {faq.q}
                </div>
                <div className="collapse-content text-gray-600">{faq.a}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-8xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-12 text-red-600"
          >
            Our Impact
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: "Donations", value: 1200 },
              { label: "Active Donors", value: 800 },
              { label: "Lives Saved", value: 500 },
              { label: "Funds Raised ($)", value: 2500 },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="card bg-red-50 shadow-xl p-6 hover:scale-105 transition"
              >
                <h3 className="text-4xl font-bold text-red-600">
                  <CountUp end={stat.value} duration={3} />+
                </h3>
                <p className="text-gray-700">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-red-600 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto px-6"
        >
          <h2 className="text-4xl font-bold mb-6">
            One donation can save up to 3 lives
          </h2>
          <p className="mb-8 text-lg">
            Be a hero today – join Blood Bridge and make a difference.
          </p>
          <div className="flex justify-center gap-6">
            <button
              onClick={() => navigate("/registration")}
              className="btn bg-white text-red-600 hover:bg-gray-200"
            >
              Become a Donor
            </button>
            <button
              onClick={() => navigate("dashboard/create-donation-request")}
              className="btn bg-red-800 text-white hover:bg-red-700"
            >
              Request Blood
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
