import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import LanguageIcon from "@material-ui/icons/Language";
import { useTranslation } from "react-i18next";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    backgroundColor: "#9abf15",
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

const StyledButton = withStyles((theme) => ({
  root: {
    backgroundColor: "#9abf15",
    color: "black",
    border: "1px solid black",
    height: 30,
    width: 10,
    transition: "0.5s",
    "&:hover": {
      backgroundColor: "#9abf15",
      border: 0,
      color: "white",
    },
  },
}))(Button);

const StyledOption = withStyles((theme) => ({
  root: {
    /* "&:focus": {
            backgroundColor: "white",
            color:'black',
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white
            }
        } */
  },
}))(MenuItem);

export default function BtnLang() {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation("global");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <StyledButton onClick={handleClick}>
        <LanguageIcon />
      </StyledButton>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledOption onClick={() => i18n.changeLanguage("en")}>
          <ListItemText primary="EN" />
        </StyledOption>
        <StyledOption onClick={() => i18n.changeLanguage("es")}>
          <ListItemText primary="ES" />
        </StyledOption>
      </StyledMenu>
    </div>
  );
}
