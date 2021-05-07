import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../LocalStorage/useLocalStorage";
import { getUserWishlist } from "../../Redux/Wishlist/wishlistActions";
import WishListCard from "./WishListCard/WishListCard";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlistReducer.wishlist);
  const [userLog] = useLocalStorage("supabase.auth.token");
  const userId = userLog && userLog.currentSession.user.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWishlist(userId));
    // eslint-disable-next-line
  }, []);

  const redirect = () => {
    window.location.href = "/";
   // setTimeout (redirect(), 3000);
  }

  return (
    <div className="container">
      {wishlist.length > 0 ? (
        <div className="productsWishlist">
          <h2>Wishlist</h2>
          {wishlist?.map((product) => (
            <WishListCard props={product.product} userId={userId} />
          ))}
        </div>
      ) : (
        redirect()
        )}
    </div>
  );
};

export default Wishlist;
