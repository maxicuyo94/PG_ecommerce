import React, { useState } from "react";
import style from "./dayselector.module.scss";
import { Link } from "react-router-dom";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export function DaySelector() {
    const [value, setValue] = useState();
    const [date, setDate] = useState();

    const handleChange = (day) => {
        setValue(day)
        setDate(day.toLocaleDateString('en-GB'))
    }

    console.log(date)
  return (
    <div className={style.div}>
      <h3>Select a day to pick your order</h3>
      <DayPicker 
      className={style.daypicker} 
      onDayClick={handleChange}
      selectedDays={value}
      />
    {date ? <p>You've selected {date}</p>: null}
    {date ? <button>Continue</button>: null}

    </div>
  );
}
