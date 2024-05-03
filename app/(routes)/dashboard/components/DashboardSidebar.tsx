'use client';

import { Home, User, Car, Heart, BellRing, Settings, LogOut } from 'lucide-react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { IUser } from '@/types';

const DashboardSidebar = ({ user }: { user: IUser }) => {   

  return (
    <Sidebar    
      rootStyles={{
        backgroundColor: '#4d7c0f',
      }}
    >
      <div className='text-center font-bold py-4 text-xl'>
        <h4>
          Hi <span>{user?.firstName ?? "Not sign in"}</span>!
        </h4>
      </div>
      <Menu 
        menuItemStyles={{
          button: {                       
            '&:hover': {
              backgroundColor: '#365314',
              color: '#fff',             
            },
          },   
        }}
      >       
        <MenuItem href='/dashboard' icon={<Home size={18}/>}>Account overview</MenuItem>     
        <MenuItem href='/dashboard/my-details' icon={<User size={18} />}>Personal details</MenuItem>
        <MenuItem href='/dashboard/my-orders' icon={<Car size={18}/>}>My orders</MenuItem>
        <MenuItem icon={<Heart size={18} />}>Wishlist</MenuItem>
        <MenuItem icon={<BellRing size={18} />}>Restock notifications</MenuItem>
        <MenuItem icon={<Settings size={18} />}>Data and privacy</MenuItem>
        <MenuItem icon={<LogOut size={18} />}>Logout</MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default DashboardSidebar;