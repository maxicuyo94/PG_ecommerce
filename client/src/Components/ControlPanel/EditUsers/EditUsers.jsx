import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from "react-i18next";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Edit } from "@material-ui/icons";
import { userLogOut, changeUserPermission } from "../../../Redux/Users/usersActions";
import style from './editusers.module.scss'
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






export default function Profile(props) {
    const userLoged = useSelector(state => state.usersReducer.userLoged)
    const [t, i18n] = useTranslation("global");
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e) => {
        setAnchorEl(null);
    };

    const changePermission = (e) => {
        dispatch(changeUserPermission(props.id, e.target.getAttribute('name')))
    }

    const configRender = () => {
        switch (userLoged.permission) {
            case "superadmin":
                switch (props.permission) {
                    case "superadmin":
                        return (
                            <div>
                                <StyledMenuItem onChange={changePermission} name="admin">
                                        <span>Admin</span>
                                </StyledMenuItem>
                                <StyledMenuItem>
                                        <span onChange={changePermission} name="customer">Customer</span>
                                </StyledMenuItem>
                            </div>
                        );
                    case "admin":
                        return (
                            <div>

                                <StyledMenuItem>
                                        <span onClick={changePermission} name="superadmin">SuperAdmin</span>
                                </StyledMenuItem>
                                <StyledMenuItem>
                                        <span onClick={changePermission} name="customer">Customer</span>
                                </StyledMenuItem>
                            </div>

                        );
                    case "customer":
                        return (
                            <div>

                                <StyledMenuItem>
                                    <span onClick={changePermission} name="admin">Admin</span>
                                </StyledMenuItem>
                                <StyledMenuItem>
                                    <span onClick={changePermission} name="superadmin">SuperAdmin</span>
                                </StyledMenuItem>
                            </div>
                        );
                    default:
                        break;
                }
            case "admin":
                switch (props.permission) {
                    case "customer":
                        return (

                            <StyledMenuItem>
                                    <span onClick={changePermission} name="admin">Admin</span>
                            </StyledMenuItem>
                        );
                    default:
                    break;
                }
        }
    }
    return (
        <div>
            <Edit
                class={style.icon}
                onClick={handleClick}
            />
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {configRender()}
            </StyledMenu>
        </div>
    );
}