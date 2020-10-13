import React from 'react'
import Card from "../card/Card"
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'; 
import StopIcon from '@material-ui/icons/Stop';
import {useStateValue} from '../../StateProvider'
import '../styles/Main.css'
function Main() {
    const [{darkMode}] = useStateValue();
    return (
    <div className="main">
        <Card Icon={<FacebookIcon className={`icon__facebook ${darkMode && "invert"}`} />} userName="nathanf" count="1987" increase="12" type/>
        <Card Icon={<TwitterIcon className={`icon__twitter ${darkMode && "invert"}`}/> }  userName="nathanf" count="1044" increase="99" type/>
        <Card Icon={<StopIcon className={`icon__square ${darkMode && "invert"}`}/>}  userName="realnathanf" count="11K" increase="1099" type/>
        <Card Icon={<FiberManualRecordIcon className={`icon__facebook ${darkMode && "invert"}`}/>}  userName="Nathan F." count="8239" increase="144" />
    </div>
    )
}

export default Main
