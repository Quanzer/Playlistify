// Component for rendering the Queue
import React from "react"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from 'react-router-dom';

const NavBar = ({ children, theme, mode }) => {

    const menuItem = [
        {
            path: "/",
            name: "Dashboard",
            icon: <HomeRoundedIcon style={{ fontSize: '2.75vh' }} />
        },
        {
            path: "/history",
            name: "History",
            icon: <AccessTimeFilledRoundedIcon style={{ fontSize: '2.75vh' }} />
        },
        {
            path: "/settings",
            name: "Settings",
            icon: <SettingsIcon style={{ fontSize: '2.75vh' }} />
        }
       

    ]

    return (

        <div style={{ backgroundColor: theme.palette.background.secondary, borderRight: '.25vh solid ' + theme.palette.common.border, width: '17.6vw', height: "100vh" }}>
            <div style={{
                marginLeft: '1vw',
                fontFamily: "DM Sans",
                fontWeight: 700
            }}>
                <div style={{ alignItems: "center", alignSelf: "center", alignContent: "center", marginLeft: '1vw', marginTop: '2vh' }}>
                    <div style={{
                        height: "18vh",
                        display: "flex",
                        paddingTop: "2.25vh",
                        paddingLeft: ".5vw"
                    }}>


                       {//<img  style={{transition:'transform .2s', width: 52 * .240 + 'vw', height: 52 * 0.152 + 'vw' }}
                            //src={mode === "light"? "logo.png": "logoDark.png"} />}
                       }
                        <div className={mode === "light" ? "link" : "link1"}
                        style= {{marginLeft:'-1.5vw', marginTop: '1.6vw',
                        fontSize: '5vh', fontWeight: 1000, marginTop: '0vh', marginLeft: '.1vw'}}>
                           Playlistify
                        </div>

                    </div>
                    <p style={{ marginTop: '4vh', color: theme.palette.text.primary, fontSize: '2vh' }}></p>
                    {
                        menuItem.map((item, index) => (
                            <NavLink style={{
                                marginLeft: '.65vw',
                                marginBottom: '1vh',
                                width: '12.35vw',
                                borderRadius: '.75vh',
                                padding: "1.1vh .7vw",
                                gap: '1.1vh',
                                height: '5vh'
                            }}
                                to={item.path}
                                key={index}
                                className={mode === "light" ? "link" : "link1"}
                                activeclassName="active">
                                {item.icon}
                                <div style={{ display: "block", fontSize: '1.85vh', fontWeight: 500, marginTop: '0vh', marginLeft: '.1vw' }} >{item.name}</div>
                            </NavLink>
                        ))
                    }
                </div>


                
                <main>{children}</main>
            </div>
        </div>
    );
};

export default NavBar;

