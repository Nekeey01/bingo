import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


import {TabContext, TabList, TabPanel} from '@mui/lab';
import {styled} from "@mui/material/styles";
import {tabClasses} from "@mui/material/Tab";
import {
    Box,
    Modal,
    Tab,
} from "@mui/material";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "20%",
    bgcolor: "#3d3737",
    color: "#ffffff",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    padding: 0,
    background: "none",
};

const TabItem = styled(Tab)(({theme}) => ({
// const TabItem = {
    position: "initial",
    opacity: 1,
    overflow: "initial",
    zIndex: 2,
    textTransform: "initial",
    // borderRadius: "15px",
    // borderTopRightRadius: "25px",
    // borderTopLeftRadius: "25px",

    // color: (theme.vars || theme).palette.text.primary,
    // backgroundColor: (theme.vars || theme).palette.background.paper,
    transition: "0.2s",
    // [theme.breakpoints.up("sm")]: {
    //     minWidth: 120,
    // },


    "&:before": {
        transition: "0.2s",
    },



    "&:first-of-type": {
        // textTransform: ,

        borderTopRightRadius: "25px",
        borderTopLeftRadius: "15px",
        // transform: "perspective(5px) rotateX(0.93deg) translateZ(-1px)",
        transform: "perspective(5px) rotateX(1.3deg) translateY(7px) translateZ(-0.9px)",
        transformOrigin: "0 0",
        borderBottomLeftRadius: "15px",
    },


    // "& spanLabel": {
    //         transform: "none !important",
    //         color: "#534",
    //         // all: "revert",
    // },

    "&:not(:first-of-type)": {
        "&": {
            borderTopRightRadius: "15px",
            borderTopLeftRadius: "25px",
            transform: "perspective(5px) rotateX(1.05deg) scaleY(120%) translateY(10px) translateZ(0.5px) rotateZ(0deg)",
            transformOrigin: "100% 100%",
            borderBottomLeftRadius: "10px",
        },

    },




    [`& + .${tabClasses.selected}::before`]: {
        color: "#000"
    },

    [`& + .${tabClasses.selected}::before`]: {
        opacity: 0,
    },

    [`&.${tabClasses.selected}`]: {
        backgroundColor: "#3d3737",
        // color: (theme.vars || theme).palette.common.white,
        // borderTopRightRadius: "15px",
        // borderTopLeftRadius: "45px",
    },
    [`&.${tabClasses.selected} + .${tabClasses.root}`]: {
        zIndex: 1,
    },
    [`&.${tabClasses.selected} + .${tabClasses.root}::before`]: {
        opacity: 0,
    },

}));
// };

// eslint-disable-next-line react/prop-types
export default function LoginModalCard({open, handleClose}) {
    const [value, setValue] = useState('Login');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                {/*<Box>*/}
                <TabContext value={value}>
                    <Box sx={{borderBottom: 0,}}>
                        <TabList TabIndicatorProps={{
                            sx: {
                                display: 'none',
                            }
                        }} sx={{
                            // width: "100%",
                            // boxShadow: "inset 0 -1px 0 0 #E6ECF0",
                        }} variant="fullWidth" textColor="inherit" centered={true} onChange={handleChange}
                                 aria-label="lab API tabs example">
                            <TabItem label={"Login"} value="Login"/>
                            <TabItem label="" value="Registration"/>
                            {/*<TabItem label="Registration" value="Registration"/>*/}
                        </TabList>
                    </Box>
                    <Box sx={{
                        bgcolor: "#3d3737",
                        borderBottomRightRadius: "15px",
                        borderBottomLeftRadius: "15px",
                    }}>
                        <TabPanel value="Login"><Login/> </TabPanel>
                        <TabPanel value="Registration"><Register/></TabPanel>
                    </Box>
                </TabContext>
            </Box>
            {/*<Box sx={modalStyle}>*/}

            {/*</Box>*/}
        </Modal>
    );

}
