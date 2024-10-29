import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Link from 'next/link';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <Drawer
            anchor="left"
            variant="persistent"
            open={isOpen}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 200,
                    height: '100vh',
                    backgroundColor: '#37474F', 
                    color: 'white',
                    borderRadius: '0 16px 16px 0',
                },
            }}
        >
            <div className="flex justify-between items-center p-4">
                <h2 className="text-lg font-bold">DASHBOARD</h2>
                <IconButton onClick={toggleSidebar}>
                    <CloseIcon style={{ color: 'white' }} />
                </IconButton>
            </div>
            <List>
                <ListItem button component={Link} href="/events" onClick={toggleSidebar}>
                    <EventNoteIcon className="mr-2" style={{ color: 'white' }} />
                    <ListItemText primary="Events" primaryTypographyProps={{ style: { color: 'white' } }} />
                </ListItem>
                <ListItem button component={Link} href="/items" onClick={toggleSidebar}>
                    <InventoryIcon className="mr-2" style={{ color: 'white' }} />
                    <ListItemText primary="Items" primaryTypographyProps={{ style: { color: 'white' } }} />
                </ListItem>
                <ListItem button component={Link} href="/login" onClick={toggleSidebar}>
                    <ExitToAppIcon className="mr-2" style={{ color: 'white' }} />
                    <ListItemText primary="Logout" primaryTypographyProps={{ style: { color: 'white' } }} />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
