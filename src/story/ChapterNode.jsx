import React from 'react';
import formatDate from '../utils/formatDate.js';
import formatImageUrl from '../utils/formatImageUrl.js';
import './ChapterNode.css';

export default function ChapterNode({ node }) {
	let innerHTML = node.body;
	innerHTML = innerHTML.replace(/(<img.*?src=")(https?:\/\/[A-z0-9/.]+)(".*?>)/g, ($0, $1, $2, $3) => {
		return `${$1}${formatImageUrl($2)}${$3}`;
	});
	return (
		<div className="chapter-node">
			<div className="header">
				<span className="title"></span>
				<span className="date">{formatDate(new Date(node.createdTime))}</span>
			</div>
			<div className="body" dangerouslySetInnerHTML={{ __html: innerHTML }}/>
		</div>
	);
}
