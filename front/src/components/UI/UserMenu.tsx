import { Button, CardMedia, Menu, MenuItem } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

import type { IUser } from '../../types';
import { useState } from 'react';
import { useAppDispatch } from '../../store/hook';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [userMenu, setUserMenu] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenu(event.currentTarget);
  };

  const handleClose = () => {
    setUserMenu(null);
  };

  return (
    <div>
      <Button onClick={handleClick} color="inherit">
        Hello, {user.username}
      </Button>
      <Menu keepMounted anchorEl={userMenu} open={Boolean(userMenu)} onClose={handleClose}>
        <MenuItem>
          <Button component={NavLink} to="/products/new" onClick={handleClose}>
            logout
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
