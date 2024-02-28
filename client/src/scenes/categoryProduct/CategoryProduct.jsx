import React from 'react';
import {useParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Item from "../../components/Item";

const CategoryProduct = () => {
    const {id} = useParams();
    const {data, loading, error} = useFetch(`/items?populate=image`);
    return (
        <div
            className="text-2xl container lg:grid flex border-t border-gray-200 flex-col lg:grid-cols-4 grid-cols-1 pt-10 gap-10 px-10 items-center lg:px-0">
            {
                data && data.map((d, i) => <Item key={i} item={d}/>)
            }
            {
                data && data.map((d, i) => <Item key={i} item={d}/>)
            }
            {
                data && data.map((d, i) => <Item key={i} item={d}/>)
            }
        </div>
    );
};

export default CategoryProduct;