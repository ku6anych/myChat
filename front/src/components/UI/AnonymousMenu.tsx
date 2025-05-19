import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <>
      <Button variant="contained" component={NavLink} to="/register" color="primary">
        Sing Up
      </Button>
      <Button variant="contained" component={NavLink} to="/login" color="primary">
        Sing In
      </Button>
    </>
  );
};

export default AnonymousMenu;
