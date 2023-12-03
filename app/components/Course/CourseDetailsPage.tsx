"use client";
import { useGetCourseDetailsQuery } from "@/redux/features/Courses/CoursesApi";
import React, { FC, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import CourseDetails from "./CourseDetails";
import Footer from "../Footer/Footer";
import {
  useCreatePaymentIntentMutation,
  useGetStripePusblishableKeyQuery,
} from "@/redux/features/orders/orderApi";
import { loadStripe } from "@stripe/stripe-js";

type Props = {
  id: string;
};

const CourseDetailsPage: FC<Props> = ({ id }) => {
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePusblishableKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    if (config) {
      const publishableKey = config?.stripePublishableKey;
      setStripePromise(loadStripe(publishableKey));
    }
    if (data) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={`${data?.course?.name}-Elearnign`}
            description={`Nerdemy is the website for all people around the world to learn coding`}
            keywords={data?.course?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          {stripePromise ? (
            <CourseDetails
              data={data?.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
            />
          ) : (
            <></>
          )}

          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
