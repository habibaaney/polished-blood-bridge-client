// src/components/FundPaymentModal.jsx
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import useAxiosSecure from "../hooks/axiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const FundPaymentModal = ({ closeModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (!amount || isNaN(amount) || amount <= 0) {
      return setError("Enter a valid amount.");
    }

    setProcessing(true);

    try {
      // 1. Create PaymentIntent on server
      const { data: clientSecretRes } = await axiosSecure.post(
        "/create-payment-intent",
        { amount }
      );
      const clientSecret = clientSecretRes.clientSecret;

      // 2. Confirm card payment
      const card = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        // 3. Save fund info to DB
        await axiosSecure.post("/fundings", {
          name: user?.displayName,
          email: user?.email,
          amount: parseFloat(amount),
          date: new Date(),
        });

        Swal.fire("Success!", "Funding successful!", "success");
        closeModal();
      }
    } catch (err) {
      setError("Payment failed.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-[90%] max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">Make a Fund</h2>

        <input
          type="number"
          placeholder="Enter amount (৳)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <CardElement className="border p-3 rounded mb-4" />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 rounded"
            disabled={processing}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-rose-600 text-white rounded"
            disabled={!stripe || processing}
          >
            {processing ? "Processing..." : "Pay"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FundPaymentModal;
