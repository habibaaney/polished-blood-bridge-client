import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/axiosSecure";

const DonationRequestDetails = () => {
  const { id } = useParams();
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
        console.error("Error fetching donation request details:", err);
        setLoading(false);
      });
  }, [axiosSecure, id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!requestData)
    return <p className="text-center mt-10 text-red-500">No data found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Donation Request Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
        <p>
          <span className="font-semibold">Recipient Name:</span>{" "}
          {requestData.recipientName}
        </p>
        <p>
          <span className="font-semibold">Blood Group:</span>{" "}
          {requestData.bloodGroup}
        </p>
        <p>
          <span className="font-semibold">District:</span>{" "}
          {requestData.recipientDistrict}
        </p>
        <p>
          <span className="font-semibold">Upazila:</span>{" "}
          {requestData.recipientUpazila}
        </p>
        <p>
          <span className="font-semibold">Date:</span>{" "}
          {requestData.donationDate}
        </p>
        <p>
          <span className="font-semibold">Time:</span>{" "}
          {requestData.donationTime}
        </p>
        <p>
          <span className="font-semibold">Hospital Name:</span>{" "}
          {requestData.hospitalName}
        </p>
        <p>
          <span className="font-semibold">Full Address:</span>{" "}
          {requestData.fullAddress}
        </p>
        <p>
          <span className="font-semibold">Request Status:</span>{" "}
          <span className="capitalize">{requestData.status}</span>
        </p>
      </div>
    </div>
  );
};

export default DonationRequestDetails;
