import React from 'react';
import formatDate from '../utils/formatDate.js';
import './ChoiceNode.css';

export default function ChoiceNode({ node }) {
	let voterCountText;
	if (node.voterCount > 1) {
		voterCountText = `${node.voterCount} voters`;
	} else if (node.voterCount === 1) {
		voterCountText = `1 voter`;
	} else {
		voterCountText = `be the first to vote.`;
	}

	return (
		<div className="choice-node">
			<div className="header">
				<span className="title">Choice -&nbsp;</span>
				{node.closed && (<span className="closed">Voting closed -&nbsp;</span>)}
				<span className="count">{voterCountText}</span>
				<span className="date">{formatDate(new Date(node.createdTime))}</span>
			</div>
			<div className="body">
				<table>
					<tbody>
					<tr>
						<th/>
						<th className="count-header">Votes</th>
					</tr>
					{node.choices.filter((choice) => !(choice.xOut && choice.value === 'permanentlyRemoved')).map((choice) => {
						return (<tr key={choice.value}>
							<td className="vote">{choice.value}</td>
							<td className="count">{choice.countVerified}/{choice.count}</td>
						</tr>);
					})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
