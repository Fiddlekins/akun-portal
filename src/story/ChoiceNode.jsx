import React from 'react';
import './ChoiceNode.css';

export default function ChoiceNode(props) {
	return (
		<div className="choice-node">
			<div className="username">{props.node.username}</div>
			<div className="body">{props.node.body}</div>
		</div>
	);
}
