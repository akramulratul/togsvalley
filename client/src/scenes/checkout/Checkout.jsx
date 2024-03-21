import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Shipping from "./Shipping";
import accepted from "../../assets/accepted.png";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import { useDispatch } from "react-redux";
import { clearCart } from "../../state/index";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFormSubmit = async (values, actions) => {
    console.log("city name", values);
    // Assuming your Strapi endpoint is http://localhost:1337/api/orders
    const strapiEndpoint = "http://localhost:1337/api/orders";
    const { billingAddress, shippingAddress, email, phoneNumber, address } =
      values;

    // Flatten the values if the shipping address is the same
    const orderData = shippingAddress.isSameAddress
      ? {
          userName: billingAddress.userName,
          email: email,
          phoneNumber: phoneNumber,
          city: billingAddress.city,
          thana: billingAddress.thana,
          address: address,

          // Add other billing address fields
        }
      : {
          // Handle the case where the shipping address is different
          // You will need to flatten shipping address fields similarly
        };

    // Add the products information from the cart
    orderData.products = cart.map(({ id, count }) => ({
      id: id,
      count: count,
    }));

    const requestBody = { data: orderData };

    // Log the requestBody to the console
    console.log("Request Body:", requestBody);

    try {
      const response = await fetch(strapiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // If your Strapi application requires authentication, you'll need to add an Authorization header
          // 'Authorization': 'Bearer YOUR_TOKEN_HERE',
          Authorization:
            "Bearer c773b2a2d58bb0a79e114032376e4b4895a6d94a4cdb5104e463f981917d6fc02c610a35754cbf9229d989086cf337b66631a617cefcb69128f2d1384143950ace23a5b6227eb99502813bb91078b2da9c88fae93b97c61d76954a288fc442f64115f871db560dfe3e6c3fe73d3892a4d2bdc8ab0dc97d235205a727c25592b8",
        },
        body: JSON.stringify({ data: orderData }), // Strapi v4 expects the payload under a "data" key
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Successfully posted data to Strapi:", responseData);
      dispatch(clearCart());
      navigate("/success");
      // Perform any follow-up actions after successful submission
      // For example, navigate to a different page or show a success message
    } catch (error) {
      console.error("Error posting data to Strapi:", error);
      // Handle error conditions, such as showing an error message to the user
    }

    actions.setTouched({});
  };

  return (
    <Box width="80%" m="100px auto">
      <Title title="Checkout" />
      <Box>
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Shipping
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />

              <Box display="flex" justifyContent="space-between" gap="50px">
                <button className="btn rounded-sm btn-primary flex-grow text-white">
                  Place Order
                </button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
      {/* <dialog id="paymentSuccess" className="modal">
        <div className="modal-box py-20 flex flex-col items-center">
          <img src={accepted} className="w-36" alt="" />
          <p className="py-4 text-xl">Your payment has been completed!</p>
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={() => navigate("/")}
                className="btn btn-primary text-white font-normal"
              >
                Back to home
              </button>
            </form>
          </div>
        </div>
      </dialog> */}
    </Box>
  );
};

const initialValues = {
  billingAddress: {
    city: "",
    thana: "",
    // location: "",
    userName: "",
  },
  shippingAddress: {
    isSameAddress: true,
    city: "",
    thana: "",
    // location: "",
    userName: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      // country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

export default Checkout;
