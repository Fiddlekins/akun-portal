import React from 'react';
import './ReaderPostNode.css';

export default function ReaderPostNode(props) {
	return (
		<div className="reader-post-node">
			<div className="username">{props.node.username}</div>
			<div className="body">{props.node.body}</div>
		</div>
	);
}
