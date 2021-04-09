import {useState, React, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postProduct } from '../../Redux/Actions/actions.js';
import style from './addproduct.module.scss';

export function AddProduct({postProduct, showCategories}) {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: [],
});
const dispatch = useDispatch()


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
      category: selected,
  });
};

useEffect(() => {
  showCategories();
}, []);

const createProd = (data) => {
  dispatch(postProduct(data));
};


  return (
    <div>
      <form class={style.form}>
        <h1>Agregar producto</h1>
        <div>
          <label>Titulo</label>
          <input name="name" onChange={(e) => handleInputChange(e)}></input>
        </div>
        <div>
          <label>Descripcion</label>
          <textarea name="description" rows="6" cols="40"
          onChange={(e) => handleInputChange(e)}></textarea>
        </div>
        <div>
          <label>Precio</label>
          <input name="price" onChange={(e) => handleInputChange(e)}></input>
        </div>
       
        <div>
          <label>Selecciona la Cateogoria</label>
          <select onChange={handleSelect} name="categories" multiple>
           {/* me tengo que traer las categorias del back y mapearlas */}
          </select>
        </div>
        <div>
          <label>Agregar imagenes</label>
          <input type="file" />
          <button>Agregar</button>
        </div>
        <div>
          <Link to={`/product/:id`}>
            <button type="submit" onClick={() => createProd(data)}>
              Crear producto
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}