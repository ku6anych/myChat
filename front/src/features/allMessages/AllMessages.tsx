import { Box, Button, Divider, Grid, Paper, TextField } from '@mui/material';

import React, { useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import dayjs from "dayjs";

import type { IOnlineUser } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { selectUser } from '../users/userSlice';
import Sidebar from '../sideBar/SideBar';



interface Message {
  _id: string;
  user: {
    _id: string;
    username: string;
    displayName: string;
    role: string;
    avatar?: string;
  };
  text: string;
  datetime: string;
}

interface IncomingMessage {
  type: string;
  payload: Message[] | IOnlineUser[];
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");
  const ws = useRef<WebSocket | null>(null);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [retryCount, setRetryCount] = useState(0);

  const connectWebSocket = () => {
    const wsClient = new WebSocket("ws://localhost:8000/messages");

    wsClient.onopen = () => {
      console.log("WebSocket connected");
      if (user) {
        wsClient.send(JSON.stringify({
          type: 'LOGIN',
          payload: { token: user }
        }));
      }
    };

   
  };
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid>
        <Sidebar />
      </Grid>

      <Grid size={9} sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2, width: "70%"}}>
        <Grid size={12} sx={{mb :2}}>
          <Typography variant="h6" gutterBottom>
            Chat room
          </Typography>
          <Divider/>
        </Grid>

        <Grid size={12} sx={{maxHeight: "400px",
          overflowY: "auto",}}>
        

        </Grid>

      </Grid>
    </Grid>

  );
};

export default Messages;