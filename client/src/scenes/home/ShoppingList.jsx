import React, {useEffect, useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import {Typography} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useDispatch, useSelector} from "react-redux";
import {setItems} from "../../state";
import useFetch from "../../hooks/useFetch";

const ShoppingList = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("all");
    const {data, loading, error} = useFetch(`/items?populate=image`); // Use the hook to fetch items
    const items = useSelector((state) => state.cart.items);
    const breakPoint = useMediaQuery("(min-width:600px)");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (data) {
            dispatch(setItems(data));
        }
    }, [data, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data</div>;
    }

    const topRatedItems = items.filter(
        (item) => item.attributes.category === "topRated"
    );
    const newArrivalsItems = items.filter(
        (item) => item.attributes.category === "newArrivals"
    );
    const bestSellersItems = items.filter(
        (item) => item.attributes.category === "bestSellers"
    );

    return (
        <Box width="80%" margin="80px auto">
            <Typography textAlign="center" className="text-3xl">
                Our Featured <b>Products</b>
            </Typography>
            <Tabs
                textColor="primary"
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{sx: {display: breakPoint ? "block" : "none"}}}
                sx={{
                    m: "25px",
                    "& .MuiTabs-flexContainer": {
                        flexWrap: "wrap",
                    },
                }}
            >
                <Tab className="text-base" label="ALL" value="all"/>
                <Tab className="text-base" label="NEW ARRIVALS" value="newArrivals"/>
                <Tab className="text-base" label="BEST SELLERS" value="bestSellers"/>
                <Tab className="text-base" label="TOP RATED" value="topRated"/>
            </Tabs>
            <Box
                margin="0 auto"
                display="grid"
                gridTemplateColumns="repeat(auto-fill, 300px)"
                justifyContent="space-around"
                rowGap="20px"
                columnGap="1.33%"
            >
                {value === "all" &&
                    items.map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`}/>
                    ))}
                {value === "newArrivals" &&
                    newArrivalsItems.map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`}/>
                    ))}
                {value === "bestSellers" &&
                    bestSellersItems.map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`}/>
                    ))}
                {value === "topRated" &&
                    topRatedItems.map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`}/>
                    ))}
            </Box>
        </Box>
    );
};

export default ShoppingList;
