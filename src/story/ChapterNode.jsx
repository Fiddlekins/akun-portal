import React from 'react';
import './ChapterNode.css';

export default function ChapterNode(props) {
	return (
		<div className="chapter-node">
			<div className="username">{props.node.username}</div>
			<div className="body" dangerouslySetInnerHTML={{ __html: props.node.body }}/>
		</div>
	);
}
