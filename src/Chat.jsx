import React, {useEffect, useRef} from 'react';
import './Chat.css';
import ChatInput from './ChatInput.jsx';
import ChatNode from './ChatNode.jsx';

export default function Chat({ nodes, postChat, freshEntry }) {
	const historyRef = useRef(null);
	const messageEndRef = useRef(null);

	const scrollToBottom = () => {
		if (!nodes.length) {
			return;
		}
		const { scrollHeight, scrollTop, clientHeight } = historyRef.current;
		const distanceFromBottom = scrollHeight - clientHeight - scrollTop;
		const finalNode = messageEndRef.current.previousElementSibling;
		const penultimateNode = finalNode.previousElementSibling;
		const threshold = finalNode.clientHeight + (penultimateNode ? penultimateNode.clientHeight : 0);
		if (freshEntry || distanceFromBottom <= threshold) {
			messageEndRef.current.scrollIntoView();
		}
	};

	useEffect(scrollToBottom);

	return (
		<div className="chat">
			<div className="history" ref={historyRef}>
				{nodes.map((node) => {
					return <ChatNode key={node.id} node={node}/>
				})}
				<div ref={messageEndRef}/>
			</div>
			<ChatInput postChat={postChat}/>
		</div>
	);
}
