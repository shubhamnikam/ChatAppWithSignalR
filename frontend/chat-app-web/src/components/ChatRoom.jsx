import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ChatRoom = ({ userMessages }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [userMessages]);

    return (
        <div className="h-screen p-4 mt-1 overflow-y-scroll bg-white rounded-lg shadow-lg md:mt-8">
            {userMessages.map((msg, index) => (
                <div key={index} className={`mb-2 p-2 rounded ${msg.isSystem ? 'bg-gray-200' : 'bg-blue-200'}`}>
                    <strong>{msg.user}: </strong>{msg.message}
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}

ChatRoom.propTypes = {
    userMessages: PropTypes.arrayOf(
        PropTypes.shape({
            user: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            isSystem: PropTypes.bool.isRequired
        })
    ).isRequired
};

export default ChatRoom;
