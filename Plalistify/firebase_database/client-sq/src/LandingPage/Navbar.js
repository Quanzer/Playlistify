import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import Logo from "../Assets/Logo.svg"; // Import the logo SVG

import CreateRoom from '../CreateRoom/CreateRoom'
import Invitation from '../InvitateGuest/Invitation';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from 'react-bootstrap';
const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const scrollRef = useRef(null);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const menuOptions = [
        {
            text: "Home",
            icon: <HomeIcon />,
            target: "home-section", // Add the ID of the target section
        },
        {
            text: "About",
            icon: <InfoIcon />,
            target: "about-section",
        },
        {
            text: "How it Works",
            icon: <InfoIcon />,
            target: "how-it-works-section",
        },
        {
            text: "Contact",
            icon: <PhoneRoundedIcon />,
            target: "contact-section",
        },
        {
            text: "Join Party",
            icon: <CommentRoundedIcon />,
            target: "join-party-section",
        },
    ];

    const scrollToSection = (targetId) => {
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const offset = 20;
            const navbar = document.querySelector('.sticky-navbar');
            const isSticky = navbar && window.getComputedStyle(navbar).position === 'fixed';
            const navbarHeight = isSticky ? navbar.offsetHeight : 0;

            // Use the state variable directly to ensure its latest value
            const currentIsSticky = scrollRef.current.classList.contains('sticky-navbar');
            const adjustedNavbarHeight = currentIsSticky ? navbarHeight : 0;

            const rect = targetSection.getBoundingClientRect();
            const targetScrollPosition =
                rect.top + window.scrollY - (window.innerHeight - rect.height) / 2 - offset;

            const currentScrollPosition = window.scrollY;
            const distanceToScroll = targetScrollPosition - currentScrollPosition;
            const duration = 500;

            const startTime = performance.now();

            const animateScroll = (timestamp) => {
                const elapsed = timestamp - startTime;

                window.scrollTo(
                    0,
                    easeInOutCubic(elapsed, currentScrollPosition, distanceToScroll, duration)
                );

                if (elapsed < duration) {
                    requestAnimationFrame(animateScroll);
                }
            };

            requestAnimationFrame(animateScroll);
        }
    };

    // Easing function for smoother animation
    const easeInOutCubic = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 100;
            const isScrolled = window.scrollY > scrollThreshold;
            const navbar = scrollRef.current;
            if (navbar) {
                navbar.classList.toggle('sticky-navbar', isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Prevent default behavior of anchor tags when clicked
    // const handleClick = (event, targetId) => {
    //     event.preventDefault();
    //     scrollToSection(targetId);
    // };

    const handleClick = (event, targetId) => {
        event.preventDefault();
        if (targetId === 'join-party-section') {
            handleShowModal();
        } else {
            scrollToSection(targetId);
        }
    };

    return (
        <>
            <nav ref={scrollRef} className={isSticky ? 'sticky-navbar' : ''}>

                <div className='nav-logo-container'>
                    {/* Use Link to make the logo clickable and take the user back to the home page */}
                    <Link to="/" className="logo-link">
                        <img src={Logo} alt="Playlistify" />
                    </Link>
                </div>
                <div className='navbar-links-container'>
                    {menuOptions.map((item) => (
                        <a key={item.text} href={`#${item.target}`} onClick={(e) => handleClick(e, item.target)}>
                            {item.text}
                        </a>
                    ))}
                    {/* <Link to="/dashboard" className='primary-button'>Create Party</Link>  */}
                    <button className='primary-button' data-bs-toggle="modal" data-bs-target="#myModal">Create Party</button> {/*Update the button to use Link */}
                    <CreateRoom personName={"Danny"} personId={1001} redirectTo={"/dashboard"} />
                </div>
                <div className='navbar-menu-container'>
                    <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
                </div>
                <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
                    <Box sx={{ width: 250 }}
                        role="presentation"
                        onClick={() => setOpenMenu(false)}
                        onKeyDown={() => setOpenMenu(false)}
                    >
                        <List>
                            {menuOptions.map((item) => (
                                <ListItem key={item.text} disablePadding>
                                    <ListItemButton onClick={() => scrollToSection(item.target)}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </nav>
            <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bold fs-3'>Invite Guest</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Invitation />
                </Modal.Body>
            </Modal>
        </>

    );
};

export default Navbar;
