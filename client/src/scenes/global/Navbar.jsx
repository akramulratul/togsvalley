import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink, useLocation} from "react-router-dom";
import {setIsCartOpen} from "../../state";
import CustomNav from "../../components/CustomNav";
import {useEffect, useState} from "react";

const pages = [
    {
        title: "Ready To Wear",
        to: "/category/ready-to-wear"
    },
    {
        title: "New Arrivals",
        to: "/category/new-arrivals"
    },
    {
        title: "Tops",
        to: "/category/tops"
    },
    {
        title: "Bottoms",
        to: "/category/bottoms"
    },
    {
        title: "Jewellery",
        to: "/category/jewellery"
    },
    {
        title: "Bag",
        to: "/category/bag"
    }
]

function Navbar() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const [sidebarHidden, setSidebarHidden] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setSidebarHidden(true);
    }, [location]);

    return (
        <div
            className="flex justify-center  relative pt-3 pb-5 w-full  bg-[rgba(255,255,255,0.95)]  top-0 left-0 z-[100]">
            <div
                className="container w-full flex flex-col items-center">
                <div className="flex px-5 lg:px-0 relative gap-x-5 items-center lg:justify-between w-full">
                    <button onClick={() => setSidebarHidden(false)} className="btn lg:hidden bg-transparent btn-sm ">
                        <i className="bi bi-list text-xl"></i>
                    </button>
                    <div className="lg:flex-grow flex lg:justify-center">
                        <Link to="/">
                            <img src="/logo.png" alt="" className="lg:h-20 h-16 w-fit justify-self-center"/>
                        </Link>
                    </div>
                    <div className="flex absolute right-[10%] lg:right-0 gap-x-2 h-fit self-center">
                        <button className="btn btn-sm lg:btn-md bg-transparent">
                            <i className="bi bi-search text-base"></i>
                        </button>
                        <div>
                            <div className="indicator">
                                <span className="indicator-item badge badge-primary">{cart.length}</span>
                                <button className="btn btn-sm lg:btn-md bg-transparent"
                                        onClick={() => dispatch(setIsCartOpen({}))}>
                                    <i className="bi bi-cart text-base"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="lg:flex hidden mt-10 gap-x-10 text-base">
                    {
                        pages.map((p, i) => <CustomNav key={i} {...p}/>)
                    }
                </div>
            </div>
            <div
                className={`bg-base-100 lg:hidden fixed z-[100] h-[100vh] top-[0%] shadow-2xl shadow-gray-600 left-0 ${sidebarHidden ? "translate-x-[-150%]" : "translate-x-0"} duration-300 w-[85%]  shadow-xl gap-x-10 text-base`}>
                <div className="flex pt-5 items-center justify-between w-full">
                    {/*<img src="/logo.png" className="ms-5 mb-5 w-16" alt=""/>*/}
                    <p className="text-2xl font-medium ps-4">Categories</p>
                    <button onClick={() => setSidebarHidden(true)}
                            className=" text-primary text-5xl w-fit h-fit self-start me-3">
                        <i
                            className="bi bi-x"></i>
                    </button>
                </div>
                <div className="pb-10 pt-7  flex flex-col text-lg h-full">
                    {
                        pages.map((p, i) => <NavLink
                            className={`py-5 px-4 ${i !== 0 ? 'border-t' : ""} ${i + 1 === pages.length ? 'border-b' : ''}`}
                            key={i}
                            to={p.to}>{p.title}</NavLink>)
                    }
                </div>
            </div>

        </div>
    );
}

export default Navbar;
