import {getIn} from "formik";
import {Box, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {capitalizeText} from "../categoryProduct/CategoryProduct";

const address = require("@bangladeshi/bangladesh-address");

const AddressForm = ({
                         type,
                         values,
                         touched,
                         errors,
                         handleBlur,
                         handleChange,
                     }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    // these functions allow for better code readability
    const formattedName = (field) => `${type}.${field}`;
    const [cities, setCities] = useState([]);
    const [thanas, setThanas] = useState([]);
    const [insideDhakaAddress, setInsideDhaka] = useState([]);
    const deliveryAddress = useSelector((state) => state.cart.deliveryFee);
    const dispatch = useDispatch();


    useEffect(() => {
        setCities(address.allDistict());
    }, []);

    useEffect(() => {
        setThanas(address.upazilasOf(values.city));
    }, [values]);

    useEffect(() => {
        const run = async () => {
            const {data} = await axios.get('/DhakaLocation.json');
            const dhakaAddress = data.filter((d) => d.District === 'Dhaka');
            setInsideDhaka(dhakaAddress);
        }

        run().catch(err => console.log(err));
    }, []);

    const formattedError = (field) =>
        Boolean(
            getIn(touched, formattedName(field)) &&
            getIn(errors, formattedName(field))
        );

    const formattedHelper = (field) =>
        getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

    return (
        <Box
            display="grid"
            gap="15px"
            gridTemplateColumns="repeat(6, minmax(0, 1fr))"
            sx={{
                "& > div": {gridColumn: isNonMobile ? undefined : "span 6"},
            }}
        >
            <TextField
                fullWidth
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                name={formattedName("userName")}
                error={formattedError("userName")}
                helperText={formattedHelper("userName")}
                sx={{gridColumn: "span 6"}}
            />
            <TextField
                fullWidth
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{gridColumn: "span 6", marginBottom: "15px"}}
            />
            <TextField
                fullWidth
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{gridColumn: "span 6"}}
            />
            <TextField
                fullWidth
                type="text"
                label="Address"
                value={capitalizeText(deliveryAddress.address, '-')}
                sx={{gridColumn: `${deliveryAddress.address === 'inside-dhaka' ? "span 3" : "span 2"}`}}
                disabled={true}
            />
            {
                deliveryAddress.address === 'inside-dhaka' &&
                <>

                    <Select
                        fullWidth
                        type="text"
                        label="City"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{gridColumn: "span 3"}}
                        defaultValue=""
                    >
                        {insideDhakaAddress.map((c, i) => {
                                return <MenuItem value={c.Post_Office} key={i}>
                                    {c.Post_Office}
                                </MenuItem>
                            }
                        )}
                    </Select>
                </>

            }
            {
                deliveryAddress.address === 'outside-dhaka' &&
                <>
                    <Select
                        fullWidth
                        type="text"
                        label="City"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.city}
                        name={formattedName("city")}
                        error={formattedError("city")}
                        helperText={formattedHelper("city")}
                        sx={{gridColumn: "span 2"}}
                        defaultValue=""
                    >
                        {cities.map((c, i) => {
                                if (c === "Dhaka") return;
                                return <MenuItem value={c} key={i}>
                                    {c}
                                </MenuItem>
                            }
                        )}
                    </Select>

                    <Select
                        fullWidth
                        type="text"
                        label="Thana"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.thana}
                        name={formattedName("thana")}
                        error={formattedError("thana")}
                        helperText={formattedHelper("thana")}
                        sx={{gridColumn: "span 2"}}
                        defaultValue=""
                    >
                        {thanas.map((c, i) => (
                            <MenuItem value={c.upazila} key={i}>
                                {c.upazila}
                            </MenuItem>
                        ))}
                    </Select>
                </>
            }
            <TextField
                fullWidth
                type="text"
                label="Your Address"
                onBlur={handleBlur}
                onChange={handleChange}
                // value={values.location}
                name="address"
                sx={{gridColumn: "span 6"}}
            />
        </Box>
    );
};

export default AddressForm;
