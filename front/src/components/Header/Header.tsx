import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import { purple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: 'purple' }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <ChatIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyChat
          </Typography>
          <Button onClick={() => navigate('/register')} sx={{ mr: 2 }} variant="outlined" color="inherit">
            Sign in
          </Button>
          <Button onClick={() => navigate('/login')} variant="outlined" color="inherit">
            login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
