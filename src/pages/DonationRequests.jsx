import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
// ✅ FIXED: Import and use the secure axios instance
import useAxiosSecure from "../hooks/axiosSecure";

const DonationRequests = () => {
  // ✅ FIXED: Use the secure instance for authenticated requests
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pending-donation-requests"],
    queryFn: async () => {
      // This endpoint is protected, so we must use the secure instance
      const res = await axiosSecure.get("/donation-requests?status=pending");
      // Your backend likely returns data in a 'data' property
      console.log(`Fetched donation requests:`, res.data);
      // ✅ FIXED: The backend sends an array directly, not nested in a 'data' object.
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-red-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 font-bold mt-10">
        Failed to load donation requests.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Donation Requests
      </h1>
      {requests.length === 0 ? (
        <p className="text-center text-gray-500">
          No pending requests at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="card bg-white shadow-lg border border-gray-200"
            >
              <div className="card-body">
                <h2 className="card-title">Recipient: {req.recipientName}</h2>
                <p>
                  <strong>Location:</strong> {req.recipientUpazila},{" "}
                  {req.recipientDistrict}
                </p>
                <p>
                  <strong>Blood Group:</strong>{" "}
                  <span className="font-bold text-red-600">
                    {req.bloodGroup}
                  </span>
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(req.donationDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {req.donationTime}
                </p>
                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/donation-request/${req._id}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
