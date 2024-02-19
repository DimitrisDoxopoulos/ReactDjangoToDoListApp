import React from 'react';
import {AppBar, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material";
import DrawerComponent from "./DrawerComponent.jsx";
import {NavLink} from "react-router-dom";

function ResponsiveAppBar() {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    const activeNavLinkStyle = ({ isActive, isTransitioning }) => {
        return {
            padding: "0.3rem",
            rounded: "50%",
            fontWeight: isActive ? "bold" : "",
            color: isActive ? "purple" : "white",
            background: isActive ? "white" : "",
            viewTransitionName: isTransitioning ? "slide" : "",
        };
    };

    return (
        <React.Fragment>
            <AppBar position={"static"} color="secondary">
                <Toolbar>
                    { isMatch ? (
                        <>
                            <Typography sx={{fontSize: '1.5rem', paddingLeft:'10%'}}>ToDos Application</Typography>
                            <DrawerComponent />
                        </>
                    ) : (
                        <>
                            <NavLink to={'/'} style={{marginRight:"auto"}}><Typography variant="h5">ToDos Application</Typography></NavLink>
                            <nav style={{
                                marginLeft: 'auto',
                                display: "flex",
                                width: "20%",
                                justifyContent: "space-between"
                            }}>
                                <NavLink to={'/'} style={activeNavLinkStyle}>
                                    <Typography variant="h6">Home</Typography>
                                </NavLink>
                                <NavLink to={'/create-todo'} style={activeNavLinkStyle}>
                                    <Typography variant="h6">Create ToDos</Typography>
                                </NavLink>
                                <NavLink to={'/view-todos'} style={activeNavLinkStyle}>
                                    <Typography variant="h6">View ToDos</Typography>
                                </NavLink>
                            </nav>
                        </>

                    )}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default ResponsiveAppBar;
