import React from "react";
import "./Categories.scss";
import {Link} from "react-router-dom";
import tops from '../../../assets/tops.jpg'
import bottoms from "../../../assets/bottoms.jpg"
import jewellery from '../../../assets/jewellery.jpg'
import bags from '../../../assets/bags.jpg'

const Categories = () => {
    return (
        <>
            <p className="text-center text-3xl mb-10">
                Shop by <b>Categories</b>
            </p>
            <div className="grid lg:grid-rows-2 lg:grid-cols-4 lg:gap-5 gap-2 h-[100vh] lg:p-10 px-5 py-10 categories">

                <div className="grid lg:grid-rows-2 lg:gap-y-5 gap-y-2 row-span-2">
                    <Link to="/category/ready-to-wear" className=" overlay-container">
                        <div className="w-full h-full relative"
                             style={{
                                 background: "url(\"https://images.pexels.com/photos/818992/pexels-photo-818992.jpeg?auto=compress&cs=tinysrgb&w=1600\")",
                                 backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"
                             }}>
                            <div className="overlay"
                                 style={{background: "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.4))"}}>
                                <div className="flex uppercase flex-col gap-y-1 items-center gap-0">
                                    <p className=' h-fit text-lg lg:text-2xl font-bold '>
                                        Ready To Wear
                                    </p>
                                    <p className="lg:text-base underline">View Products</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/category/new-arrivals" className=" overlay-container">
                        <div className='w-full h-full relative'
                             style={{
                                 background: "url(\"https://images.pexels.com/photos/2036646/pexels-photo-2036646.jpeg?auto=compress&cs=tinysrgb&w=1600\")",
                                 backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"
                             }}>
                            <div className=" overlay"
                            >
                                <div className="flex uppercase flex-col gap-y-1 items-center gap-0">
                                    <p className=' h-fit text-lg lg:text-2xl font-bold'>
                                        New Arrivals
                                    </p>
                                    <p className="lg:text-base underline">View Products</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <Link to="/category/tops" className="row-span-2 overlay-container">
                    <div className=" h-full w-full relative" style={{
                        background: `url(${tops})`,
                        backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"
                    }}>
                        <div className=" overlay"
                        >
                            <div className="flex uppercase flex-col gap-y-1 items-center gap-0">
                                <p className=' h-fit text-lg lg:text-2xl font-bold'>
                                    Tops
                                </p>
                                <p className="lg:text-base underline">View Products</p>
                            </div>
                        </div>

                    </div>
                </Link>
                <Link to="/category/bottoms" className=" overlay-container ">
                    <div className="relative w-full h-full" style={{
                        background: `url(${bottoms})`,
                        backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center"
                    }}>

                        <div className="overlay"
                        >
                            <div className="flex uppercase flex-col gap-y-1 items-center gap-0">
                                <p className=' h-fit text-lg lg:text-2xl font-bold'>
                                    Bottoms
                                </p>
                                <p className="lg:text-base underline">View Products</p>
                            </div>
                        </div>

                    </div>
                </Link>
                <Link to="/category/jewellery" className=" overlay-container">
                    <div className='relative w-full h-full' style={{
                        background: `url(${jewellery})`,
                        backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"
                    }}>
                        <div className=" overlay"
                        >

                            <div className="flex uppercase flex-col gap-y-1 items-center gap-0">
                                <p className=' h-fit text-lg lg:text-2xl font-bold'>
                                    Jewellery
                                </p>
                                <p className="lg:text-base underline">View Products</p>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link to="/category/bag" className="col-span-2 overlay-container">
                    <div className=" relative w-full h-full " style={{
                        background: `url(${bags})`,
                        backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", backgroundPosition: "center center"
                    }}>
                        <div className=" overlay"
                        >
                            <div className="flex uppercase flex-col gap-y-3 items-center gap-0">
                                <p className=' h-fit text-2xl font-bold'>
                                    Bag
                                </p>
                                <p className="lg:text-base  underline">View Products</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
        ;
};

export default Categories;
