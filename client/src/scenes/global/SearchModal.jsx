import React, {useDeferredValue, useEffect, useRef, useState} from 'react';
import Item from "../../components/Item";
import {makeRequest} from "../../makeRequest";
import {useLocation} from "react-router-dom";

const SearchModal = () => {
    const [data, setData] = useState([])
    const [input, setInput] = useState('');
    const defferedInput = useDeferredValue(input);
    const location = useLocation();
    const modalRef = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const run = async () => {
            const fetchURL = `/items?filters[name][$contains]=${defferedInput}&populate=*`;
            const res = await makeRequest.get(fetchURL);
            setData(res.data.data);
            setLoading(false);
        }
        if (defferedInput.trim() !== '') {
            setLoading(true);
            run().catch(err => console.log(err));
        }
        if (defferedInput.trim() === '')
            setData([]);
    }, [defferedInput]);

    useEffect(() => {
        modalRef.current.close();
    }, [location])


    return (
        <dialog id="search-modal" className="modal" ref={modalRef}>
            <div className="bg-base-100 w-full  rounded-none h-full">
                <div className="flex ">
                    <p className='px-3 hidden md:flex items-center rounded-none text-xl'>
                        <span
                            className={`loading loading-spinner loading-xs ${loading ? 'text-gray-300' : 'text-transparent'}`}></span>
                    </p>
                    <input type="text" onChange={(e) => setInput(e.target.value)}
                           value={input} placeholder='Search Products'
                           className='input py-8 text-lg flex-grow border-0 focus:outline-0 input-bordered rounded-none'/>
                    <button onClick={() => document.getElementById('search-modal').close()}
                            className=' px-4 py-2 text-primary  rounded-none text-5xl'><i
                        className='bi bi-x'></i></button>
                </div>
                {
                    input.trim() !== '' && data.length === 0 && !loading &&
                    <p className="text-2xl pt-10 px-10 ">No Product available for {defferedInput}</p>
                }

                <div
                    className="text-2xl  grid grid-cols-1 md:grid-cols-3 flex-col lg:grid-cols-5 pt-10 gap-10 px-10 ">
                    {
                        data.map((d, i) => <Item key={i} item={d}/>)
                    }
                </div>
            </div>
        </dialog>
    );
};

export default SearchModal;