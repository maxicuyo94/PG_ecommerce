import React from 'react';
import {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, productDetail } from '../../Redux/Actions/actions.js';
import style from './modifyproduct.module.scss';
import {  } from '../AddCategory/AddCategory'

export function ModifyProduct() {
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
const dispatch = useDispatch()
const product = useSelector(state => state.productDetail)

const handleInputChange = (e) => {
  setData({
      ...data,
      [e.target.name]: e.target.value,
  });
};

// const handleSelect = (e) => {
//   let selected = [];
//   for (let i = 0; i < e.target.options.length; i++) {
//       if (e.target.options[i].selected === true) {
//           selected.push(e.target.options[i].value);
//       }
//   }
// };
const idPrueba = 'b001ef4e-76ab-4635-9667-b43ebbc98f01'
useEffect(() => {
  dispatch(productDetail(idPrueba));
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
  dispatch(updateProduct(data, idPrueba));
};

  return (
    <div>
      <form class={style.form}>
        <h1>Agregar producto</h1>
        <div>
          <label class={style.label}>Titulo</label>
          <input class={style.input} type='text' value={data.name} name="name" onChange={(e) => handleInputChange(e)}></input>
        </div>
        <div>
          <label class={style.input}>Descripcion</label>
          <textarea name="description" rows="6" cols="40"
          value={data.description}
          onChange={(e) => handleInputChange(e)}></textarea>
        </div>
        <div>
          <label>Precio</label>
          <input class={style.input} name="price" value={data.price} onChange={(e) => handleInputChange(e)}></input>
        </div>
        <div>
          <label>Marca</label>
          <input class={style.input} name="brand" value={data.brand} onChange={(e) => handleInputChange(e)}></input>
        </div>
        <div>
          <label>Modelo</label>
          <input class={style.input} name="model" value={data.model} onChange={(e) => handleInputChange(e)}></input>
        </div>
        <div>
          <label>Stock</label>
          <input class={style.input} name="stock" value={data.stock} onChange={(e) => handleInputChange(e)}></input>
        </div>
        <div>
          <label>Ranking</label>
          <input class={style.input} name="ranking" value={data.ranking} onChange={(e) => handleInputChange(e)}></input>
        </div>
        <div>
          <label>Storage</label>
          <input class={style.input} name="storage" value={data.storage} onChange={(e) => handleInputChange(e)}></input>
        </div>
        {/* <div>
          <label>Selecciona la Cateogoria</label>
          <select onChange={handleSelect} name="categories" multiple>
          {categories.map((e) => {
              return (
               <option value={e.name} name={e.name}>{e.name}</option>
                      );
              })}
          </select>
        </div> */}
        {/* <div>
          <label>Agregar imagenes</label>
          <input type="file" />
          <button>Agregar</button>
        </div> */}
        <div>
          <Link to={`/product/:id`}>
            <button type="submit" onClick={() => modifyProduct(data)}>
              Modificar producto
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}