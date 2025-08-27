import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/axiosSecure";

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [requestData, setRequestData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/donation-requests/${id}`)
      .then((res) => {
        setRequestData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch request data:", err);
        setLoading(false);
      });
  }, [axiosSecure, id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      recipientName: form.recipientName.value,
      recipientDistrict: form.recipientDistrict.value,
      recipientUpazila: form.recipientUpazila.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      bloodGroup: form.bloodGroup.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
    };

    try {
      const res = await axiosSecure.put(
        `/donation-requests/${id}`,
        updatedData
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire(
          "Success",
          "Donation request updated successfully!",
          "success"
        );
        navigate("/dashboard/my-requests");
      } else {
        Swal.fire("Info", "No changes were made to the request.", "info");
      }
    } catch (err) {
      console.error("Update failed:", err);
      Swal.fire("Error", "Failed to update request. Try again later.", "error");
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (!requestData)
    return <p className="text-center text-red-500">Request not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Edit Donation Request
      </h2>
      <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-5">
        <input
          name="recipientName"
          defaultValue={requestData.recipientName}
          placeholder="Recipient Name"
          className="input input-bordered"
          required
        />
        <input
          name="recipientDistrict"
          defaultValue={requestData.recipientDistrict}
          placeholder="Recipient District"
          className="input input-bordered"
          required
        />
        <input
          name="recipientUpazila"
          defaultValue={requestData.recipientUpazila}
          placeholder="Recipient Upazila"
          className="input input-bordered"
          required
        />
        <input
          type="date"
          name="donationDate"
          defaultValue={requestData.donationDate}
          className="input input-bordered"
          required
          placeholder="Donation Date"
        />
        <input
          type="time"
          name="donationTime"
          defaultValue={requestData.donationTime}
          className="input input-bordered"
          required
          placeholder="Donation Time"
        />
        <select
          name="bloodGroup"
          defaultValue={requestData.bloodGroup}
          className="select select-bordered"
          required
        >
          <option disabled value="">
            Select Blood Group
          </option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>
        <input
          name="hospitalName"
          defaultValue={requestData.hospitalName}
          placeholder="Hospital Name"
          className="input input-bordered"
          required
        />
        <input
          name="fullAddress"
          defaultValue={requestData.fullAddress}
          placeholder="Full Address"
          className="input input-bordered"
          required
        />
        <button className="btn btn-primary mt-4">Update Request</button>
      </form>
    </div>
  );
};

export default EditDonationRequest;
