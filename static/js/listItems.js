import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import LocalDrink from '@material-ui/icons/LocalDrink';
import Cloud from '@material-ui/icons/Cloud';
import { Link } from "react-router-dom";

import styled from 'styled-components';

const StyledLink = styled(props=> <Link {...props} />)`
    text-decoration: none;
    color: inherit;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: inherit;
    }
`;

export const mainListItems = (
    <div>
        <StyledLink to={"/"}>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
        </StyledLink>
        <StyledLink to="/sensors">
            <ListItem button>
                <ListItemIcon>
                    <Cloud />
                </ListItemIcon>
                <ListItemText primary="Your Sensors" />
            </ListItem>
        </StyledLink>
        {/* <StyledLink to="/aboutwater"> */}
        {/*     <ListItem button> */}
        {/*         <ListItemIcon> */}
        {/*             <LocalDrink /> */}
        {/*         </ListItemIcon> */}
        {/*         <ListItemText primary="About Your Water" /> */}
        {/*     </ListItem> */}
        {/* </StyledLink> */}
        <StyledLink to="/settings">
            <ListItem button>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Setting" />
            </ListItem>
        </StyledLink>
    </div>
);

