import React, {useState} from 'react'
import {Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {NavLink} from "react-router-dom";

const DrawerComponent = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const activeNavLinkStyle = ({ isActive, isTransitioning }) => {
        return {
            padding: "0.3rem",
            rounded: "50%",
            fontWeight: isActive ? "bold" : "",
            color: isActive ? "white" : "purple",
            background: isActive ? "purple" : "",
            viewTransitionName: isTransitioning ? "slide" : "",
        };
    };

    return (
        <React.Fragment>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <NavLink to={'/'} style={activeNavLinkStyle}>
                    <Typography variant="h6">Home</Typography>
                </NavLink>
                <NavLink to={'/create-todo'} style={activeNavLinkStyle}>
                    <Typography variant="h6">Create ToDos</Typography>
                </NavLink>
                <NavLink to={'/view-todos'} style={activeNavLinkStyle}>
                    <Typography variant="h6">View ToDos</Typography>
                </NavLink>
            </Drawer>
            <IconButton sx={{color: 'white', marginLeft: 'auto'}} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon/>
            </IconButton>
        </React.Fragment>
    )
}
export default DrawerComponent
