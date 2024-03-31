import {Box} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Item from "../../components/Item";
import {addToCart} from "../../state";
import {useDispatch} from "react-redux";
import useFetch from "../../hooks/useFetch";
import {Carousel} from "react-responsive-carousel";
import "./ItemDetails.scss";
import Title from "../../components/Title";

const API_URL = process.env.REACT_APP_API_URL;
const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL;
const ItemDetails = () => {
    const dispatch = useDispatch();
    const {itemId} = useParams();
    const [value, setValue] = useState("description");
    const [count, setCount] = useState(1);
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);

    const [currentSliderItem, setCurrentSliderItem] = useState();

    // Fetch item and items details using useFetch or fetch
    const {
        data: itemData,
        loading: itemLoading,
        error: itemError,
    } = useFetch(`${API_URL}items/${itemId}?populate=*`);
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
            <Title title={itemData?.attributes.name}/>
            <div className="text-sm breadcrumbs pb-5 mb-10 border-b">
                <ul>
                    <li className="uppercase  ">
                        <Link
                            className="hover:no-underline border-b-2 border-primary px-2"
                            to="/"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="uppercase">{item?.attributes?.name}</li>
                </ul>
            </div>
            <Box display="flex" flexWrap="wrap" columnGap="40px">
                {/* IMAGES */}
                <Box flex="1 1 40%" mb="40px">
                    {itemData?.attributes?.SliderImages?.data ? (
                        <Carousel infiniteLoop={true} showArrows={true} showStatus={false}>
                            <img
                                src={`${UPLOAD_URL}${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                            />
                            {itemData?.attributes?.SliderImages?.data.map((s, i) => (
                                <div key={i}>
                                    <img src={`${UPLOAD_URL}${s?.attributes?.url}`} alt=""/>
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        <img
                            alt={item?.name}
                            className="h-[70vh] self-center"
                            src={`${UPLOAD_URL}${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                        />
                    )}
                </Box>

                {/* ACTIONS */}
                <Box flex="1 1 50%" mb="40px" className='px-5 lg:px-0'>
                    <div className="flex flex-col">
                        <p className="text-2xl">{item?.attributes?.name}</p>
                        {
                            item?.attributes?.DiscountedPrice !== null && item?.attributes?.DiscountedPrice > 0 &&
                            <p className="text-secondary my-2 text-base font-semibold">
                                {item?.attributes?.DiscountedPrice}% off
                            </p>
                        }
                        {
                            item?.attributes?.DiscountedPrice !== null && item?.attributes?.DiscountedPrice > 0 ?
                                <div className='flex items-center gap-x-3 text-center'>
                                    <s><p className='text-sm'>৳ {item?.attributes?.price}</p></s>
                                    <p className='text-base'>৳ {item.attributes.price - (item.attributes.price * (item?.attributes?.DiscountedPrice / 100))}</p>
                                </div>
                                :
                                <p className='text-base'>৳ {item?.attributes?.price}</p>
                        }
                        <p className="my-5">{item?.attributes?.shortDescription}</p>
                    </div>

                    {itemData?.attributes?.AvailableProduct < 1 ? (
                        <p className="border-error border w-fit font-semibold text-base text-error px-3 py-2">
                            Out of Stock
                        </p>
                    ) : (
                        <div className="flex gap-x-5">
                            <div className="join border text-white rounded-sm">
                                <button
                                    onClick={() => setCount(Math.max(count - 1, 0))}
                                    className="join-item btn text-primary hover:bg-primary hover:text-white duration-150 border-transparent bg-white text-xl"
                                >
                                    <i className="bi bi-dash"></i>
                                </button>
                                <p className="text-base  flex items-center join-item w-10 justify-center px-2 bg-white text-primary">
                                    {count}
                                </p>
                                <button
                                    onClick={() => setCount(count + 1)}
                                    className="border-none join-item btn-outline bg-white text-primary hover:bg-primary hover:text-white duration-150 border-transparent btn text-xl "
                                >
                                    <i className="bi bi-plus"></i>
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    dispatch(addToCart({item: {...item, count}}));
                                }}
                                className="btn btn-primary text-white disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-transparent disabled:border-gray-300 font-normal rounded-sm"
                                disabled={count === 0}
                            >
                                <i className="bi bi-cart"></i>Add To Cart
                            </button>
                        </div>
                    )}

                    <Box>
                        {item?.attributes?.category && (
                            <div className="flex gap-x-2 mt-10 text-base">
                                Categories:
                                <div className="flex gap-x-1">
                                    {item?.attributes?.category?.data.map((c, i) =>
                                        c.attributes.title ? (
                                            <p key={i} className="capitalize">
                                                {c.attributes.title.split("-").join(" ")}
                                                {i === item?.attributes?.category?.data.length - 1
                                                    ? "."
                                                    : ","}
                                            </p>
                                        ) : null
                                    )}
                                </div>
                            </div>
                        )}
                    </Box>
                </Box>
            </Box>

            {/* INFORMATION */}
            <Box m="20px 0" className='px-5 lg:px-0'>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="DESCRIPTION" value="description" className="text-base"/>
                    <Tab label="REVIEWS" value="reviews" className="text-base"/>
                </Tabs>
            </Box>
            <Box display="flex" flexWrap="wrap" gap="15px" className='px-5 lg:px-0'>
                {value === "description" && (
                    <div>{item?.attributes?.longDescription}</div>
                )}
                {value === "reviews" && <div>reviews</div>}
            </Box>

            {/* RELATED ITEMS */}
            <div className="w-full mt-16">
                <p className="font-semibold text-2xl px-5 lg:px-0">Related Products</p>

                <div
                    className="text-2xl container lg:grid flex flex-col lg:grid-cols-4 grid-cols-1 pt-5 gap-10 px-10 items-center lg:px-0">
                    {items.slice(0, 4).map((item, i) => (
                        <Item key={`${item.name}-${i}`} item={item}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;
