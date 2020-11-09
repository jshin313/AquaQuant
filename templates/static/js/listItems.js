import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalDrink from '@material-ui/icons/LocalDrink';
import Cloud from '@material-ui/icons/Cloud';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Cloud />
      </ListItemIcon>
      <ListItemText primary="Your Sensors" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LocalDrink />
      </ListItemIcon>
      <ListItemText primary="About Your Water" />
    </ListItem>
  </div>
);

