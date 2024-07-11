// src/websocket.js
import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { backendApi } from 'config';
import SockJS from 'sockjs-client';

const useStompClient = () => {

    const [stompClient, setStompClient] = useState(null)

    useEffect(() => {
        const socket = new SockJS(`${backendApi}/ws`);
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            debug: (str) => console.log(str),
        });

        client.activate();
        setStompClient(client);

        return () => {
        client.deactivate();
        };
    }, [])
    
    return {stompClient}
}

export {useStompClient};
