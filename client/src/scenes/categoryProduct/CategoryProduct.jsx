import React from 'react';
import {useParams} from "react-router-dom";

const CategoryProduct = () => {
    const {id} = useParams();
    return (
        <div className="text-2xl mt-[80px]">
            Category:
            <p>
                {id}
            </p>
        </div>
    );
};

export default CategoryProduct;