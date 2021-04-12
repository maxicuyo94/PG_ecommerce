import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  productDetail,
  getCategories,
} from "../../Redux/Actions/actions.js";
import {} from "../AddCategory/AddCategory";
import style from "./modifyproduct.module.scss";

export function ModifyProduct({ id }) {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: 0,
    brand: "",
    stock: 0,
    model: "",
    ranking: 0,
    storage: "",
    status: true,
  });

  const dispatch = useDispatch();
  const product = useSelector((state) => state.productDetail);
  let categories = useSelector((state) => state.categories);
  categories = categories.filter(
    (i) =>
      product.categories &&
      !product.categories.map((i) => i.name).includes(i.name)
  );

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(getCategories());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(productDetail(id));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setData({
      name: product.name,
      description: product.description,
      price: product.price,
      brand: product.brand,
      stock: product.stock,
      model: product.model,
      ranking: product.ranking,
      storage: product.storage,
      status: true,
    });
  }, [product]);

  const modifyProduct = (data) => {
    dispatch(updateProduct(null, null, { ...data, id }));
  };

  const removeCategory = (e) => {
    e.preventDefault();
    dispatch(updateProduct("remove", e.target.value, { ...data, id }));
  };

  const addCategory = (e) => {
    e.preventDefault();
    dispatch(updateProduct("add", e.target.value, { ...data, id }));
  };

  return (
    <div>
      <form class={style.form}>
        <h1>Add product</h1>
        <div>
          <label class={style.label}>Titulo</label>
          <input
            class={style.input}
            type="text"
            value={data.name}
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
            value={data.description}
            onChange={(e) => handleInputChange(e)}
          ></textarea>
        </div>
        <div>
          <label>Price</label>
          <input
            class={style.input}
            name="price"
            value={data.price}
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>Brand</label>
          <input
            class={style.input}
            name="brand"
            value={data.brand}
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>Model</label>
          <input
            class={style.input}
            name="model"
            value={data.model}
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>Stock</label>
          <input
            class={style.input}
            name="stock"
            value={data.stock}
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>Ranking</label>
          <input
            class={style.input}
            name="ranking"
            value={data.ranking}
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>Storage</label>
          <input
            class={style.input}
            name="storage"
            value={data.storage}
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <select>
            {categories &&
              categories.map((category) => (
                <option onClick={(e) => addCategory(e)} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          {product.categories &&
            product.categories.map((category) => (
              <p>
                {category.name}
                <button value={category.id} onClick={(e) => removeCategory(e)}>
                  X
                </button>
              </p>
            ))}
        </div>
        <div>
          <Link to={`/product/${id}`}>
            <button type="submit" onClick={() => modifyProduct(data)}>
              Modify product
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
