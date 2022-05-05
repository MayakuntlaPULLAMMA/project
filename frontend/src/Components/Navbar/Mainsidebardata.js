import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const MainsidebarData = [
  {
    title: 'SCP Patterns',
    
    cName: 'nav-text',
    // path:'/scp_patterns_home',
    path:'#',
    value:1,
    key:"item0",
    subNav:[
      {
        title: 'Tutorial',
        path: '#',
        icon: <FaIcons.FaChalkboardTeacher />,
        cName: 'nav-text',
        subNav: [
          {
            title: 'Concept',
            path: '/scp_patterns_home',
            icon: <IoIcons.IoIosPaper />
          },
          {
            title: 'Terms Used',
            path: '/scp_terms_used',
            icon: <IoIcons.IoIosPaper />
          },
          {
            title: 'Guidelines',
            path: '/scp_guidelines',
            icon: <IoIcons.IoIosPaper />
          }
        ]
      },
      {
        title: 'Dataset Format',
        path: '/scp_datasets',
        icon: <FaIcons.FaDatabase />,
        cName: 'nav-text',
        
        
      },
      {
        title: 'Extract SCPs',
        path: '/scp_form',
        icon: <IoIcons.IoIosPaper/>,
        cName: 'nav-text',
        
      },
      {
        title: 'Source Code',
        path: '/scp_files',
        icon: <IoIcons.IoIosFolder/>,
        cName: 'nav-text',
        
      },
      {
        title: 'Contact',
        path: '/scp_contact',
    
        icon: <IoIcons.IoIosContact/>,
    
        cName: 'nav-text',
        
      },

    ]
    
  },
  {
    title: 'GTCP Patterns',
    cName: 'nav-text',
    // path:'/gtcp_patterns_home',
    path:'#',
    value:2,
    key:"item1",
    subNav:[
      {
        title: 'Tutorial',
        path: '#',
        icon: <FaIcons.FaChalkboardTeacher />,
        /*icon:<FaIcons.FaInfoCircle/>,*/
        cName: 'nav-text',
        subNav: [
          {
            title: 'Concept',
            path: '/gtcp_patterns_home',
            icon: <IoIcons.IoIosPaper />
          },
          {
            title: 'Terms Used',
            path: '/gtcp_terms_used',
            icon: <IoIcons.IoIosPaper />
          },
          {
            title: 'Guidelines',
            path: '/gtcp_guidelines',
            icon: <IoIcons.IoIosPaper />
          }
        ]
      },
      {
        title: 'Dataset Format',
        path: '/gtcp_datasets',
        icon: <FaIcons.FaDatabase />,
        cName: 'nav-text',
        
        
      },
      {
        title: 'Extract GTCPs',
        path: '/gtcp_form',
        icon: <IoIcons.IoIosPaper/>,
        cName: 'nav-text',
        
      },
      {
        title: 'Source Code',
        path: '/gtcp_files',
        icon: <IoIcons.IoIosFolder/>,
        cName: 'nav-text',
        
      },
      {
        title: 'Contact',
        path: '/gtcp_contact',
    
        icon: <IoIcons.IoIosContact/>,
    
        cName: 'nav-text',
        
      },

    ]
    
  }
  
  
 /* {
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text',
    subNav: [
      {
        title: 'Users',
        path: '/overview/users',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Revenue',
        path: '/overview/revenue',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text',
    subNav: [
      {
        title: 'Users',
        path: '/overview/users',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Revenue',
        path: '/overview/revenue',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text',
    subNav: [
      {
        title: 'Users',
        path: '/overview/users',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Revenue',
        path: '/overview/revenue',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  }*/
];