import {useState} from "react";
import {useDispatch} from "react-redux";
import {useTheme} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {addToCart} from "../state";
import "./Item.scss";

// Import Environment Variables
const API_URL = process.env.REACT_APP_API_URL;
const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL;

const Item = ({item, width}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const {data, loading, error} = useFetch(`${API_URL}items/${item.id}`);
    const {
        palette: {neutral},
    } = useTheme();
    // console.log("Data", item);
    const featured = data?.attributes?.featured ?? item?.attributes?.featured;
    const price = data?.attributes?.price ?? item?.attributes?.price;
    const name = data?.attributes?.name ?? item?.attributes?.name;
    const imageUrl = `${UPLOAD_URL}${
        data?.attributes?.image?.data?.attributes?.formats?.medium?.url ??
        item?.attributes?.image?.data?.attributes?.formats?.medium?.url
    }`;

    const images = data?.attributes?.images?.data?.map(
        (img) => `${UPLOAD_URL}${img.attributes.formats.medium.url}`
    ) ?? [
        `${UPLOAD_URL}${data?.attributes?.image?.data?.attributes?.formats?.medium?.url}`,
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data</div>;
    }

    return (
        // <Box width={width}>
        //     <Box
        //         position="relative"
        //         onMouseOver={() => setIsHovered(true)}
        //         onMouseOut={() => setIsHovered(false)}
        //     >
        //         <img
        //             alt={item.name}
        //             width="300px"
        //             height="400px"
        //             src={imageUrl} // Use imageUrl here
        //             onClick={() => navigate(`/item/${item.id}`)}
        //             style={{cursor: "pointer"}}
        //         />
        //         <Box
        //             display={isHovered ? "block" : "none"}
        //             position="absolute"
        //             bottom="10%"
        //             left="0"
        //             width="100%"
        //             padding="0 5%"
        //         >
        //             <Box display="flex" justifyContent="space-between">
        //                 <Box
        //                     display="flex"
        //                     alignItems="center"
        //                     backgroundColor={shades.neutral[100]}
        //                     borderRadius="3px"
        //                 >
        //                     <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
        //                         <RemoveIcon/>
        //                     </IconButton>
        //                     <Typography color={shades.primary[300]}>{count}</Typography>
        //                     <IconButton onClick={() => setCount(count + 1)}>
        //                         <AddIcon/>
        //                     </IconButton>
        //                 </Box>
        //                 <Button
        //                     onClick={() => {
        //                         dispatch(addToCart({item: {...item, count}}));
        //                     }}
        //                     sx={{
        //                         backgroundColor: shades.primary[300],
        //                         color: "white",
        //                         "&:hover": {
        //                             backgroundColor: "#7e7e7e", // Lighter green on hover
        //                         },
        //                     }}
        //                 >
        //                     Add to Cart
        //                 </Button>
        //             </Box>
        //         </Box>
        //     </Box>
        //
        //     <Box mt="3px">
        //         <Typography variant="subtitle2" color={neutral.dark}>
        //             {featured
        //                 .replace(/([A-Z])/g, " $1")
        //                 .replace(/^./, (str) => str.toUpperCase())}
        //         </Typography>
        //         <Typography className="text-base">{name}</Typography>
        //         <Typography className="text-base" fontWeight="bold">৳ {price}</Typography>
        //     </Box>
        // </Box>

        <div>
            <div className="relative">
                <Link to={`/item/${item.id}`} className="add-to-cart-img">
                    <img src={imageUrl} alt=""/>
                </Link>
                <div className="absolute w-full bottom-[4%] px-4 flex justify-between add-to-cart-hover">
                    <div className="join text-white rounded-sm">
                        <button onClick={() => setCount(Math.max(count - 1, 1))}
                                className=' join-item btn btn-sm text-primary hover:bg-primary hover:text-white duration-150 border-transparent bg-white text-xl '>
                            <i
                                className='bi bi-dash'></i>
                        </button>
                        <p className='text-base  flex items-center join-item  px-2 bg-white text-primary '>{count}</p>
                        <button onClick={() => setCount(count + 1)}
                                className='border-none join-item bg-white text-primary hover:bg-primary hover:text-white duration-150 border-transparent   btn btn-sm text-xl '>
                            <i
                                className='bi bi-plus'></i>
                        </button>
                    </div>
                    <button onClick={() => {
                        dispatch(addToCart({item: {...item, count}}));
                    }} className="btn btn-sm btn-primary text-white font-normal rounded-sm"><i
                        className='bi bi-cart'></i>Add
                        To Cart
                    </button>
                </div>

            </div>
            <div className="text-center text-lg mt-3">
                <p>{name}</p>
                <p>৳ {price}</p>
            </div>
        </div>
    );
};

export default Item;
