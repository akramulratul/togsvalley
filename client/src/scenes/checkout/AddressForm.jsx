import {getIn} from "formik";
import {Box, Input, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useEffect, useState} from "react";


const address = require('@bangladeshi/bangladesh-address');

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

    // const {values} = useFormikContext();

    useEffect(() => {
        setCities(address.allDistict());
    }, []);

    useEffect(() => {
        setThanas(address.upazilasOf(values.city));
        // console.log(address.upazilasOf(values.city))
    }, [values]);


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
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
                "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
            }}
        >
            <TextField
                fullWidth
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name={formattedName("firstName")}
                error={formattedError("firstName")}
                helperText={formattedHelper("firstName")}
                sx={{gridColumn: "span 4"}}
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
                sx={{gridColumn: "span 4", marginBottom: "15px"}}
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
                sx={{gridColumn: "span 4"}}
            />

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
                {
                    cities.map((c, i) => <MenuItem value={c} key={i}>{c}</MenuItem>)
                }
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
                {
                    thanas.map((c, i) => <MenuItem value={c.upazila} key={i}>{c.upazila}</MenuItem>)
                }
            </Select>

            <Input aria-label="minimum height" minRows={3} placeholder="Your Address"
                   sx={{gridColumn: "span 4"}}/>
            {/*<textarea className="textarea textarea-bordered"></textarea>*/}


        </Box>
    );
};

export default AddressForm;
