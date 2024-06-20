// src/websocket.js
import { Client } from '@stomp/stompjs';
import { backendApi } from 'config';
import SockJS from 'sockjs-client';

const useStompClient = () => {
    const socket = new SockJS(`${backendApi}/ws`);
    const stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        debug: (str) => console.log(str),
    });

    return {stompClient}
}

export {useStompClient};
