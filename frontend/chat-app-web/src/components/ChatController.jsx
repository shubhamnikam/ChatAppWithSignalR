import React, { useState } from 'react';
import { LogLevel, HubConnectionBuilder } from '@microsoft/signalr';
import WaitingRoom from './WaitingRoom';
import ChatRoom from './ChatRoom';
import ChatBox from './ChatBox';

const ChatController = () => {
    const [connection, setConnection] = useState(null);
    const [userMessages, setUserMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const joinChatRoom = async (UserName, ChatRoom) => {
        setLoading(true);
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:5000/ws/chat")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (user, message) => {
                setUserMessages(prevMessages => [...prevMessages, { user, message, isSystem: true }]);
            });

            connection.on("ReceiveSpecificMessage", (user, message) => {
                setUserMessages(prevMessages => [...prevMessages, { user, message }]);
            });

            connection.onclose(() => {
                console.log("Connection closed");
            });

            try {
                await connection.start();
             
            } catch (err) {
                console.error("Error while starting connection: ", err);
                setLoading(false);
                return;
            }

            await connection.invoke("JoinSpecificChatRoom", { UserName, ChatRoom });
            setConnection(connection);
        } catch (error) {
            console.error("Connection error: ", error);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async (message) => {
        if (connection) {
            try {
                await connection.invoke("SendMessage", message);
            } catch (error) {
                console.error("SendMessage error: ", error);
            }
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900">
            <main className="container flex-grow mx-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="ml-4 text-white">Connecting to chat room...</p>
                    </div>
                ) : (
                    !connection ? (
                        <WaitingRoom JoinChatRoom={joinChatRoom} />
                    ) : (
                        <div className="flex flex-col h-screen ">
                            <ChatRoom userMessages={userMessages} />
                            <ChatBox sendMessage={sendMessage} />  
                        </div>
                    )
                )}
            </main>
        </div>
    );
}

export default ChatController;
