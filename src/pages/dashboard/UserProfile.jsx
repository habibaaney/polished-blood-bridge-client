import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

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

  useEffect(() => {
    fetch(
      `https://a12-blood-bridge-server.vercel.app/users/role/${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("🚀 User Role:", data);
        fetch(
          `https://a12-blood-bridge-server.vercel.app/users/profile/${user?.email}`
        )
          .then((res) => res.json())
          .then((profile) => setFormData(profile));
      });
  }, [user?.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const res = await fetch(
      `https://a12-blood-bridge-server.vercel.app/users/profile/${user?.email}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          bloodGroup: formData.bloodGroup,
          district: formData.district,
          upazila: formData.upazila,
          avatar: formData.avatar,
        }),
      }
    );

    if (res.ok) {
      Swal.fire("Updated!", "Your profile has been updated.", "success");
      setEditable(false);
    } else {
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  if (!formData) return <p>Loading...</p>;

  // Filter upazilas based on selected district
  const userUpazilas = upazilas.filter(
    (upz) =>
      upz.district_id ===
      districts.find((d) => d.bn_name === selectedDistrict)?.id
  );

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Profile</h2>
        <button
          className="px-3 py-1 bg-blue-600 text-white rounded"
          onClick={() => setEditable((prev) => !prev)}
        >
          {editable ? "Cancel" : "Edit"}
        </button>
      </div>

      <form className="grid grid-cols-1 gap-4">
        <input
          name="name"
          value={formData.name}
          disabled={!editable}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="Full Name"
        />

        <input
          name="email"
          value={formData.email}
          disabled
          className="input input-bordered bg-gray-100"
        />

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          disabled={!editable}
          onChange={handleChange}
          className="select select-bordered"
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <select
          name="district"
          className="select select-bordered w-full"
          disabled={!editable}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedDistrict(value);
            setFormData((prev) => ({ ...prev, district: value }));
          }}
          value={formData.district}
        >
          <option value="">Select District</option>
          {districts.map((dist) => (
            <option key={dist.id} value={dist.bn_name}>
              {dist.bn_name}
            </option>
          ))}
        </select>

        <select
          name="upazila"
          className="select select-bordered w-full"
          disabled={!editable || !selectedDistrict}
          value={formData.upazila}
          onChange={handleChange}
        >
          <option value="">Select Upazila</option>
          {userUpazilas.map((upz) => (
            <option key={upz.id} value={upz.bn_name}>
              {upz.bn_name}
            </option>
          ))}
        </select>

        {editable && (
          <button
            type="button"
            onClick={handleSave}
            className="btn btn-success mt-4"
          >
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
