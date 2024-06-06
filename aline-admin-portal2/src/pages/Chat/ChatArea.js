import React, {createRef, useState} from 'react';
import {UseStompContext} from '../../utils/StompContext';
import {UseUserSession} from '../../utils/UserContext';

const ChatArea = ({changeStatus}) => {
    const {user} = UseUserSession();

    const [username, setUsername] = useState({name: user})
    const [message, setMessage] = useState({msg: ''})
    const [msgList, setMsgList] = useState({list: []})
    const {client, connect} = UseStompContext()

    const userPage = createRef();
    const chatPage = createRef();
    const usernameForm = createRef();
    const messageForm = createRef();
    const messageInput = createRef();
    const messageArea = createRef();
    const connectingEl = createRef();

    const onChangeUser = (e) => {
        setUsername({name: e.target.value})
    }
    const onMessageChange = (e) => {
        setMessage({msg: e.target.value})
    }

    const onError = (error) => {
        console.error(error)

    }
    const myConnect = (e) => {
        e.preventDefault();
        console.log('logging on')
        console.log('user', user)
        changeStatus()
        if (username) {
            userPage.current.classList.add('d-none');
            chatPage.current.classList.remove('d-none')
            connect(onError, onMessageReceived);
        }
    }
    const sendMessage = (e) => {
        e.preventDefault();
        console.log('begin send msg....')
        let chatMessage = {
            sender: username.name,
            content: message.msg,
            type: 'CHAT'
        }

        client.publish({destination: '/app/chat.sendMessage', body: JSON.stringify(chatMessage)})
        setMessage({msg: ''})
    }

    const onMessageReceived = (payload) => {
        console.log('Msg received Payload: ', payload)
        const receivedMsg = JSON.parse(payload.body)
        console.log('Parsed Body from message received ', receivedMsg)
        const tempMsgs = msgList.list;
        tempMsgs.push(receivedMsg);

        setMsgList({list: tempMsgs})
    }
    return (
        <div>
            <div id="username-page" ref={userPage}>
                <div className="username-page-container">
                    <h1 className="lead fs-3 mb-3">Type your username</h1>
                    <div id="usernameForm" className="usernameForm" ref={usernameForm}>
                        <div className="form-group mb-2">
                            <input type="text" id="name" placeholder="Username" autoComplete="off"
                                   className="form-control" value={username.name} onChange={onChangeUser}/>
                        </div>
                        <div className="form-group">
                            <button type='button' className="btn btn-secondary" onClick={myConnect}>Start Chatting
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="chat-page" className="d-none" ref={chatPage}>
                <div className="chat-container">
                    <div className="lead fs-4" ref={connectingEl}>
                        Connecting...
                    </div>
                    <ul id="messageArea" ref={messageArea}>
                        {
                            msgList.list ?
                                msgList.list.map((msg, index) => {
                                    return <li key={index}><span style={{
                                        color: 'white',
                                        backgroundColor: 'black',
                                        padding:'5px'

                                    }
                                    }>sender: {msg.sender}</span> {msg.content}</li>
                                })
                                :
                                <div>No messages yet</div>
                        }
                    </ul>
                    <div id="messageForm" className="messageForm" ref={messageForm}>
                        <div className="form-group">
                            <div className="input-group clearfix">
                                <input type="text" id="message" placeholder="Type a message..." autoComplete="off"
                                       className="form-control" ref={messageInput} value={message.msg}
                                       onChange={onMessageChange}/>
                                <button type="button" className="btn btn-outline-dark" onClick={sendMessage}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ChatArea.propTypes = {

};

export default ChatArea;
