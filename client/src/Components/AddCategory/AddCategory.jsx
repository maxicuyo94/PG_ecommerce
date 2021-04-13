import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postCategory } from "../../Redux/Actions/actions.js";
import style from "./addcategory.module.scss";

export function AddCategory() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const clearInputs = () => {
    setData({
      name: "",
      description: "",
    })
  };

  const createCat = (data) => {
    dispatch(postCategory(data));
    clearInputs();
  };
  return (
    <div>
      <label class={style.labelCat}>Create category</label>
      <div>
        <label class={style.label}>Name</label>
        <input
          class={style.input}
          value={data.name}
          name="name"
          onChange={(e) => handleInputChange(e)}
        ></input>
      </div>
      <div>
        <label class={style.label}>Description</label>
        <input
          class={style.input}
          value={data.description}
          name="description"
          onChange={(e) => handleInputChange(e)}
        ></input>
      </div>
      <button onClick={() => createCat(data)}>Create</button>
    </div>
  );
}
