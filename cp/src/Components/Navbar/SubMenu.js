import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
  
const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  text-decoration: none;
  font-size: 16px;
  margin-left: 0%;
  margin-top: 0.5ch;
  margin-bottom: 1ch;
  margin-right: 1ch;
  height:35px;
  
  
  &:hover {
    background: #252831;
    border-left: 4px solid green;
    cursor: pointer;
  }
`;
  
const SidebarLabel = styled.span`
`;
  
const DropdownLink = styled(Link)`
  background: #252831;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: rgb(160, 161, 179);
  font-size: 15px;
  height:35px;
  margin-top:0%;
  
  &:hover {
    background: #252831;
    cursor: pointer;
    color:#fff;
  }
`;
  
const SubMenu = ({item}) => {
    console.log("sdsdfds");
    
  const [subnav, setSubnav] = useState(false);
  
  const showSubnav = () => setSubnav(!subnav);
  return (
    <>
      <SidebarLink to={item.path} 
      onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
        if(index==0){
          return (
              <>
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
            </>
          );}
        else{
            return(
                <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
            );
        }
        })}
    </>
  );
};
  
export default SubMenu;