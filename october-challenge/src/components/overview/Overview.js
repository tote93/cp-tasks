import React from 'react'
import PageCard from '../pageCard/PageCard'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'; 
import StopIcon from '@material-ui/icons/Stop';
import '../styles/Overview.css'
import {useStateValue} from '../../StateProvider'
function Overview() {
    const [{darkMode}] = useStateValue();
    return (
        <div className="overview">
            <div className="overview__title">
                <h2>Overview - Today</h2>
            </div>
            <div className="overview__content">
            <PageCard overview="Page Views" views="87" Icon={<FacebookIcon className={`icon__facebook ${darkMode && "invert"}`} />} type percentage="3" />
            <PageCard overview="Likes" views="52" Icon={<FacebookIcon className={`icon__facebook ${darkMode && "invert"}`} />} percentage="2" />
            <PageCard overview="Likes" views="5462" Icon={<StopIcon className={`icon__square ${darkMode && "invert"}`} />} type percentage="2257" />
            <PageCard overview="Profile Views" views="52K" Icon={<StopIcon className={`icon__square ${darkMode && "invert"}`} />} type percentage="1375" />
            <PageCard overview="Retweets" views="113" Icon={<TwitterIcon className={`icon__twitter ${darkMode && "invert"}`} />} type percentage="303" />
            <PageCard overview="Likes" views="507" Icon={<TwitterIcon className={`icon__twitter ${darkMode && "invert"}`} />} type percentage="553" />
            <PageCard overview="Likes" views="107" Icon={<FiberManualRecordIcon className={`icon__circle ${darkMode && "invert"}`} />}  percentage="19" />
            <PageCard overview="Total Views" views="1407" Icon={<FiberManualRecordIcon className={`icon__circle ${darkMode && "invert"}`} />}  percentage="12" />
            </div>
        </div>
    )
}

export default Overview
