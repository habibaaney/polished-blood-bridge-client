import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "./Loading";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch the specific donation request details
  const {
    data: request,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["donation-request", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data.data; // Assuming backend sends data in a 'data' property
    },
  });

  // Mutation to update the status to 'inprogress'
  const { mutate: confirmDonation } = useMutation({
    mutationFn: () => {
      return axiosSecure.patch(`/donation-requests/status/${id}`, {
        status: "inprogress",
      });
    },
    onSuccess: () => {
      Swal.fire("Confirmed!", "Your donation is now in progress.", "success");
      queryClient.invalidateQueries(["donation-request", id]);
      navigate("/dashboard/my-donation-requests"); // Or wherever you want to redirect
    },
    onError: (error) => {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Could not confirm the donation.",
        "error"
      );
    },
  });

  const handleDonateClick = () => {
    document.getElementById("donation_modal").showModal();
  };

  const handleConfirmDonation = () => {
    confirmDonation();
  };

  if (isLoading) return <Loading />;
  if (isError || !request)
    return (
      <div className="text-center text-red-500 font-bold">
        Failed to load request details.
      </div>
    );

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 border-b pb-4">
          Donation Request Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          <p>
            <strong>Recipient Name:</strong> {request.recipientName}
          </p>
          <p>
            <strong>Requester:</strong> {request.requesterName}
          </p>
          <p>
            <strong>Requester Email:</strong> {request.requesterEmail}
          </p>
          <p>
            <strong>Blood Group:</strong>{" "}
            <span className="font-bold text-red-600">{request.bloodGroup}</span>
          </p>
          <p>
            <strong>Donation Date:</strong>{" "}
            {new Date(request.donationDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Donation Time:</strong> {request.donationTime}
          </p>
          <p>
            <strong>Hospital:</strong> {request.hospitalName}
          </p>
          <p>
            <strong>Location:</strong> {request.upazila}, {request.district}
          </p>
          <p className="md:col-span-2">
            <strong>Full Address:</strong> {request.fullAddress}
          </p>
          <p className="md:col-span-2">
            <strong>Reason:</strong> {request.requestMessage}
          </p>
          <p className="md:col-span-2">
            <strong>Status:</strong>{" "}
            <span className="badge badge-lg badge-info">{request.status}</span>
          </p>
        </div>

        <div className="text-center mt-8">
          <button
            className="btn btn-primary btn-lg"
            onClick={handleDonateClick}
            disabled={request.status !== "pending"}
          >
            Donate
          </button>
        </div>
      </div>

      {/* Donation Confirmation Modal */}
      <dialog id="donation_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Your Donation</h3>
          <form method="dialog">
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Your Name (Donor)</span>
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                className="input input-bordered"
                readOnly
              />
            </div>
            <div className="form-control mt-2">
              <label className="label">
                <span className="label-text">Your Email (Donor)</span>
              </label>
              <input
                type="text"
                value={user?.email || ""}
                className="input input-bordered"
                readOnly
              />
            </div>
            <div className="modal-action">
              <button className="btn">Cancel</button>
              <button
                className="btn btn-success"
                onClick={handleConfirmDonation}
              >
                Confirm Donation
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default DonationRequestDetails;
