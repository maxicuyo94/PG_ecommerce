import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LanguageIcon from "@material-ui/icons/Language";
import MoreIcon from "@material-ui/icons/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import style from "./nav.module.scss";
import { NavLink, useHistory } from "react-router-dom";
import BtnLang from "./BtnLang/BtnLang";
import { userLogOut } from "../../Redux/Users/usersActions";
import swal from "sweetalert";
import MiniCart from "./MiniCart/MiniCart";
import BtnDark from "./BtnDark/BtnDark";




const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "100%"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "10ch",
    [theme.breakpoints.up("md")]: {
      width: "25ch"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "flex"
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  },
  navBar: {
    position: 'fixed',
  },
}));

export default function NavBar({ priority, dark }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cartReducer.cart)
  const user = useSelector(state =>  state.usersReducer.userLoged)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleCatalogue = (event) => {
    history.push('/catalogue')
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleToCart = (event) => {
    history.push('/order')
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  

  const handleLogOut = () => {
    const error = dispatch(userLogOut());
    if (error) {
      swal(error);
    } else {
      history.go(0);
    }
  };

  const handleLogin = () => {
    history.push('/access')
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuProfile = (e) => {
    if( e.target.id === 'account') {
      history.push('/controlpanel')
    } else if( e.target.id === 'profile') {
      history.push('/myProfile')
    } else if( e.target.id === 'logOut') {
      handleLogOut()
    }
    setAnchorEl(null);
      handleMobileMenuClose();
  };
  


  //Menu Profile -------------------------------------------------//
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuProfile}
    >
      <MenuItem id='account' onClick={(e) => handleMenuProfile(e)}>Account</MenuItem>
      <MenuItem id='profile' onClick={(e) => handleMenuProfile(e)}>Profile</MenuItem>
      <MenuItem id='logOut' onClick={(e) => handleMenuProfile(e)}>Log Out</MenuItem> 
    </Menu>
  );
  //--------------------------------------------------------------//


  //Menu Mobile -------------------------------------------------//
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleCatalogue}>
        <IconButton color="primary">
          <MenuIcon />
        </IconButton>
        <p>Catalogue</p>
      </MenuItem>

      <MenuItem onClick={handleToCart}>
        <IconButton >
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartIcon color="primary"/>
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>

      <BtnLang />

      <MenuItem>
        <IconButton color="primary">
          <BtnDark/>
        </IconButton>
      </MenuItem>

      {user?.id ?
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="primary"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      :
        <MenuItem onClick={handleLogin}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            color="primary"
          >
            <AccountCircle />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      }

    </Menu>
  );
  //--------------------------------------------------------------//


  return (
    <div className={classes.grow} >
      <AppBar className={classes.navBar} color='secondary'>
        <Toolbar className={classes.toolBar}>
          <NavLink to={"/"}>
            <img
              src={
                "https://res.cloudinary.com/techstore/image/upload/v1619885737/logo-nav_qycrol.png"
              } 
              alt="Ups, we don't found anything here. Try again tomorrow!"
              width="220"
              height="50"
            />
          </NavLink>
          {/* <Typography className={classes.title} variant="h6" noWrap>
            Tech Store
          </Typography> */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <MenuItem onClick={handleCatalogue}>
              <IconButton color="primary">
                <MenuIcon />
              </IconButton>
              <p>Catalogue</p>
            </MenuItem>
            
            <MenuItem>
              <MiniCart />
            </MenuItem>

            {user?.id ?
              <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="primary"
                >
                  <AccountCircle />
                </IconButton>
                <p>Profile</p>
              </MenuItem>
            :
              <MenuItem onClick={handleLogin}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  color="primary"
                >
                  <AccountCircle />
                </IconButton>
                <p>Login</p>
              </MenuItem>
            }
            
            <MenuItem>
              <BtnLang />
            </MenuItem>

            <MenuItem>
              <IconButton color="primary">
                <BtnDark/>
              </IconButton>
            </MenuItem>

          </div>
          
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
