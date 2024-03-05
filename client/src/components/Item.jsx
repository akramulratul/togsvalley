import {useState} from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {addToCart} from "../state";
import "./Item.scss";

// Import Environment Variables
const API_URL = process.env.REACT_APP_API_URL;
const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL;

const Item = ({item, width}) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const {data, loading, error} = useFetch(`${API_URL}items/${item.id}`);
    const price = data?.attributes?.price ?? item?.attributes?.price;
    const name = data?.attributes?.name ?? item?.attributes?.name;
    const imageUrl = `${UPLOAD_URL}${
        data?.attributes?.image?.data?.attributes?.formats?.medium?.url ??
        item?.attributes?.image?.data?.attributes?.formats?.medium?.url
    }`;


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data</div>;
    }

    return (
        <div>
            <div className="relative">
                <Link to={`/item/${item.id}`} className="add-to-cart-img h-fit w-fit ">
                    <img src={imageUrl} alt="" className=""/>
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
