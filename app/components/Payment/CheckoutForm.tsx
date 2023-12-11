import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/orders/orderApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { FC, useEffect, useState } from "react";
import { styles } from "../styles/style";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import socketIo from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIo(ENDPOINT, { transports: ["websocket"] });

type Props = {
  setOpen: (data: boolean) => void;
  data: any;
  user: any;
};
//

const CheckoutForm: FC<Props> = ({ setOpen, data, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [createOrder, { data: orderData, error, isSuccess }] =
    useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery({
    skip: loadUser ? false : true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      // Show error to your customer (for example, payment details incomplete)
      setMessage(error?.message as string);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      createOrder({ courseId: data._id, paymentInfo: paymentIntent });
    }
  };

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);
      socketId.emit("notification", {
        title: "New order",
        message: `You have a new order from ${data.name}`,
        userId: user._id,
      });
      redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/course-access/${data._id}`);
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error("something went wrong");
      }
    }
  }, [orderData, error]);

  return (
    <form onSubmit={handleSubmit} id="payment-form" className="bg-green">
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />

      <button
        disabled={!stripe || !elements || isLoading}
        className=" !w-[100%] rounded-md "
      >
        <span id="button-text" className={`${styles.button}  mt-2 !h-[35px]`}>
          {isLoading ? "Paying ..." : "Pay Now"}
        </span>
      </button>
      {message && (
        <div id="payment-message" className="text-red font-Poppins pt-2">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
