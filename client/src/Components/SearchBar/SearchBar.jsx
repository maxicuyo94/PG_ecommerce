
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Search,
  Searching,allProducts,
} from "../../Redux/Products/productActions";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";

import Style from "./searchbar.module.scss";
import { ProductCard } from "../ProductCard/ProductCard";
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    backgroundColor: "white",
    borderRadius: "10px",
    width: "30vw",
    height: "50vh",
    overflowY: "scroll",
  },
  list: {
    height: "160%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export function SearchBar() {
  const dispatch = useDispatch();
  const [Input, setInput] = useState({ input: "" });
  const [anchorEl, setAnchorEl] = React.useState(null);
  let Products = useSelector((state) => state.productReducer.wantedProducts);


  const handlechange = (e) => {
    e.preventDefault();
    setInput({ ...Input, [e.target.name]: e.target.value });
    if (e.target.value !== "") {
      return dispatch(Search(Input.input))
    }
  };

  //  useEffect(() => {
  //   dispatch(Search(Input.input));
  // }, [Input]);

  const handleClick = (e) => {
    e.preventDefault()
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <form onSubmit={handleClick}>
    <div style={{display:'flex'}}>
      <input
        className={Style.Input}
        placeholder="Search..."
        onChange={(e) => handlechange(e)}
        value={Input.input}
        name="input"
      ></input>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div>
          {Products &&
            Products.map((item) => {
              console.log("Item: ", item);
              return (
                <div>
                  {console.log(Products)}
                  {Products &&
                    Products.map((item) => (
                      <ProductCard
                      stock={item.stock}
                      title={item.name}
                      price={item.price}
                      id={item.id}
                      images={item.images[0]?.url}
                    />
                    ))}
                </div>
              );
            })}
        </div>
      </StyledMenu>
    </div>
    </form>
  );
}
