import React from 'react';
import './ChatNode.css';
import formatDate from './utils/formatDate.js';
import formatImageUrl from './utils/formatImageUrl.js';

function NodeOwner({ node }) {
	if (node.userId) {
		if (node.username === 'Anon') {
			return (<span className="username">{node.username} ({node.userId})</span>);
		} else {
			const avatarUrl = node.avatar && formatImageUrl(node.avatar, { width: 16, height: 16 });
			return (<a href={`https://fiction.live/user/${node.username}`}>
					{avatarUrl ? (<img alt="" className="avatar" src={avatarUrl}/>) : null}
					<span className="username">{node.username}</span>
				</a>
			);
		}
	} else {
		return (<span className="username">{node.username}</span>);
	}

}

function processBody(body) {
	try {
		return body.split('\n').map((line, lineIndex) => {
			let greenText = line.charAt(0) === '>';
			// TODO find a better way of doing this
			const delimiter = `some-dumb-string-nobody-would-use-${Math.random()}`;
			const content = line.replace(/https?:\/\/[\S]+/ig, ($0) => {
				return `${delimiter}${$0}${delimiter}`;
			}).split(delimiter).map((fragment, fragmentIndex) => {
				return /https?:\/\/\S+/i.test(fragment) ? (
					<a key={fragmentIndex + fragment} href={fragment}>{fragment}</a>) : fragment;
			});
			return (<div key={lineIndex + line} className={greenText ? "green-text" : ""}>{content}</div>);
			// return greenText ? (<div className="green-text">{content}</div>) : (<div>{content}</div>);
		});
	} catch (err) {
		console.log(err);
		return 'oops';
	}
}

export default function ChatNode({ node }) {
	return (
		<div className="chat-node">
			<div className="info">
				<NodeOwner node={node}/>
				<span className="date">{formatDate(new Date(node.createdTime))}</span>
			</div>
			{node.data.i ? (<img alt="" className="image" src={formatImageUrl(node.data.i)}/>) : null}
			{node.body ? (<div className="body">{processBody(node.body)}</div>) : null}
		</div>
	);
}
