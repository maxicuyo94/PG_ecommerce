import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  productDetail,
  getCategories,
} from "../../Redux/Products/productActions.js";
import style from "./modifyproduct.module.scss";
import { Clear } from '@material-ui/icons';

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
    categories: []
  });
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productReducer.productDetail);
  let categories = useSelector((state) => state.productReducer.categories);
  categories = categories.filter(
    (i) =>
      data.categories &&
      !data.categories.map((i) => i.name).includes(i.name)
  );

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
   (function getCatAndProd() {
      dispatch(getCategories());
      dispatch(productDetail(id));
    })()
  }, [id]);

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
      categories: product.categories
    });
  }, [product]);

  const modifyProduct = async () => {
   await dispatch(updateProduct(data, id));
  };

  const removeCategory = (e) => {
    const filtredCat = data.categories.filter((cat) => {
      return e.target.id !== cat.id
    })
    setData({...data, categories: filtredCat} )
  };
  const addCategory = (e) => {
    for (let i = 0; i < e.target.options.length; i++) {
      if (e.target.options[i].selected === true) {
          setData({...data, categories: data.categories.concat({id: e.target.options[i].id, name: e.target.options[i].value})} )
      }
    }  
  };

  return (
    <div>
      <form class={style.form}>
        <h1>Modify Product</h1>
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
          <select onClick={(e) => addCategory(e)}>
            {categories &&
              categories.map((category) => (
                <option id={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <span>Selected categories</span>
          {data.categories &&
            data.categories.map((category) => (
                <div class={style.categories}>
                <button type='button' id={category.id} value={category.name} onClick={(e) => removeCategory(e)}>
                {category.name}
                </button>
                <Clear class={style.clear}></Clear>
                </div>
            ))}
        </div>
        <div>
          <Link to={`/controlpanel`}>
            <button type="submit" onClick={modifyProduct}>
              Modify product
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}