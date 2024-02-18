import React, { useState } from 'react';
import {AppBar, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material";
import DrawerComponent from "./DrawerComponent.jsx";

function ResponsiveAppBar() {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))

    const PAGES = ["Home", "Create ToDo", "View ToDos"]
    return (
        <React.Fragment>
            <AppBar position={"static"} color="secondary">
                <Toolbar>
                    { isMatch ? (
                        <>
                            <Typography sx={{fontSize: '1.5rem', paddingLeft:'10%'}}>ToDo App</Typography>
                            <DrawerComponent />
                        </>
                    ) : (
                        <Tabs sx={{marginLeft: 'auto'}} textColor="inherit" value={value} onChange={(e, value) => setValue(value)} indicatorColor="primary">
                            {PAGES.map((page, index) => (
                                <Tab key={index} label={page} />
                            ))}
                        </Tabs>
                    )}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default ResponsiveAppBar;
