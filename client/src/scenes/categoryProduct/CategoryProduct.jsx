import React from "react";
import {Link, useParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Item from "../../components/Item";
import Title from "../../components/Title";

const CategoryProduct = () => {
    const {id} = useParams();
    const fetchURL = `/items?filters[category][title]=${id}&populate=*`;
    const {data} = useFetch(fetchURL);

    return (
        <div className="container">
            <Title title={capitalizeText(id, '-')}/>
            <div className="text-sm px-5 lg:px-0 breadcrumbs my-5">
                <ul>
                    <li className='uppercase border-b-2 border-primary px-1 '>
                        <Link className='hover:no-underline' to='/'>Home</Link>
                    </li>
                    <li className="uppercase">{id.split('-').join(' ')}</li>
                </ul>
            </div>
            <div
                className="text-2xl container grid grid-cols-1 md:grid-cols-2 border-t border-gray-200 flex-col lg:grid-cols-4 pt-10 gap-10 px-10 lg:px-0">
                {
                    data && data.map((d, i) => <Item key={i} item={d}/>)
                }
            </div>
        </div>
    );
};

export default CategoryProduct;

export const capitalizeText = (string = "", separator = "-") => {
    const text = string.split(separator);
    let convertedText = text.map((t) => {
        let temp = `${t[0].toUpperCase()}${t.slice(1, t.length)}`;
        return temp;
    });
    return convertedText.join(" ");
};
