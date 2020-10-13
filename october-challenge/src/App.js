import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Overview from './components/overview/Overview';
import { useStateValue } from './StateProvider';
import './components/styles/responsive.css'
function App() {
  const [{darkMode}] = useStateValue();
  return (
    <div className={`app ${darkMode && "invert"}`}>
    <Header/>
    <Main />
    <Overview/>
</div>
  );
}

export default App;
