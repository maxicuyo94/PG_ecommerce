import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import style from './profile.module.scss'
import { useTranslation } from "react-i18next";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Avatar from '@material-ui/core/Avatar';
import { userLogOut } from "../../../Redux/Users/usersActions";
import { useDispatch, useSelector } from 'react-redux';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Profile() {
  const userLoged = useSelector(state => state.usersReducer.userLoged)
  const [t, i18n] = useTranslation("global");
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    dispatch(userLogOut());
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Avatar
        alt={userLoged?.userName}
        src={userLoged?.img}
        className={style.large}
        onClick={handleClick}
      />
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!userLoged?.id &&
          <StyledMenuItem>
            <li>
              <Link to="/access">
                <span>{t("navLink4.linkFour")}</span>
              </Link>
            </li>
          </StyledMenuItem>
        }
        {userLoged?.id &&
          <StyledMenuItem>
            <li>
              <span onClick={handleLogOut}>Log Out</span>
            </li>
          </StyledMenuItem>
        }
      </StyledMenu>
    </div>
  );
}