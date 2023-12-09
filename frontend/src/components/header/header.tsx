import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography, Button, IconButton} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useGetUserQuery } from '../../Redux/api/authApi';
import PersonIcon from '@mui/icons-material/Person';
import { useAppSelector } from '../../hooks/reduxHooks';
import MenuSimple from '../user/user';

const Header: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.authSlice)

  // const {data = [], isLoading, isError, error } = useGetUserQuery(null)

  // console.log(data)

  return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography onClick={() => navigate('/')}
           variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
            Home
          </Typography>
          {user ? <MenuSimple/> : <Button sx={{mr:'10px'}} onClick={() => navigate('/login')} color="inherit">Login</Button>}
        </Toolbar>
      </AppBar>
  );
}

export default Header;