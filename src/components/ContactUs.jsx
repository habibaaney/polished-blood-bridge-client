// import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

// const ContactUs = () => {
//   return (
//     <section className="py-16 bg-base-100" id="contact">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-4xl font-bold text-center text-red-600 mb-12">
//           Contact Us
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//           {/* Contact Form */}
//           <div className="bg-white shadow-md rounded-lg p-8 space-y-4">
//             <h3 className="text-xl font-semibold mb-4 text-gray-700">
//               Send Us a Message
//             </h3>
//             <form className="space-y-4">
//               <div>
//                 <label className="label">Name</label>
//                 <input
//                   type="text"
//                   placeholder="Your Name"
//                   className="input input-bordered w-full"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="label">Email</label>
//                 <input
//                   type="email"
//                   placeholder="Your Email"
//                   className="input input-bordered w-full"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="label">Message</label>
//                 <textarea
//                   rows="5"
//                   placeholder="Your Message"
//                   className="textarea textarea-bordered w-full"
//                   required
//                 ></textarea>
//               </div>
//               <button type="submit" className="btn btn-error text-white w-full">
//                 Send Message
//               </button>
//             </form>
//           </div>

//           {/* Contact Info */}
//           <div className="bg-red-50 p-8 rounded-lg shadow-md space-y-6">
//             <h3 className="text-xl font-semibold text-red-600">Get in Touch</h3>
//             <p>
//               If you have any questions or need urgent support, feel free to
//               reach out to us directly:
//             </p>
//             <div className="space-y-3 text-gray-800">
//               <p className="flex items-center gap-3">
//                 <FaMapMarkerAlt /> Dhaka, Bangladesh
//               </p>
//               <p className="flex items-center gap-3">
//                 <FaPhoneAlt /> +880 1234-567890
//               </p>
//               <p className="flex items-center gap-3">
//                 <FaEnvelope /> support@bloodlink.org
//               </p>
//             </div>
//             <div>
//               <h4 className="font-semibold mt-6 text-red-500">
//                 Emergency Hotline
//               </h4>
//               <p className="text-lg font-bold text-red-700">+880 1987-123456</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactUs;
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="py-20 bg-gray-50" id="contact">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center text-red-600 mb-12"
        >
          Contact Us
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-red-100"
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Send Us a Message
            </h3>
            <form className="space-y-5">
              <div>
                <label className="label font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                  required
                />
              </div>
              <div>
                <label className="label font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                  required
                />
              </div>
              <div>
                <label className="label font-medium">Message</label>
                <textarea
                  rows="5"
                  placeholder="Your Message"
                  className="textarea textarea-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn bg-red-600 text-white hover:bg-red-700 w-full rounded-xl shadow-md transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-red-50 p-8 rounded-2xl shadow-lg space-y-6 border border-red-100"
          >
            <h3 className="text-2xl font-semibold text-red-600">
              Get in Touch
            </h3>
            <p className="text-gray-700">
              If you have any questions or need urgent support, feel free to
              reach out to us directly:
            </p>
            <div className="space-y-4 text-gray-800">
              <p className="flex items-center gap-3 hover:text-red-600 transition">
                <FaMapMarkerAlt className="text-red-500 text-lg" /> Dhaka,
                Bangladesh
              </p>
              <p className="flex items-center gap-3 hover:text-red-600 transition">
                <FaPhoneAlt className="text-red-500 text-lg" /> +880 1234-567890
              </p>
              <p className="flex items-center gap-3 hover:text-red-600 transition">
                <FaEnvelope className="text-red-500 text-lg" />{" "}
                support@bloodlink.org
              </p>
            </div>

            {/* Emergency Hotline Highlight */}
            <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded-lg shadow-inner">
              <h4 className="font-semibold text-red-700">
                🚨 Emergency Hotline
              </h4>
              <p className="text-2xl font-bold text-red-600">
                +880 1987-123456
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
