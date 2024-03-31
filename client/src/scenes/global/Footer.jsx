import React from 'react';
import {Link} from "react-router-dom";

function Footer() {
    return (
        <>
            <div className="bg-base-200 mt-20 py-16">
                <div className="container px-5 lg:px-0 text-sm  grid lg:grid-cols-4 gap-x-10 gap-y-10">
                    <div className='flex flex-col gap-y-5'>
                        <div
                        >
                            <img className='w-24' src="/logo.png" alt=""/>
                        </div>
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A consectetur itaque iusto natus?
                            Dignissimos est et ipsa labore odio! Consectetur consequuntur deleniti dignissimos fuga
                            fugiat incidunt neque nisi
                            magnam porro quod.

                        </div>

                    </div>

                    <div className='flex lg:justify-center '>
                        <div className="flex flex-col">
                            <p className='font-semibold text-base lg:mb-10 mb-5'>
                                Our Products
                            </p>
                            <div className="flex gap-y-5 flex-col">
                                <Link className='hover:underline' to='/category/ready-to-wear'>Ready to Wear</Link>
                                <Link className='hover:underline' to='/category/new-arrivals'>New Arrivals</Link>
                                <Link className='hover:underline' to='/category/tops'>Tops</Link>
                                <Link className='hover:underline' to='/category/bottoms'>Bottoms</Link>
                                <Link className='hover:underline' to='/category/jewellery'>Jewellery</Link>
                                <Link className='hover:underline' to='/category/bag'>Bag</Link>
                            </div>
                        </div>
                    </div>


                    <div className='flex flex-col'>
                        <p className='font-semibold text-base lg:mb-10 mb-5'>
                            Contact Us
                        </p>
                        <div className="flex gap-y-5 flex-col">
                            <p className='flex gap-x-2 items-center'><i
                                className='bi text-base bi-envelope'></i> juthifarhana8585@gmail.com
                            </p>
                            <p className='flex gap-x-2 items-center'><i className='bi text-base bi-telephone'></i> +88
                                01676-787433
                            </p>
                            <p className='flex gap-x-2 items-center'>
                                <i className='bi text-xl bi-facebook'></i>
                                <a href='https://www.facebook.com/TogsValley' target='_blank'
                                   className='hover:underline' rel="noreferrer">Togs
                                    Valley</a>
                            </p>

                        </div>


                    </div>

                    <div className="flex gap-y-2 flex-col">
                        <p className='font-semibold text-base  mb-5'>Subscribe to our newsletter</p>
                        <div className="flex">

                            <input type="text"
                                // className='p-3 bg-transparent border-b focus:outline-0'
                                   className='input flex-grow focus:outline-0 input-bordered bg-transparent rounded-none text-sm'
                                   placeholder='Your email'/>
                            <button
                                className='btn btn-primary text-xs rounded-none text-white font-normal'>Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Footer;
