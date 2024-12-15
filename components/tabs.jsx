"use client";
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddMegaEvent from "@/components/AddMegaEvent";
import AddEventForm from "@/components/AddEventForm";

function TabPanel(props) {
  const { children, value, index, isSuperUser, domain, megaEvents, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  isSuperUser: PropTypes.bool.isRequired,
  domain: PropTypes.string.isRequired,
  megaEvents: PropTypes.array.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs({ isSuperUser, domain, megaEvents }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
    sx={{
      bgcolor: 'background.paper',
      width: { xs: '100%', sm: 700, md: 900 }, // Responsive width
      mx: 'auto', // Center horizontally
      p: { xs: 2, sm: 3 }, // Responsive padding
    }}
  >
    <AppBar
      position="static"
      sx={{
        bgcolor: 'white',
        color: 'black',
        padding: { xs: 1, sm: 2 }, 
        fontSize: { xs: '14px', sm: '16px' },
        boxShadow: { xs: 'none', sm: '0px 2px 4px rgba(0,0,0,0.2)' }, 
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Events" {...a11yProps(0)} />
        <Tab label="Mega Event" {...a11yProps(1)} />
      </Tabs>
    </AppBar>
    <TabPanel
      value={value}
      index={0}
      dir={theme.direction}
      isSuperUser={isSuperUser}
      domain={domain}
      megaEvents={megaEvents}
    >
      
        <AddEventForm
          isSuperUser={isSuperUser}
          domain={domain}
          megaEvents={megaEvents}
        />
      
    </TabPanel>
    <TabPanel
      value={value}
      index={1}
      dir={theme.direction}
      isSuperUser={isSuperUser}
      domain={domain}
      megaEvents={megaEvents}
    >
      
        <AddMegaEvent />
      
    </TabPanel>
  </Box>
  
  );
}
