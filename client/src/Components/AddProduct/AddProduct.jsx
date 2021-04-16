import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddCategory } from "../AddCategory/AddCategory";
import { postProduct, getCategories } from "../../Redux/Actions/actions.js";
import axios from 'axios';
import style from "./addproduct.module.scss";
import Modal from '@material-ui/core/Modal';
// import { LinkedCameraSharp } from "@material-ui/icons";

export function AddProduct() {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: 0,
    images: [],
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

  const [imageLink, setImageLink] = useState({
    links: []
  })

  const upload = async () => {
    let urls = await Promise.all(imageLink.links.map(async i => {
      const formData = new FormData()
      formData.append('file', i)
      formData.append('upload_preset', 'techstore_uploads')
      let response = await axios.post('http://api.cloudinary.com/v1_1/techstore/image/upload', formData)
      return { link: response.data.secure_url, public_id: response.data.public_id }
    }))

    setData({
      ...data,
      images: [...data.images, ...urls]
    })
  }

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const createProd = (data) => {
    dispatch(postProduct(data));
  };

  const changeModal = () => {
    if (modal === true) {
      setModal(false)
    } else setModal(true)
  }

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
          <label for="avatar">Choose a profile picture:</label>
          <input type="file"
            onChange={(event) => {
              let imgfiles = []
              for (let i = 0; i < event.target.files.length; i++) {
                imgfiles.push(event.target.files[i])
              }
              setImageLink({
                ...imageLink,
                links: imgfiles
              })
            }}
            id="avatar" name="avatar"
            accept="image/png, image/jpeg" multiple />
          <button onClick={(e) => { e.preventDefault(); upload() }}>Add</button>
        </div>
        <Link to={`/controlpanel`}>
          <button type="submit" onClick={() => { createProd(data) }}>
            Create product
            </button>
        </Link>
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
