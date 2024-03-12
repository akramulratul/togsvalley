import React from 'react';

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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <p className='font-semibold text-base lg:mb-10 mb-5'>
                            About Us
                        </p>
                        <div className="flex gap-y-5 flex-col">
                            <p>Careers</p>
                            <p>Our Stores</p>
                            <p>Terms & Conditions</p>
                            <p>Privacy Policy</p>
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <p className='font-semibold text-base lg:mb-10 mb-5'>
                            Customer Care
                        </p>
                        <div className="flex gap-y-5 flex-col">
                            <p>Help Center</p>
                            <p>Track Your Order</p>
                            <p>Corporate & Bulk Purchasing</p>
                            <p>Returns & Refunds</p>
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
                            <div className="flex gap-y-2 flex-col">
                                <p>Subscribe to our newsletter</p>
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
                </div>
            </div>
        </>

    );
}

export default Footer;
