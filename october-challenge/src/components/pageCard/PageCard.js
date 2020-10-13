import React from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import '../styles/PageCard.css'
import {useStateValue} from '../../StateProvider'
function PageCard({overview, views, Icon, type, percentage}) {
    const [{darkMode}] = useStateValue();
    return (
        <div className="pageCard">
            <div className="pageCard__views">
                <h3>{overview}</h3>
                {Icon}
            </div>
            <div className={`pageCard__info ${darkMode && "invert" }`}>
                <h2>{views}</h2>
                <p className={`pageCard__type ${type && "benefits"}`}>
                {type ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                {percentage}%
                </p>
            </div>
            </div>            
    )
}

export default PageCard
