import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

const CreateDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [formData, setFormData] = useState({
    requesterName: user?.displayName || "",
    requesterEmail: user?.email || "",
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    addressLine: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

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

  const filteredUpazilas = upazilas.filter(
    (upz) =>
      upz.district_id ===
      districts.find((d) => d.bn_name === selectedDistrict)?.id
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setFormData((prev) => ({
      ...prev,
      recipientDistrict: district,
      recipientUpazila: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      status: "pending",
      requesterPhoto: user?.photoURL || "",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(
        "https://a12-blood-bridge-server.vercel.app/donation-requests",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        Swal.fire("Success!", "Donation request submitted.", "success");
        setFormData({
          requesterName: user?.displayName || "",
          requesterEmail: user?.email || "",
          recipientName: "",
          recipientDistrict: "",
          recipientUpazila: "",
          hospitalName: "",
          addressLine: "",
          bloodGroup: "",
          donationDate: "",
          donationTime: "",
          requestMessage: "",
        });
        setSelectedDistrict("");
      } else {
        Swal.fire("Error", "Failed to submit donation request.", "error");
      }
    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create Donation Request</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="requesterName"
          value={formData.requesterName}
          disabled
          className="input input-bordered bg-gray-100"
        />
        <input
          type="email"
          name="requesterEmail"
          value={formData.requesterEmail}
          disabled
          className="input input-bordered bg-gray-100"
        />
        <input
          type="text"
          name="recipientName"
          placeholder="Recipient Name"
          value={formData.recipientName}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <select
          name="recipientDistrict"
          value={formData.recipientDistrict}
          onChange={handleDistrictChange}
          className="select select-bordered"
          required
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.bn_name}>
              {d.bn_name}
            </option>
          ))}
        </select>
        <select
          name="recipientUpazila"
          value={formData.recipientUpazila}
          onChange={handleChange}
          className="select select-bordered"
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
        <input
          type="text"
          name="hospitalName"
          placeholder="Hospital Name"
          value={formData.hospitalName}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <input
          type="text"
          name="addressLine"
          placeholder="Full Address Line"
          value={formData.addressLine}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="select select-bordered"
          required
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="donationDate"
          value={formData.donationDate}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <input
          type="time"
          name="donationTime"
          value={formData.donationTime}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <textarea
          name="requestMessage"
          placeholder="Why is this donation needed?"
          value={formData.requestMessage}
          onChange={handleChange}
          className="textarea textarea-bordered"
          required
        />
        <button type="submit" className="btn btn-primary">
          Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
