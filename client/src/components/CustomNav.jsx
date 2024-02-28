import React from 'react';
import {NavLink} from "react-router-dom";

const CustomNav = ({title, to}) => {
    return (
        <NavLink to={to} className={({isActive}) =>
            `px-5 uppercase border-b-2  duration-150 ${isActive ? "border-primary" : " border-transparent"}`

        }>
            {title}
        </NavLink>
    );
};

export default CustomNav;