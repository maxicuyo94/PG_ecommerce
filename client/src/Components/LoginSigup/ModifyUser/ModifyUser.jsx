import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./modifyproduct.module.scss";

export function ModifyUser({ id }) {
    const [dataUser, setDataUser] = useState({
        name: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
    });
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleInputChange = (e) => {
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        (function getCatAndProd() {
            //   dispatch(userDetail(id));
        })()
    }, [id]);

    useEffect(() => {
        setDataUser({
            // name: "",
            // lastName: "", 
            // email: "",
            // userName: "",
            // password: "",
        });
    }, [user]);

    const modifyProduct = async () => {
        // await dispatch(updateUser(dataUser, id));
    };


    return (
        <div>
            <form class={style.form}>
                <h1>Modify User</h1>
                <div>
                    <label class={style.label}>Name</label>
                    <input class={style.input} type="text" value={dataUser.name} name="name" onChange={(e) => handleInputChange(e)}></input>
                </div>
                <div>
                    <label class={style.input}>Lastname</label>
                    <textarea name="lastName" rows="6" cols="40" value={dataUser.lastName} onChange={(e) => handleInputChange(e)}
                    ></textarea>
                </div>
                <div>
                    <label>Email</label>
                    <input class={style.input} name="email" value={dataUser.email} onChange={(e) => handleInputChange(e)}
                    ></input>
                </div>
                <div>
                    <label>UserName</label>
                    <input class={style.input} name="userName" value={dataUser.userName} onChange={(e) => handleInputChange(e)}
                    ></input>
                </div>
                <div>
                    <label>Password</label>
                    <input class={style.input} name="password" value={dataUser.password} onChange={(e) => handleInputChange(e)}></input>
                </div>
            </form>
        </div>
    );
}