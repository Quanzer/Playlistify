import React from "react";
import { useEffect, useState } from "react";
import LibraryMusicRoundedIcon from '@mui/icons-material/LibraryMusicRounded';
import ReplayCircleFilledRoundedIcon from '@mui/icons-material/ReplayCircleFilledRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import NightlightIcon from '@mui/icons-material/Nightlight';
import Switch from '@mui/material/Switch';
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';
import { NavLink } from 'react-router-dom';

const NavBar = ({ children, theme, mode, updateTheme }) => {
    const [isHorizontal, setIsHorizontal] = useState(false);

    useEffect(() => {
        const checkOrientation = () => {
        setIsHorizontal(window.innerWidth > window.innerHeight);
        };

        // Initial check
        checkOrientation();

        // Listen for resize events to update orientation
        window.addEventListener('resize', checkOrientation);

        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', checkOrientation);
    }, []);
    const menuItem = [
        {
            path: "/",
            name: isHorizontal?"Dashboard": "",
            icon: <LibraryMusicRoundedIcon style={{ fontSize: '2.75vh' }} />
        },
        {
            path: "/history",
            name: isHorizontal?"History": "",
            icon: <ReplayCircleFilledRoundedIcon style={{ fontSize: '2.75vh' }} />
        },
        {
            path: "/settings",
            name: isHorizontal? "Host Controls": "",
            icon: <AdminPanelSettingsRoundedIcon style={{ fontSize: '2.75vh' }} />
        },
        {
            path: "https://forms.gle/N2ujDwtU4R1XurCZ9",
            name: isHorizontal? "Give Us Feedback!": "",
            icon: <FeedbackRoundedIcon style={{ fontSize: '2.75vh' }} />
        }

    ]

    // Function to handle theme change
    const toggleTheme = () => {
        const newTheme = mode === 'light' ? 'dark' : 'light';
        updateTheme(newTheme);
    };

    return (
        <div style={{ backgroundColor: theme.palette.background.secondary, borderRight: '.25vh solid ' + theme.palette.common.border, width: '17.6vw', height: "100vh" }}>
            <div style={{ marginLeft: '1vw', fontFamily: "DM Sans", fontWeight: 700 }}>
                <div style={{ alignItems: "center", alignSelf: "center", alignContent: "center", marginLeft: '1vw', marginTop: '2vh' }}>
                    <div style={{ height: "18vh", display: "flex", paddingTop: "2.25vh", marginLeft:"-.8vw" }}>
                    <img  style={{marginTop: ".5vh",marginRight:".5vw" , width: isHorizontal? 27 * .240 + 'vh': 27 * .220 + 'vh', height:isHorizontal? 27 * .240 + 'vh': 27 * .220 + 'vh' }}
                            src={"logo.png"}/>
                        {isHorizontal?    
                        <div style={{color:theme.palette.text.primary , marginLeft: '-1.5vw',  fontSize: '4vh', fontWeight: 1000, marginTop: '.75vh', marginLeft: '.1vw' }}>
                            Playlistify
                        </div>:
                        <div></div>
                        }
                    </div>
                    <p style={{ marginTop: '4vh', color: theme.palette.text.primary, fontSize: '2vh' }}></p>
                    {
                        menuItem.map((item, index) => (
                            item.path.startsWith("http") || item.path.startsWith("https") ? (
                                <a
                                    href={item.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        marginLeft: '.65vw',
                                        marginBottom: '1vh',
                                        width: '12.35vw',
                                        borderRadius: '2vh',
                                        padding: "1.1vh .7vw",
                                        gap: '1.1vh',
                                        height: '5vh',
                                        display: 'flex',
                                        alignItems: 'center',
                                        textDecoration: 'none'
                                    }}
                                    key={index}
                                    className={mode === "light" ? "link" : "link1"}
                                    activeclassName="active">
                                    {item.icon}
                                    <div style={{ display: "block", fontSize: '1.85vh', fontWeight: 500, marginTop: '0vh', marginLeft: '.1vw' }} >{item.name}</div>
                                </a>
                            ) : (
                                <NavLink
                                    to={item.path}
                                    key={index}
                                    style={{
                                        marginLeft: '.65vw',
                                        marginBottom: '1vh',
                                        width: '12.35vw',
                                        borderRadius: '2vh',
                                        padding: "1.1vh .7vw",
                                        gap: '1.1vh',
                                        height: '5vh',
                                        display: 'flex',
                                        alignItems: 'center',
                                        textDecoration: 'none'
                                    }}
                                    className={mode === "light" ? "link" : "link1"}
                                    activeclassName="active">
                                    {item.icon}
                                    <div style={{ display: "block", fontSize: '1.85vh', fontWeight: 500, marginTop: '0vh', marginLeft: '.1vw' }} >{item.name}</div>
                                </NavLink>
                            )
                        ))
                    }
                </div>
                {/* Theme toggle */}
                <div style={{ marginLeft: '2.2vw', marginTop: '40vh', display: 'flex', alignItems: 'center', color: theme.palette.text.primary }}>
                  
                    <NightlightIcon style={{ fontSize: '2.75vh' }} />
                    {isHorizontal?
                    <Switch
                        checked={mode === 'dark'}
                        onChange={toggleTheme}
                        color="primary"
                        name="theme-switch"
                        inputProps={{ 'aria-label': 'toggle theme' }}
                    />
                    :<div></div>}
                </div>
                {!isHorizontal?
                    <Switch
                        checked={mode === 'dark'}
                        onChange={toggleTheme}
                        color="primary"
                        name="theme-switch"
                        inputProps={{ 'aria-label': 'toggle theme' }}
                    />
                    :<div></div>}
                <main>{children}</main>
            </div>
        </div>
    );
};

export default NavBar;
