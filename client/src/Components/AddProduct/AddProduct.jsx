import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddCategory } from "../AddCategory/AddCategory";
import { postProduct, getCategories } from "../../Redux/Actions/actions.js";
import style from "./addproduct.module.scss";

export function AddProduct() {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: 0,
    // images: "",
    brand: "",
    stock: 0,
    model: "",
    ranking: 0,
    storage: "",
    status: true,
    categories: [],
  });
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e) => {
    let selected = [];
    for (let i = 0; i < e.target.options.length; i++) {
      if (e.target.options[i].selected === true) {
        selected.push(e.target.options[i].value);
      }
    }
    setData({
      ...data,
      categories: selected,
    });
  };

  useEffect(() => {
    dispatch(getCategories());
    // eslint-disable-next-line
  }, [categories]);

  const createProd = (data) => {
    dispatch(postProduct(data));
  };

  return (
    <div>
      <form class={style.form}>
        <h1>Add Product</h1>
        <div>
          <label class={style.label}>Name</label>
          <input
            class={style.input}
            name="name"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label class={style.input}>Description</label>
          <textarea
            name="description"
            rows="6"
            cols="40"
            onChange={(e) => handleInputChange(e)}
          ></textarea>
        </div>
        <div>
          <label>Price</label>
          <input
            class={style.input}
            name="price"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>Brand</label>
          <input
            class={style.input}
            name="brand"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>Model</label>
          <input
            class={style.input}
            name="model"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>Stock</label>
          <input
            class={style.input}
            name="stock"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>Ranking</label>
          <input
            class={style.input}
            name="ranking"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>Storage</label>
          <input
            class={style.input}
            name="storage"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>Select categories</label>
          <select onChange={handleSelect} name="categories" multiple>
            {categories.map((e) => {
              return (
                <option value={e.name} name={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>Upload images</label>
          <input type="file" />
          <button>Add</button>
        </div>
        <div>
          <Link to={`/product/:id`}>
            <button type="submit" onClick={() => createProd(data)}>
              Create product
            </button>
          </Link>
        </div>
      </form>
      <div>
        <AddCategory />
      </div>
    </div>
  );
}
