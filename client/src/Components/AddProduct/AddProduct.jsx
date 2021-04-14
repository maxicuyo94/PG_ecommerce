import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddCategory } from "../AddCategory/AddCategory";
import { postProduct, getCategories } from "../../Redux/Actions/actions.js";
import style from "./addproduct.module.scss";
import Modal from '@material-ui/core/Modal';


export function AddProduct() {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: 0,
    // images: [],
    brand: "",
    stock: 0,
    model: "",
    ranking: 0,
    storage: "",
    status: true,
    categories: [],
  });
  const [modal, setModal] = useState(false)
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
  }, []);

  useEffect(() => {
  }, [categories]);

  const createProd = async (data) => {
   await dispatch(postProduct(data));
  };

  const changeModal = () => {
    if(modal === true) {
      setModal(false)
    } else setModal(true)
  }

  return (
    <div class={style.div}>
      <form >
        <h1>Add Product</h1>
        <div>
          <label>Name</label>
          <input
            name="name"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>Description</label>
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
            name="price"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>Brand</label>
          <input
            name="brand"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>Model</label>
          <input
            name="model"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>Stock</label>
          <input
            name="stock"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>Ranking</label>
          <input
            name="ranking"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>Storage</label>
          <input
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
        <div class={style.upload}>
          <label>Upload images</label>
          <input class={style.input2} type="file"/>
          <button class={style.button2} >Add</button>
        </div>
        <div>
          <Link to={`/controlpanel`}>
            <button type="submit" onClick={() => createProd(data)}>
              Create product
            </button>
          </Link>
        </div>
      </form>
      <div>
      <button class={style.button2} onClick={changeModal}>Add Category</button>  
        <Modal class={style.modal} open={modal} onClose={changeModal}>
          <AddCategory />
          </Modal>  
      </div>
    </div>
  );
}
