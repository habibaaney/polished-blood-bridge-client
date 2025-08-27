// import Lottie from "lottie-react";
// import { useContext } from "react";
// import { BiEnvelope, BiImageAdd, BiKey, BiUser } from "react-icons/bi";
// import { useNavigate } from "react-router";
// import happy from "../assets/happy.json";
// import Social from "../components/Social";
// import Title from "../components/Title";
// import { AuthContext } from "../providers/AuthProvider";

// const Register = () => {
//   const goTo = useNavigate();
//   const { createUser, signIn, user, setUser, updateUser } =
//     useContext(AuthContext);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const name = form.name.value;
//     const image = form.image.value;
//     const email = form.email.value;
//     const pass = form.pass.value;

//     console.log(name, email, pass);

//     createUser(email, pass)
//       .then((res) => {
//         updateUser({ displayName: name }).then(() => {
//           setUser({ ...res.user, displayName: name, photoURL: image });
//           goTo(`${location.state ? location.state : "/"}`);
//           console.log(res.data);
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div className=" bg-[url(/bg.png)] bg-contain">
//       <div className=" bg-white bg-opacity-90 min-h-screen">
//         <div className="w-11/12 mx-auto py-10 m-5 p-5  ">
//           <div className="title mt-5">
//             <Title>Join with Us</Title>
//           </div>

//           <div className="flex  justify-between items-center gap-5 pt-8">
//             <div className="login-for flex-1">
//               <form
//                 onSubmit={handleSubmit}
//                 className="bg-white p-5 flex flex-col gap-8 backdrop-blur-sm bg-opacity-10 shadow-lg rounded-lg"
//               >
//                 <div className="flex justify-start items-center">
//                   <div className="">
//                     <BiUser className="text-3xl text-slate-500"></BiUser>
//                   </div>
//                   <input
//                     className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all  duration-200"
//                     type="text"
//                     name="name"
//                     placeholder="Enter Full Name"
//                   />
//                 </div>

//                 <div className="flex justify-start items-center">
//                   <div className="">
//                     <BiImageAdd className="text-3xl text-slate-500"></BiImageAdd>
//                   </div>
//                   <input
//                     className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all  duration-200"
//                     type="text"
//                     name="image"
//                     placeholder="Enter Image Url"
//                   />
//                 </div>
//                 <div className="flex justify-start items-center">
//                   <div className="">
//                     <BiEnvelope className="text-3xl text-slate-500"></BiEnvelope>
//                   </div>
//                   <input
//                     className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all  duration-200"
//                     type="email"
//                     name="email"
//                     placeholder="Enter Email"
//                   />
//                 </div>

//                 <div className="flex justify-start items-center">
//                   <div className="">
//                     <BiKey className="text-3xl text-slate-500"></BiKey>
//                   </div>
//                   <input
//                     className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all  duration-200"
//                     type="password"
//                     name="pass"
//                     placeholder="Enter Password"
//                   />
//                 </div>

//                 <input
//                   type="submit"
//                   value="Register Now"
//                   className="btn cursor-pointer"
//                 />
//               </form>
//             </div>
//             <Social></Social>
//             <div className="lottie flex-1 flex mx-20 ">
//               <Lottie animationData={happy}></Lottie>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import Lottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import {
  BiEnvelope,
  BiImageAdd,
  BiKey,
  BiUser,
  BiMap,
  BiDroplet,
} from "react-icons/bi";
import { useNavigate } from "react-router";
import happy from "../assets/happy.json";
import Social from "../components/Social";
import Title from "../components/Title";
import { AuthContext } from "../providers/AuthProvider";
// import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile, showToast } = useContext(AuthContext);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [loading, setLoading] = useState(false);

  // Load districts and upazilas data
  useEffect(() => {
    const loadData = async () => {
      try {
        const districtsRes = await fetch("/districts.json");
        const districtsData = await districtsRes.json();
        setDistricts(districtsData[2].data);

        const upazilasRes = await fetch("/upazilas.json");
        const upazilasData = await upazilasRes.json();
        setUpazilas(upazilasData[2].data);
      } catch (error) {
        console.error("Failed to load location data:", error);
      }
    };

    loadData();
  }, []);

  // Filter upazilas based on selected district
  const filteredUpazilas = upazilas.filter(
    (upz) =>
      upz.district_id ===
      districts.find((d) => d.bn_name === selectedDistrict)?.id
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    const email = form.email.value;
    const password = form.pass.value;
    const confirmPassword = form.confirm_pass.value;
    const bloodGroup = form.blood_group.value;
    const district = form.district.value;
    const upazila = form.upazila.value;

    // Validation
    if (password !== confirmPassword) {
      showToast("error", "Passwords don't match!");
      setLoading(false);
      return;
    }

    try {
      // 1. Create user with Firebase Auth
      const { user: firebaseUser } = await createUser(email, password);

      // 2. Update user profile with name and photo
      await updateUserProfile({
        displayName: name,
        photoURL: image || "https://i.ibb.co/4pDNDk1/avatar.png",
      });

      // 3. Prepare user data for backend
      const userData = {
        uid: firebaseUser.uid,
        email,
        name,
        avatar: image || "https://i.ibb.co/4pDNDk1/avatar.png",
        bloodGroup,
        district,
        upazila,
        role: "donor",
        status: "active",
      };

      // 4. Save additional user data to your backend
      const response = await axios.post(
        "https://a12-blood-bridge-server.vercel.app/users",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        showToast("success", "Registration successful!");
        navigate("/");
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = "Registration failed. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      showToast("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[url(/bg.png)] bg-contain">
      <div className="bg-white bg-opacity-90 min-h-screen">
        <div className="w-11/12 mx-auto py-10">
          <Title>Join as a Donor</Title>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-5 pt-8">
            <div className="login-form flex-1 w-full max-w-md">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-5 flex flex-col gap-6 shadow-lg rounded-lg"
              >
                <div className="flex gap-2 items-center">
                  <BiUser className="text-2xl text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full Name"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <BiImageAdd className="text-2xl text-gray-500" />
                  <input
                    type="url"
                    name="image"
                    placeholder="Image URL (optional)"
                    className="input input-bordered w-full"
                    pattern="https?://.+"
                    title="Include http:// or https://"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <BiEnvelope className="text-2xl text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <BiKey className="text-2xl text-gray-500" />
                  <input
                    type="password"
                    name="pass"
                    required
                    minLength="6"
                    placeholder="Password (min 6 characters)"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <BiKey className="text-2xl text-gray-500" />
                  <input
                    type="password"
                    name="confirm_pass"
                    required
                    placeholder="Confirm Password"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <BiDroplet className="text-2xl text-red-500" />
                  <select
                    name="blood_group"
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select Blood Group</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="flex gap-2 items-center">
                  <BiMap className="text-2xl text-green-500" />
                  <select
                    name="district"
                    className="select select-bordered w-full"
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    required
                    value={selectedDistrict}
                  >
                    <option value="">Select District</option>
                    {districts.map((dist) => (
                      <option key={dist.id} value={dist.bn_name}>
                        {dist.bn_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 items-center">
                  <BiMap className="text-2xl text-green-500" />
                  <select
                    name="upazila"
                    className="select select-bordered w-full"
                    required
                    disabled={!selectedDistrict}
                  >
                    <option value="">Select Upazila</option>
                    {filteredUpazilas.map((upz) => (
                      <option key={upz.id} value={upz.bn_name}>
                        {upz.bn_name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Register Now"
                  )}
                </button>
              </form>
            </div>
            <Social />
            <div className="lottie flex-1 lg:mx-10 max-w-md">
              <Lottie animationData={happy} loop={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
