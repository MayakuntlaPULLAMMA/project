import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Mainnavbar.css';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons';
import Image from '../../Images/DSAC.jpeg';
import Image_iiith from '../../Images/IIITH.jpeg';
import history from '../../history.js';
import AppContext from '../App_context';
import SubMenu from './SubMenu';

function Mainnavbar() {
  const myContext = useContext(AppContext);
  const [expand_icon,setexpandicon]=useState(false);

  
  const expandthis=()=>{
    setexpandicon(true);
  }
  
  const closethis=()=>{
    setexpandicon(false);
  }
  
  return (
    <>

      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="div_with_logo">
            <img className="logo1" src={Image}></img>
            <div className="headingdiv">
              <h1 className="heading">Data Science And Analytics Center</h1>
            </div>
            <img className="logo2" src={Image_iiith}></img>
        </div>
        <div>
          <div className="div_on_top_in_sidebar_expand"><div className={"topic_heading"}>Subgraph Coverage Patterns</div>
          <div className="div_containing_icons">
          <ul className='nav-menu-items1'>
            
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className="icons_in_sidebar">
                    <Link to={item.path}>
                      {item.icon}
                    </Link>
                   

                   
                   
                </li>

              );
            })}
          </ul>
          </div>
        </div>
    

        <div className={'nav_on_active'}>
            <Link to="#" className="menu-bars">
                <FaIcons.FaBars className="icon"/>
            </Link>
        
            <nav className={'nav-menu active'}>
          <ul className='nav-menu-items'>
            
            {SidebarData.map((item, index) => {
              
              return  <SubMenu item={item} sidebar={1} key={index} />;
              
            })}
          </ul>
        </nav>
        </div>
        
        {/*<div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars className="icon" onClick={showSidebar} />
          </Link>
          <div className={sidebar ? 'font-move' : 'font-stay'}></div>
            <h1>dsfsdfs</h1>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>*/}
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Mainnavbar;