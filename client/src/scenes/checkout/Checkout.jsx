import {useSelector} from "react-redux";
import {Box} from "@mui/material";
import {Formik} from "formik";
import {useState} from "react";
import * as yup from "yup";
import Payment from "./Payment";
import Shipping from "./Shipping";
import {loadStripe} from "@stripe/stripe-js";
import accepted from "../../assets/accepted.png";
import {useNavigate} from "react-router-dom";

const stripePromise = loadStripe(
    "pk_test_51LgU7yConHioZHhlAcZdfDAnV9643a7N1CMpxlKtzI1AUWLsRyrord79GYzZQ6m8RzVnVQaHsgbvN1qSpiDegoPi006QkO0Mlc"
);

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const cart = useSelector((state) => state.cart.cart);
    const isFirstStep = activeStep === 0;
    const isSecondStep = activeStep === 1;
    const navigate = useNavigate();

    const handleFormSubmit = async (values, actions) => {

        // this copies the billing address onto shipping address

        makePayment(values);


        actions.setTouched({});
    };
    const formChange = (values, action) => {
        console.log(values);
    }

    async function makePayment(values) {
        const stripe = await stripePromise;
        const requestBody = {
            userName: [values.firstName, values.lastName].join(" "),
            email: values.email,
            products: cart.map(({id, count}) => ({
                id,
                count,
            })),
        };

        const response = await fetch("http://localhost:2000/api/orders", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestBody),
        });
        const session = await response.json();
        await stripe.redirectToCheckout({
            sessionId: session.id,
        });
    }

    return (
        <Box width="80%" m="100px auto">

            <Box>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema[activeStep]}

                >
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
                            {isFirstStep && (
                                <Shipping
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />
                            )}
                            {isSecondStep && (
                                <Payment
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />
                            )}
                            <Box display="flex" justifyContent="space-between" gap="50px">
                                <button onClick={() => window.paymentSuccess.showModal()}
                                        className='btn rounded-sm btn-primary flex-grow text-white'>
                                    Place Order
                                </button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
            <dialog id="paymentSuccess" className="modal">
                <div className="modal-box py-20 flex flex-col items-center">
                    <img src={accepted} className="w-36" alt=""/>
                    <p className="py-4 text-xl">Your payment has been completed!</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={() => navigate('/')}
                                    className="btn btn-primary text-white font-normal">Back to home
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </Box>
    );
};

const initialValues = {
    billingAddress: {
        firstName: "",
        lastName: "",
        city: "",
        state: "",
        zipCode: "",
    },
    shippingAddress: {
        isSameAddress: true,
        firstName: "",
        lastName: "",
        city: "",
        state: "",
        zipCode: "",
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
            // country: yup.string().when("isSameAddress", {
            //     is: false,
            //     then: yup.string().required("required"),
            // }),
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
