import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import {Buscar} from '../../Redux/Actions/actions'
import Style from './searchbar.module.css'


export function SearchBar() {

const dispatch = useDispatch()
const [Input, setInput] = useState({input: ''})

const handlechange = (e) => {
    setInput({ ...Input, [e.target.name]: e.target.value });
  }

 const handlesubmit = (e) => {
     e.preventDefault()
     dispatch(Buscar(Input.input))
     setInput({input:''})
 }   

    return (
      <div>
          <input className={Style.Input} placeholder='Buscar...' onChange={handlechange} value={Input.input} name='input'></input>
          <button className={Style.b} onClick={(e) => handlesubmit(e)}>Buscar</button>
      </div>
    )
}