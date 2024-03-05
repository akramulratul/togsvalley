import {Box, Button, IconButton, Typography} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Item from "../../components/Item";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {shades} from "../../theme";
import {addToCart} from "../../state";
import {useDispatch} from "react-redux";
import useFetch from "../../hooks/useFetch";

const API_URL = process.env.REACT_APP_API_URL;
const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL;
const ItemDetails = () => {
    const dispatch = useDispatch();
    const {itemId} = useParams();
    const [value, setValue] = useState("description");
    const [count, setCount] = useState(1);
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);

    // Fetch item and items details using useFetch or fetch
    const {
        data: itemData,
        loading: itemLoading,
        error: itemError,
    } = useFetch(`${API_URL}items/${itemId}?populate=image`);
    const {
        data: itemsData,
        loading: itemsLoading,
        error: itemsError,
    } = useFetch(`${API_URL}items?populate=image`);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        // getItem();
        // getItems();
    }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

    // Set items after fetching if not using useFetch
    useEffect(() => {
        if (itemData) setItem(itemData);
        if (itemsData) setItems(itemsData);
    }, [itemData, itemsData]);

    // Handle loading and error states for item and items
    if (itemLoading || itemsLoading) {
        return <div>Loading...</div>;
    }

    if (itemError || itemsError) {
        return <div>Error fetching data</div>;
    }

    return (
        <div className="container">
            <div className="text-sm breadcrumbs pb-5 mb-10 border-b">
                <ul>
                    <li className='uppercase  '>
                        <Link className='hover:no-underline border-b-2 border-primary px-2' to='/'>Home</Link>
                    </li>
                    <li className="uppercase">{item?.attributes?.name}</li>
                </ul>
            </div>
            <Box display="flex" flexWrap="wrap" columnGap="40px">
                {/* IMAGES */}
                <Box flex="1 1 40%" mb="40px">
                    <img
                        alt={item?.name}
                        className="h-[70vh] self-center"
                        src={`${UPLOAD_URL}${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}

                    />
                </Box>

                {/* ACTIONS */}
                <Box flex="1 1 50%" mb="40px">
                    <Box m="65px 0 25px 0">
                        <Typography variant="h3">{item?.attributes?.name}</Typography>
                        <Typography>৳ {item?.attributes?.price}</Typography>
                        <Typography sx={{mt: "20px"}}>
                            {item?.attributes?.longDescription}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" minHeight="50px">
                        <Box
                            display="flex"
                            alignItems="center"
                            border={`1.5px solid ${shades.neutral[300]}`}
                            mr="20px"
                            p="2px 5px"
                        >
                            <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                                <RemoveIcon/>
                            </IconButton>
                            <Typography sx={{p: "0 5px"}}>{count}</Typography>
                            <IconButton onClick={() => setCount(count + 1)}>
                                <AddIcon/>
                            </IconButton>
                        </Box>
                        <Button
                            sx={{
                                color: "white",
                                borderRadius: 0,
                                minWidth: "150px",
                                padding: "10px 40px",
                                backgroundColor: "#1a754a",
                                "&:hover": {
                                    backgroundColor: "#2b8e5f", // Lighter green on hover
                                },
                            }}
                            onClick={() => dispatch(addToCart({item: {...item, count}}))}
                        >
                            ADD TO CART
                        </Button>
                    </Box>
                    <Box>

                        <Typography>CATEGORIES: {item?.attributes?.category}</Typography>
                    </Box>
                </Box>
            </Box>

            {/* INFORMATION */}
            <Box m="20px 0">
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="DESCRIPTION" value="description" className="text-base"/>
                    <Tab label="REVIEWS" value="reviews" className="text-base"/>
                </Tabs>
            </Box>
            <Box display="flex" flexWrap="wrap" gap="15px">
                {value === "description" && (
                    <div>{item?.attributes?.longDescription}</div>
                )}
                {value === "reviews" && <div>reviews</div>}
            </Box>

            {/* RELATED ITEMS */}
            <div className="w-full mt-16">
                <p className="font-semibold text-2xl ">Related Products</p>

                <div
                    className="text-2xl container lg:grid flex flex-col lg:grid-cols-4 grid-cols-1 pt-5 gap-10 px-10 items-center lg:px-0">
                    {
                        items.slice(0, 4).map((item, i) => <Item key={`${item.name}-${i}`} item={item}/>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;
