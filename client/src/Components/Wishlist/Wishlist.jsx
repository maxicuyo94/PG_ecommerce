// import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// //import { useHistory } from "react-router";
import { getUserWishlist } from "../../Redux/Wishlist/wishlistActions";
import { useLocalStorage } from "../../LocalStorage/useLocalStorage";
// //import swal from "sweetalert";
import React, { useEffect }  from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export function Wishlist() {
  const classes = useStyles();
  const wishlist = useSelector((state) => state.wishlistReducer.wishlist);
  const [userLog] = useLocalStorage("supabase.auth.token");
  const userId = userLog && userLog.currentSession.user.id;
  //   const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWishlist(userId));
  }, []);

  console.log(wishlist)

  return (
    <div className={classes.root}>
        <h2>Wishlist</h2>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={wishlist[0]?.product.images[0]}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Standard license
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Full resolution 1920x1080 • JPEG
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: 1030114
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: "pointer" }}>
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">$19.00</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

// export function Wishlist() {
//   const [userLog] = useLocalStorage("supabase.auth.token");
//   const userId = userLog && userLog.currentSession.user.id;
//   //const history = useHistory();
//   const dispatch = useDispatch();

//   useEffect(() => {
//       dispatch(getUserWishlist(userId));
//   });

//   return (
//     <div className="container">
//       <h2>Wishlist</h2>

//     </div>
//   );
// }

export default Wishlist;
