import _ from 'lodash';
import React from 'react';
import './ReaderPostNode.css';
import formatDate from '../utils/formatDate.js';

function Dice({ dice, vote }) {
	return (
		<div className="entry">
			<div dangerouslySetInnerHTML={{ __html: dice }}/>
			{vote && (<div dangerouslySetInnerHTML={{ __html: vote }}/>)}
		</div>
	);
}

function Vote({ vote }) {
	return (
		<div className="entry">
			<div dangerouslySetInnerHTML={{ __html: vote }}/>
		</div>
	);
}

export default function ReaderPostNode({ node }) {
	const diceRollerIds = node.dice && Object.keys(node.dice);
	const voterIds = node.votes && Object.keys(node.votes);
	const uniqueIds = _.uniq(diceRollerIds, voterIds);
	const postCount = uniqueIds.length;
	let postCountText;
	if (postCount > 1) {
		postCountText = `${postCount} posts`;
	} else if (postCount === 1) {
		postCountText = `1 post`;
	} else {
		postCountText = `be the first to post.`;
	}

	return (
		<div className="reader-post-node">
			<div className="header">
				<span className="title">Reader Posts -&nbsp;</span>
				{node.closed && (<span className="closed-state">Closed -&nbsp;</span>)}
				<span className="count">{postCountText}</span>
				<span className="date">{formatDate(new Date(node.createdTime))}</span>
			</div>
			<div className="body">
				{node.dice && <div className="dice">{
					diceRollerIds.map((diceRollerId) => {
						return (<Dice
							key={diceRollerId}
							dice={node.dice[diceRollerId]}
							vote={node.votes && node.votes[diceRollerId]}
						/>);
					})
				}</div>}
				{node.votes && <div className="votes">
					{
						voterIds.filter((voterId) => {
							return !diceRollerIds.includes(voterId);
						}).map((voterId) => {
							return (<Vote key={voterId} vote={node.votes[voterId]}/>);
						})
					}
				</div>}
			</div>
		</div>
	);
}
