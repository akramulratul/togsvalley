import React from 'react';
import {Link, useParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Item from "../../components/Item";

const CategoryProduct = () => {
    const {id} = useParams();
    const {data, loading, error} = useFetch(`/items?populate=image`);
    return (
        <div className="container">
            <div className="text-sm breadcrumbs my-5">
                <ul>
                    <li className='uppercase border-b-2 border-primary px-1 '>
                        <Link className='hover:no-underline' to='/'>Home</Link>
                    </li>
                    <li className="uppercase">{id.split('-').join(' ')}</li>
                </ul>
            </div>
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
        </div>
    );
};

export default CategoryProduct;