import {Box, Button, Divider, IconButton, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import {shades} from "../../theme";
import {decreaseCount, increaseCount, removeFromCart, setIsCartOpen,} from "../../state";
import {useNavigate} from "react-router-dom";

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
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);

    const totalPrice = cart.reduce((total, item) => {
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
                                                <Typography fontWeight="bold">
                                                    {item.attributes.name}
                                                </Typography>
                                                <IconButton
                                                    onClick={() =>
                                                        dispatch(removeFromCart({id: item.id}))
                                                    }
                                                >
                                                    <CloseIcon/>
                                                </IconButton>
                                            </FlexBox>
                                            <Typography>{item.attributes.shortDescription}</Typography>
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
                                                    $ {item.attributes.price}
                                                </Typography>
                                            </FlexBox>
                                        </Box>
                                    </FlexBox>
                                    <Divider/>
                                </Box>
                            ))}
                        </Box>

                        {/* ACTIONS */}
                        <Box m="20px 0">
                            <FlexBox m="20px 0">
                                <Typography fontWeight="bold">SUBTOTAL</Typography>
                                <Typography fontWeight="bold">৳{totalPrice}</Typography>
                            </FlexBox>
                            <Button
                                sx={{
                                    backgroundColor: shades.primary[400],
                                    "&:hover": {
                                        backgroundColor: "#7e7e7e", // Lighter green on hover
                                    },
                                    color: "white",
                                    borderRadius: 0,
                                    minWidth: "100%",
                                    padding: "20px 40px",
                                    m: "20px 0",
                                }}
                                onClick={() => {
                                    navigate("/checkout");
                                    dispatch(setIsCartOpen({}));
                                }}
                            >
                                CHECKOUT
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </div>
        </Box>
    );
};

export default CartMenu;
