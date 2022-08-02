/***************ICONS********************/
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import InstagramIcon from "@mui/icons-material/Instagram";
/***************ICONS********************/
/***************MUI**********************/
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useMediaQuery } from "@mui/material";
/***************MUI**********************/
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
   ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
         transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
         }),
         marginLeft: 0,
      }),
   })
);

const AppbarSpacer = styled("div")(({ theme }) => ({
   ...theme.mixins.toolbar,
}));

const routesInfo = [
   { path: "/", name: "Home", icon: <HomeIcon /> },
   { path: "/new-order", name: "New Order", icon: <AddShoppingCartIcon /> },
];

export default function Layout(props) {
   const [drawerOpen, setOpen] = useState(false);
   const isMd = useMediaQuery(useTheme().breakpoints.up("md"));
   const handleDrawerToggle = () => {
      setOpen((prev) => !prev);
   };

   const nav = useNavigate();

   return (
      <Box sx={{ display: "flex" }}>
         <MuiAppBar sx={{ zIndex: 5000 }} position="fixed">
            <Toolbar>
               <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  edge="start"
                  sx={{ mr: 2 }}
               >
                  <MenuIcon />
               </IconButton>
               <Typography
                  sx={{ paddingY: "0.5rem" }}
                  fontFamily="Countryside"
                  variant={isMd ? "h5" : "h6"}
                  noWrap
                  component="div"
                  flexGrow={1}
               >
                  Shein Magnifique
               </Typography>
               <IconButton color="inherit">
                  <FacebookOutlinedIcon />
               </IconButton>
               <IconButton color="inherit">
                  <InstagramIcon />
               </IconButton>
            </Toolbar>
         </MuiAppBar>
         <Drawer
            sx={{
               width: drawerWidth,
               flexShrink: 0,
               "& .MuiDrawer-paper": {
                  width: `${isMd ? `${drawerWidth}px` : "100%"}`,
                  boxSizing: "border-box",
               },
            }}
            variant="persistent"
            anchor="left"
            open={drawerOpen}
         >
            <AppbarSpacer />
            <Divider />
            <List>
               {routesInfo.map((routeInfo) => (
                  <ListItem key={routeInfo.path} disablePadding>
                     <ListItemButton onClick={() => nav(routeInfo.path)}>
                        <ListItemIcon>{routeInfo.icon}</ListItemIcon>
                        <ListItemText primary={routeInfo.name} />
                     </ListItemButton>
                  </ListItem>
               ))}
            </List>
         </Drawer>
         <Main open={drawerOpen && isMd}>
            <AppbarSpacer />
            {props.children}
         </Main>
      </Box>
   );
}
