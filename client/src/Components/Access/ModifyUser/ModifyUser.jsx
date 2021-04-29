import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./ModifyUser.module.scss";
import { updateUser, getUser, sendMail, deactivate, mailActivate, activate, userLogOut } from "../../../Redux/Users/usersActions";
import { EditUsers } from "./EditUsers/EditUsers"

export function ModifyUser({ id, dark }) {
  const dispatch = useDispatch();
  const userLog = useSelector((state) => state.usersReducer.userLoged);
  const userConfig = useSelector((state) => state.usersReducer.userConfig)
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

  console.log(id)

  useEffect(() => {
    if (id) {
      const gUser = async () => {
        await dispatch(getUser(id))
      }
      gUser()
    }
  }, [])



  useEffect(() => {
    if (id) {
      setDataUser({
        id: userConfig.id,
        userName: userConfig.user_name,
        phone: userConfig.phone,
        address: userConfig.address && userConfig.address[0].address,
        city: userConfig.address && userConfig.address[0].city,
        postal_code: userConfig.address && userConfig.address[0].postal_code,
        country: userConfig.address && userConfig.address[0].country,
        permission: userConfig.permission,
        email: userConfig.email,
        active: userConfig.active
      });
    } else {
      userLog &&
        setDataUser({
          id: userLog.id,
          userName: userLog.user_name,
          phone: userLog.phone,
          address: userLog.address && userLog.address[0].address,
          city: userLog.address && userLog.address[0].city,
          postal_code: userLog.address && userLog.address[0].postal_code,
          country: userLog.address && userLog.address[0].country,
          active: userLog.active
        });
    }
  }, [userLog, userConfig]);

  const resetPassword = () => {
    dispatch(sendMail(dataUser.email));

  }

  const modifyUser = (e) => {
    e.preventDefault();
    dispatch(updateUser(dataUser));
  };

  const deactivateUser = (e) => {
    e.preventDefault();
    dispatch(deactivate(dataUser.id,dataUser.userName));
    //hay que poner el boton para un usuario pueda querer activar la cuenta, en algun lugar
    //donde pueda acceder, porque cuando aprete este deactiveuser, se va a desloguear
    //y no va a volver a poder entrar a su perfil.
    //dispatch(userLogOut())
  }

  const activateUser = (e) => {
    e.preventDefault();
    dispatch(mailActivate(dataUser.id,dataUser.userName));
  }

  const activateUserFromAdmin = () => {
    dispatch(activate(dataUser.id))
  }

  console.log(dataUser.active)

  return (
    <div className={dark ? style.containerDark : style.container}>
      <div className={style.user}>
        <div className={style.title}>
          <span>Modify User</span>
        </div>
        <form class={style.form}>
          <div className={style.name}>
            <label>User name</label>
            <input
              type="text"
              value={dataUser.userName}
              name="userName"
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>

          <div className={style.phone}>
            <label>Phone</label>
            <input
              value={dataUser.phone}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>

          <div className={style.address}>
            <label>Address</label>
            <input
              name="address"
              value={dataUser.address}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>

          <div className={style.city}>
            <label>City</label>
            <input
              name="city"
              value={dataUser.city}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>

          <div className={style.postal}>
            <label>Postal code</label>
            <input
              name="postal_code"
              value={dataUser.postal_code}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>

          <div className={style.country}>
            <label>Country</label>
            <input
              class={style.input}
              name="country"
              value={dataUser.country}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>
          {
            (userLog.permission === "superadmin" || userLog.permission === "admin") && (dataUser.id !== userLog.id) &&
            (
              <>
                <div className={style.permission}>
                  <label>Permission</label>
                  <label>{dataUser.permission}</label>
                  <EditUsers permission={dataUser.permission} id={dataUser.id} />
                </div>
                <div className={style.email}>
                  <label>Reset Password</label>
                  <label>{dataUser.email}</label>
                  <button className={style.simpleButton} type="button" onClick={(e) => resetPassword(e)}>
                    Reset Email
                  </button>
                </div>
              </>
            )
          }

          {/* <Link to={`/controlpanel`}> */}
          <button type="submit" onClick={(e) => modifyUser(e)}>
            Modify User
          </button>
          {
            (dataUser.id !== userLog.id &&
              (userLog.permission === "superadmin" || userLog.permission === "admin") &&
              !dataUser.active
            )
              ?
              <button type="submit" onClick={(e) => activateUserFromAdmin(e)}>
                Activate account from admin
          </button> :
              null,
            !id && (dataUser.active ?
              <button type="submit" onClick={(e) => deactivateUser(e)}>
                Deactivate account
            </button>
              :
              <button type="submit" onClick={(e) => activateUser(e)}>
                Activate account
            </button>)
          }
          {/* </Link> */}
        </form>
      </div>
    </div>
  );
}
