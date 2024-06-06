import {createContext, useContext, useState} from 'react';
import {Client} from '@stomp/stompjs';

export const StompContext = createContext({
    client: null,
    connect: () => {
    },
})

export function UseStompContext() {
    const {client, connect, onConnect} = useContext(StompContext);
    return {client, connect, onConnect};
}

export default function StompContextProvider({children}) {
    const [stompClient, setStompClient] = useState();
    const BROKER_URL = process.env.REACT_APP_BROKER_URL;

    const onClientConnect = ( onError, onMessageReceived) => {
        let myStompClient;

        console.log('Context Trying to connect...')
        let stompConfig = {
            brokerURL: BROKER_URL,
            debug: msg => {
                console.log('Debug: ', msg)
            },
            connectHeaders: {
                username: 'username',
            },
            onConnect: function () {
                console.log('Trying to subscribe ...')
                myStompClient.subscribe('/topic/public',
                    function (message) {
                        console.log('message from subscribe: ', message)
                        onMessageReceived(message)
                    }
                );
            }
            // onStompError: onError,
        }

        myStompClient = new Client(stompConfig)

        myStompClient.onStompError(onError)
        myStompClient.activate();
        setStompClient(myStompClient)

    }

    return (
        <StompContext.Provider
            value={{
                client: stompClient,
                connect: onClientConnect,
            }}
        >
            {children}
        </StompContext.Provider>
    )
}
