import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../LocalStorage/useLocalStorage";
import swal from "sweetalert";

//let wishlistButton = document.querySelector(".addToWishlist");

export function addWishlist() {
  const wishlist = useSelector((state) => state.wishlistReducer.wishlist);
  const [userLog] = useLocalStorage("supabase.auth.token");
  const userId = userLog && userLog.currentSession.user.id;
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState({
    wishlistId: null,
    userId,
    productId: null,
  });

  //   const addToWishlist = (e) => {
  //     dispatch(addFavorite(wishlist));
  //     swal({ text: `Added!`, icon: "success" });
  //   };
  //

  // const removeWishlist = (e) => {
  //         dispatch(removefavorite(wishlist));
  //         swal({ text: `Deleted!`, icon: "success" });
  //       };

  return <div className="container"></div>;
}
