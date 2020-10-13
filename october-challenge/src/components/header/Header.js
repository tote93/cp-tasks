import React from 'react'
import '../styles/Header.css'
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import {useStateValue} from '../../StateProvider'
const CustomSwitch = withStyles((theme) => ({
    root: {
      width: 45,
      height: 23,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: "#fff",
        '& + $track': {
          background: 'gray',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: 'none',
      },
    },
    thumb: {
      width: 18,
      height: 18,
      transform: 'translate(3px, 1px)',
      color: '#202741'
    },
    track: {
      borderRadius: 26 / 2,
      border: `none`,
      background: 'linear-gradient(90deg, rgba(43,126,186,1) 8%, rgba(48,199,158,1) 100%)',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });
  
function Header() {
  const [{darkMode}, dispatch] = useStateValue();

    const handleChange = () => {
      dispatch({
        type: "SET_DARK_MODE",
      })
    };
    return (
        <header className="header">
            <div className="header__main">
              <h1>Social Media Dashboard</h1>
              <h3>Total Followers: 23.004</h3>
            </div>
            <div className="header__options">
                <h3>Dark Mode</h3> 
                <CustomSwitch className={`switch ${darkMode &&  "invert" && "checked"}`}  checked={darkMode} onChange={handleChange} name="darkMode" />
            </div>
        </header>
    )
}

export default Header
