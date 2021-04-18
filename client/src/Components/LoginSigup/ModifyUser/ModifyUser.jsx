import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from '../../../Redux/Actions/actionsUser'
import style from "./modifyproduct.module.scss";

export function ModifyUser({ id }) {
    const [dataUser, setDataUser] = useState({
        name: "",
        surname: "",
        email: "",
        username: "",
        password: "",
        phone: "",
        permission: "",
    });
    const dispatch = useDispatch();
    const userDetail = useSelector((state) => state.userDetail);


    // useEffect(() => {
    // (function getCatAndProd() {
    //     dispatch(userDetail(id));
    // })()
    // }, [id]);

    // useEffect(() => {
    //     setDataUser({
    //         name: userDetail.name,
    //         surname: userDetail.surname,
    //         email: userDetail.email,
    //         username: userDetail.username,
    //         password: userDetail.password,
    //         phone: userDetail.phone,
    //     });
    // }, [userDetail]);


    const handleInputChange = (e) => {
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value,
        });
    };

    const change = async () => {
        await dispatch(updateUser(dataUser, id));
    };
console.log(id)

    return (
        <form className={style.container}>
            <h1>Modify User</h1>
            <div>
                <label  htmlFor="name">Name</label>
                <input type="text" name="name" placeholder="Name" value={dataUser.name} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="surname">Surname</label>
                <input type="text" name="surname" placeholder="Surname" value={dataUser.lastname} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="userName">UserName</label>
                <input type="text" name="userName" placeholder="Username" value={dataUser.userName} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input type="text" name="phone" placeholder="Phone" value={dataUser.phone} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input type="text" name="address" placeholder="Address" value={dataUser.address} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="city">City</label>
                <input type="text" name="city" placeholder="Username" value={dataUser.city} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="postal_code">Postal Code</label>
                <input type="text" name="postal_code" placeholder="Username" value={dataUser.postal_code} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="country">Country</label>
                <input type="text" name="country" placeholder="Username" value={dataUser.country} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="permission">Permission</label>
                <input type="text" name="permission" placeholder="Permission" value={dataUser.permission} onChange={handleInputChange} />
            </div>
            <div>
                <label>Password</label>
                <input name="password" value={dataUser.password} onChange={(e) => handleInputChange(e)}></input>
            </div>
            <button type="button" onClick={change}>SignUp</button>
        </form>
    );
}