import { styled } from '@mui/material';
import { AppBar, Container, Grid, Toolbar, Typography } from '@mui/material';
import { useAppSelector } from '../../../store/hook';
import { selectUser } from '../../../features/users/userSlice';
import { NavLink } from 'react-router-dom';

import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolBar = () => {
  const user = useAppSelector(selectUser);
  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar sx={{ background: 'purple' }}>
        <Container maxWidth="xl">
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">MyChat</Link>
            </Typography>
            {user ? <UserMenu user={user} /> : <AnonymousMenu />}
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolBar;
