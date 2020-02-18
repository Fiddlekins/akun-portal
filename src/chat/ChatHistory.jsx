import React, {useEffect, useRef, useState} from 'react';
import styles from './ChatHistory.module.css';
import ChatNode from './ChatNode.jsx';

export default function ChatHistory({ client }) {
	const historyRef = useRef(null);
	const messageEndRef = useRef(null);

	const [nodes, setNodes] = useState(client.chatThread.history.nodes);
	const [scrollOnUpdate, setScrollOnUpdate] = useState(true);

	const scrollToBottom = () => {
		if (!scrollOnUpdate) {
			return;
		}
		messageEndRef.current.scrollIntoView();
	};

	const onImageLoad = () => {
		scrollToBottom();
	};

	const onImageLoadError = () => {
		scrollToBottom();
	};

	const onScroll = () => {
		// if (!state.nodes?.length) {
		// 	return;
		// }
		const { scrollHeight, scrollTop, clientHeight } = historyRef.current;
		const distanceFromBottom = scrollHeight - clientHeight - scrollTop;
		// const finalNode = messageEndRef.current.previousElementSibling;
		// const penultimateNode = finalNode.previousElementSibling;
		const threshold = 0; // finalNode.clientHeight + (penultimateNode ? penultimateNode.clientHeight : 0);
		setScrollOnUpdate(distanceFromBottom <= threshold);
	};

	useEffect(scrollToBottom);

	useEffect(() => {
		const onChatChat = () => {
			setNodes(client.chatThread.history.nodes.slice());
		};
		const onChatChatUpdated = () => {
			setNodes(client.chatThread.history.nodes.slice());
		};
		client.chatThread.on('chat', onChatChat);
		client.chatThread.on('chatUpdated', onChatChatUpdated);

		setScrollOnUpdate(true);
		setNodes(client.chatThread.history.nodes.slice());
		return () => {
			client.chatThread.off('chat', onChatChat);
			client.chatThread.off('chatUpdated', onChatChatUpdated);
		}
	}, [client]);

	return (
		<div className={styles.history} ref={historyRef} onScroll={onScroll}>
			{nodes?.map((node) => {
				return <ChatNode
					key={node.id}
					node={node}
					onImageLoad={onImageLoad}
					onImageLoadError={onImageLoadError}
				/>
			})}
			<div ref={messageEndRef}/>
		</div>
	);
}
