import {Box, Divider, IconButton, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import {shades} from "../../theme";
import {changeDeliveryAddress, decreaseCount, increaseCount, removeFromCart, setIsCartOpen,} from "../../state";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const FlexBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL;
const CartMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const deliAddress = useSelector((state) => state.cart.deliveryFee);
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);
    const [deliveryFee, setDeliveryFee] = useState(deliAddress);
    const location = useLocation();

    // useEffect(() => {
    //     dispatch(setIsCartOpen({}));
    // }, [location])


    useEffect(() => {
        dispatch(changeDeliveryAddress(deliveryFee));
    }, [deliveryFee, dispatch]);


    const totalPrice = cart.reduce((total, item) => {
        if (item.attributes.DiscountedPrice !== 'null' && item.attributes.DiscountedPrice > 0)
            return total + item.count * (item.attributes.price - (item.attributes.price * (item?.attributes?.DiscountedPrice / 100)));
        return total + item.count * item.attributes.price;
    }, 0);
    return (
        <Box
            // display={isCartOpen ? "block" : "none"}
            backgroundColor="rgba(0, 0, 0, 0.4)"
            position="fixed"

            width="100%"
            height="100%"
            left="0"
            top="0"
            overflow="auto"
            className={`block ${isCartOpen ? 'z-[100] opacity-1' : 'z-[-1] opacity-0'}`}

        >
            <div className="relative h-full w-full">
                <Box
                    width="max(400px, 30%)"
                    height="100%"
                    backgroundColor="white"
                    className={`absolute top-0 duration-300  ${isCartOpen ? 'right-0' : 'right-[-100%]'}`}
                >
                    <Box padding="30px" overflow="auto" height="100%">
                        {/* HEADER */}
                        <FlexBox mb="15px">
                            <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
                            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                                <CloseIcon/>
                            </IconButton>
                        </FlexBox>

                        {/* CART LIST */}
                        <Box>
                            {cart.map((item) => (
                                <Box key={`${item.attributes.name}-${item.id}`}>
                                    <FlexBox p="15px 0">
                                        <Box flex="1 1 40%">
                                            <img
                                                alt={item?.name}
                                                width="123px"
                                                height="164px"
                                                src={`${UPLOAD_URL}${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                                            />
                                        </Box>
                                        <Box flex="1 1 60%">
                                            <FlexBox mb="5px">
                                                <Link to={`/item/${item.id}`} className='text-base font-semibold'>
                                                    {item.attributes.name}
                                                </Link>
                                                <IconButton
                                                    onClick={() =>
                                                        dispatch(removeFromCart({id: item.id}))
                                                    }
                                                >
                                                    <CloseIcon/>
                                                </IconButton>
                                            </FlexBox>

                                            {
                                                item?.attributes?.DiscountedPrice !== null && item?.attributes?.DiscountedPrice > 0 ?
                                                    <div
                                                        className='flex items-center gap-x-3 text-center '>
                                                        <s><p className='text-sm'>৳ {item.attributes.price}</p></s>
                                                        <p className='text-base'>৳ {item.attributes.price - (item.attributes.price * (item?.attributes?.DiscountedPrice / 100))}</p>
                                                    </div>
                                                    :
                                                    <p className='text-base'>৳ {item.attributes.price}</p>
                                            }

                                            <FlexBox m="15px 0">
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                    border={`1.5px solid ${shades.neutral[500]}`}
                                                >
                                                    <IconButton
                                                        onClick={() =>
                                                            dispatch(decreaseCount({id: item.id}))
                                                        }
                                                    >
                                                        <RemoveIcon/>
                                                    </IconButton>
                                                    <Typography>{item.count}</Typography>
                                                    <IconButton
                                                        onClick={() =>
                                                            dispatch(increaseCount({id: item.id}))
                                                        }
                                                    >
                                                        <AddIcon/>
                                                    </IconButton>
                                                </Box>
                                                <Typography fontWeight="bold">
                                                    {
                                                        item?.attributes?.DiscountedPrice !== null && item?.attributes?.DiscountedPrice > 0 ?
                                                            <p>৳ {(item.attributes.price - (item.attributes.price * (item?.attributes?.DiscountedPrice / 100))) * item.count}</p>
                                                            :
                                                            <p>৳ {item.attributes.price * item.count}</p>
                                                    }
                                                </Typography>
                                            </FlexBox>
                                        </Box>
                                    </FlexBox>
                                    <Divider/>
                                </Box>
                            ))}
                        </Box>

                        {
                            cart.length > 0 &&
                            <div className="grid grid-cols-2  items-center justify-between py-7">
                                <p>Delivery Fee</p>
                                <div className="flex flex-col">
                                    <form className="grid grid-cols-5 gap-x-5 gap-y-3">
                                        <label htmlFor="inside-dhaka" className="cursor-pointer text-right col-span-4">
                                            Inside Dhaka: <span
                                            className='text-primary font-semibold'>৳60</span></label>
                                        <div className="flex justify-end">
                                            <input onClick={() => setDeliveryFee({
                                                    address: "inside-dhaka",
                                                    price: '60'
                                                }
                                            )} type="radio" name="delivery-fee"
                                                   value={60}
                                                   className="radio radio-sm radio-primary"
                                                   id="inside-dhaka" defaultChecked/></div>
                                        <label htmlFor="outside-dhaka" className="cursor-pointer col-span-4 text-right">Outside
                                            Dhaka: <span className='text-primary font-semibold'>৳120</span></label>
                                        <div className="flex justify-end">
                                            <input onClick={() => setDeliveryFee({
                                                    address: "outside-dhaka",
                                                    price: '120'
                                                }
                                            )} type="radio" name="delivery-fee"
                                                   value={120}
                                                   className="radio radio-sm radio-primary"
                                                   id="outside-dhaka"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        }
                        {/* ACTIONS */}
                        <div className="border-t text-sm flex flex-col">

                            <div className='flex justify-between my-5'>
                                <div className="flex flex-col gap-y-1 justify-end">

                                    <p className='font-bold text-base mt-2'>SUBTOTAL</p>
                                </div>
                                {
                                    cart.length === 0 ?
                                        <p className='font-bold'>৳{totalPrice}</p> :
                                        <p className='font-bold '>৳{totalPrice + +deliAddress.price}</p>
                                }

                            </div>
                            <button className='btn btn-primary w-full text-white font-medium mt-5 rounded-none'
                                    onClick={() => {
                                        navigate("/checkout");
                                        dispatch(setIsCartOpen({}));
                                    }}
                            >
                                CHECKOUT
                            </button>

                        </div>
                    </Box>
                </Box>
            </div>


        </Box>
    );
};

export default CartMenu;
