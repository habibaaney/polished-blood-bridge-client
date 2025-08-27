import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/axiosSecure";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import FundPaymentModal from "../components/FundPaymentModal";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
// console.log("Stripe Key:", import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const FundingsPage = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: fundsData = {}, isLoading } = useQuery({
    queryKey: ["fundings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/fundings");
      return res.data; // expected: { funds: [...], totalCount: number }
    },
  });

  const funds = fundsData.funds || [];

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Fundings</h2>
        <button
          className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700"
          onClick={() => setIsModalOpen(true)}
        >
          Give Fund
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Amount (৳)</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {funds.map((fund, idx) => (
              <tr key={fund._id} className="border-t">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{fund.name}</td>
                <td className="px-4 py-2">{fund.amount}</td>
                <td className="px-4 py-2">
                  {new Date(fund.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Elements stripe={stripePromise}>
          <FundPaymentModal closeModal={() => setIsModalOpen(false)} />
        </Elements>
      )}
    </div>
  );
};

export default FundingsPage;
