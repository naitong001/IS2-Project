import React from 'react'
import "./topbar.css"
import {NotificationsNone} from '@mui/icons-material/';

export default function Topbar(){
    return(
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Smart Water Meter</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconsContainer">
                        <NotificationsNone/>
                        <span className="topIconBadge">1</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
