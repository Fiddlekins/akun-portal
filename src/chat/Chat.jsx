import React from 'react';
import './Chat.css';
import ChatHeader from './ChatHeader.jsx';
import ChatHistory from './ChatHistory.jsx';
import ChatInput from './ChatInput.jsx';

export default function Chat({ client }) {
	const postChat = client.postChat.bind(client);

	return (
		<div className="chat">
			<ChatHeader client={client}/>
			<ChatHistory client={client}/>
			<ChatInput postChat={postChat}/>
		</div>
	);
}
