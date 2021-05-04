import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './appointment.module.scss'

const Hours = [
    {
        hour: 10,
        id: 0,
    },
    {
        hour: 11,
        id: 1,
    },
    {
        hour: 12,
        id: 2,
    },
    {
        hour: 13,
        id: 3,
    },
    {
        hour: 14,
        id: 4,
    },
    {
        hour: 15,
        id: 5,
    },
    {
        hour: 16,
        id: 6,
    },
    {
        hour: 17,
        id: 7,
    }
]

const dateAppointment = [
    {
        id: 1
    },
    {
        id: 1
    },
    {
        id: 1
    },
    {
        id: 1
    },
    {
        id: 1
    },
    {
        id: 1
    },
    {
        id: 1
    },
    {
        id: 1
    },
    {
        id: 1
    },
    {
        id: 1
    },
    {
        id: 1
    },
    {
        id: 1
    },

]



export function Appointments () {
    const userLoged = useSelector(state => state.usersReducer.userLoged)
    const dispatch = useDispatch()

    const handleReserve = (idHour) => {
        dispatch(postAppointment(idHour, dateAppointment.date, userLoged.id))
    }

    return (
        <div className={style.container}>
            <div className={style.contents}>
                <h1>Appointmen</h1>
                <div >
                    <ul className={style.titles}>
                        <li>
                            <h4>Hour</h4>
                        </li>
                        <li>
                            <h4>Availability</h4>
                        </li>
                        <li>
                            <h4>Reserve</h4>
                        </li>
                    </ul>
                </div>
                <div>
                {Hours.map((hour)=>{
                    let count = 0 
                    dateAppointment.map((hR)=>{
                        hour.id === hR.id && count++
                    })   
                return(
                    <div className={style.contentsAppointment}>
                        <ul className={style.appointments}>
                            <li>
                                {hour.hour} hs
                            </li>
                            <li>
                                {(count < 10 || count === "undefined") ? "Available" : "Not Available"}
                            </li>
                            <li>
                                <button
                                    onClick={()=> handleReserve(hour.id)}
                                    className={style.button}
                                    disabled={count < 10 || count === "undefined" ? "" : "disabled"}
                                >
                                    Reserve
                                </button>
                            </li>
                        </ul>
                    </div>
                )
                })
                }
                </div>
            </div>
        </div>
    )
}