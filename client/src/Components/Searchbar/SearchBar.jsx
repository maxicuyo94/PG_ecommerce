import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { Search, getProductsByCategories } from '../../Redux/Products/productActions'
import Style from './searchbar.module.scss'

export function SearchBar() {
  const dispatch = useDispatch();
  const [Input, setInput] = useState({ input: "" });

  const handlechange = (e) => {
    e.preventDefault();
    setInput({ ...Input, [e.target.name]: e.target.value });
    if (e.target.value !== "") {
      return dispatch(getProductsByCategories(Input.input))
    }
  };

  return (
    <div>
      <input
        className={Style.Input}
        placeholder="Search..."
        onChange={(e) => handlechange(e)}
        value={Input.input}
        name="input"
      ></input>
    </div>
  );
}
