import React from 'react';
import {CircularProgress} from "@mui/material";

/**
 * Creates a gradient circular progress bar
 * From https://mui.com/material-ui/react-progress/
 */
export default function GradientCircularProgress() {
    return (
        <React.Fragment>
            <svg width={10} height={0}>
                <defs>
                    <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#e01cd5" />
                        <stop offset="100%" stopColor="#1CB5E0" />
                    </linearGradient>
                </defs>
            </svg>
            <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
        </React.Fragment>
    );
}