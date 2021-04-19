import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./modifyproduct.module.scss";
import { updateUser } from "../../../Redux/Users/usersActions"

export function ModifyUser({ id }) {
    const dispatch = useDispatch();
    const userLog = useSelector(state => state.usersReducer.userLoged);
    console.log(userLog)
    const [dataUser, setDataUser] = useState({
        id,
        userName: "",
        phone: "",
        address: "",
        city: "",
        postal_code: "",
        country: "",
    });

    const handleInputChange = (e) => {
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        setDataUser({
            id: userLog.id,
            userName: userLog.user_name,
            phone: userLog.phone,
            address: userLog.address && userLog.address[0].address,
            city: userLog.address && userLog.address[0].city,
            postal_code: userLog.address && userLog.address[0].postal_code,
            country: userLog.address && userLog.address[0].country,
        })
    }, [userLog]);

    const modifyUser = (e) => {
        e.preventDefault()
        dispatch(updateUser(dataUser))
    }

    return (
        <div>
            <form class={style.form}>
                <h1>Modify User</h1>
                {/* <Link to={`/controlpanel`}> */}
                <button type="submit" onClick={(e) => modifyUser(e)}>Modify User</button>
                {/* </Link> */}
                <div>
                    <label class={style.label}>User name</label>
                    <input class={style.input} type="text" value={dataUser.userName} name="userName" onChange={(e) => handleInputChange(e)}></input>
                </div>
                <div>
                    <label class={style.input}>Phone</label>
                    <textarea name="phone" rows="6" cols="40" value={dataUser.phone} onChange={(e) => handleInputChange(e)}
                    ></textarea>
                </div>
                <div>
                    <label>Address</label>
                    <input class={style.input} name="address" value={dataUser.address} onChange={(e) => handleInputChange(e)}
                    ></input>
                </div>
                <div>
                    <label>City</label>
                    <input class={style.input} name="city" value={dataUser.city} onChange={(e) => handleInputChange(e)}></input>
                </div>
                <div>
                    <label>Postal code</label>
                    <input class={style.input} name="postal_code" value={dataUser.postal_code} onChange={(e) => handleInputChange(e)}></input>
                </div>
                <div>
                    <label>Country</label>
                    <input class={style.input} name="country" value={dataUser.country} onChange={(e) => handleInputChange(e)}></input>
                </div>

            </form>
        </div>
    );
}