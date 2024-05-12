import React from "react";
import '../styles/App.css'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

function ProgressBar({ number, style, theme }) {

    const BorderLinearProgress = styled(LinearProgress)({
        height: '.5vh',
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.text.primary === "#3C435C" ? "#FCDCD7" : "#5C3C3C"

        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.primary.main,
        },
    });

    return (
        <>
            <BorderLinearProgress variant="determinate" value={number} style={style} />
        </>
    );
}

export default ProgressBar