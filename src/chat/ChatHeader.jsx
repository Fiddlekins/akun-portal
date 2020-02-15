import React, {useEffect, useState} from 'react';
import './ChatHeader.css';

export default function ChatHeader({ client }) {
	const [usersCount, setUsersCount] = useState(client.chatThread.usersCount);

	useEffect(() => {
		const onChatUsersCount = (usersCount) => {
			setUsersCount(usersCount);
		};
		client.chatThread.on('usersCount', onChatUsersCount);
		setUsersCount(client.chatThread.usersCount);
		return () => {
			client.chatThread.off('usersCount', onChatUsersCount);
		}
	}, [client]);

	return (
		<div className="chat-header">
			<div className="title">Chat</div>
			<div className="user-count">{usersCount} users</div>
		</div>
	);
}
