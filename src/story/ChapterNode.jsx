import React from 'react';
import formatImageUrl from '../utils/formatImageUrl.js';
import './ChapterNode.css';

export default function ChapterNode(props) {
	let innerHTML = props.node.body;
	innerHTML = innerHTML.replace(/(<img.*?src=")(https?:\/\/[A-z0-9/.]+)(".*?>)/g, ($0, $1, $2, $3) => {
		return `${$1}${formatImageUrl($2)}${$3}`;
	});
	return (
		<div className="chapter-node">
			<div className="username">{props.node.username}</div>
			<div className="body" dangerouslySetInnerHTML={{ __html: innerHTML }}/>
		</div>
	);
}
