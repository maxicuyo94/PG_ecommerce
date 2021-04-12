import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Search } from "../../Redux/Actions/actions";
import Style from "./searchbar.module.scss";

export function SearchBar() {
  const dispatch = useDispatch();
  const [Input, setInput] = useState({ input: "" });

  const handlechange = (e) => {
    e.preventDefault();
    setInput({ ...Input, [e.target.name]: e.target.value });
    if (e.target.value !== "") {
      console.log(Input.input);
      return dispatch(Search(Input.input));
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    dispatch(Search(Input.input));
    setInput({ input: "" });
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
