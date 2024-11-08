import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Tutorial',
    path: '/',
    icon: <FaIcons.FaChalkboardTeacher />,
    cName: 'nav-text',
    subNav: [
      {
        title: 'Terms Used',
        path: '/terms_used',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Guidelines',
        path: '/guidelines',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Dataset Format',
    path: '/datasets',
    icon: <FaIcons.FaDatabase />,
    cName: 'nav-text',
    
    
  },
  {
    title: 'Extract SCPs',
    path: '/form',
    icon: <IoIcons.IoIosPaper/>,
    cName: 'nav-text',
    
  },
  {
    title: 'Source Code',
    path: '/files',
    icon: <IoIcons.IoIosFolder/>,
    cName: 'nav-text',
    
  },
  {
    title: 'Contact',
    path: '/contact',

    icon: <IoIcons.IoIosContact/>,

    cName: 'nav-text',
    
  },
  
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