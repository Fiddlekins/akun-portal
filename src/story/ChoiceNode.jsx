import classnames from 'classnames/bind';
import React, {useState} from 'react';
import akun from '../akun.js';
import formatDate from '../utils/formatDate.js';
import styles from './ChoiceNode.module.css';

const cx = classnames.bind(styles);

function Choice({ choice, choiceNodeId, startsSelected }) {
	const [selectedState, setSelected] = useState(startsSelected);

	const onClick = () => {
		switch (selectedState) {
			case 'pending':
				return;
			case 'selected':
				akun.removeVote(choiceNodeId, choice.choiceId)
					.then(() => {
						setSelected('unselected');
					})
					.catch(() => {
						setSelected('selected');
					});
				break;
			case 'unselected':
				akun.vote(choiceNodeId, choice.choiceId)
					.then(() => {
						setSelected('selected');
					})
					.catch(() => {
						setSelected('unselected');
					});
				break;
			default:
				console.warn(`ChoiceNode in unexpected selectedState: ${selectedState}`);
				return;
		}
		setSelected('pending');
	};

	return (
		<tr className={cx('choice', selectedState, { xOut: choice.xOut })} onClick={onClick}>
			<td className={styles.vote}>
				<div className={styles.value}>{choice.value}</div>
				{choice.xOutReason && <div className={styles.xOutReason}>{choice.xOutReason}</div>}
			</td>
			<td className={styles.count}>{choice.countVerified}/{choice.count}</td>
		</tr>
	);
}

function getVoterCountText(voterCount) {
	let voterCountText;
	if (voterCount > 1) {
		voterCountText = `${voterCount} voters`;
	} else if (voterCount === 1) {
		voterCountText = `1 voter`;
	} else {
		voterCountText = `be the first to vote.`;
	}
	return voterCountText;
}

export default function ChoiceNode({ node }) {

	const visibleChoices = node.choices.filter((choice) => !(choice.xOut && choice.value === 'permanentlyRemoved'));
	const availableChoices = [];
	const crossedOutChoices = [];
	visibleChoices.forEach((choice) => {
		if (choice.xOut) {
			crossedOutChoices.push(choice);
		} else {
			availableChoices.push(choice);
		}
	});

	return (
		<div className={styles.node}>
			<div className={styles.header}>
				<span className={styles.title}>Choice -&nbsp;</span>
				{node.closed && (<span className={styles.closedState}>Voting closed -&nbsp;</span>)}
				<span className={styles.count}>{getVoterCountText(node.voterCount)}</span>
				<span className={styles.date}>{formatDate(new Date(node.createdTime))}</span>
			</div>
			<div className={cx('body', { open: !node.closed })}>
				<table className={styles.table}>
					<tbody>
					<tr>
						<th/>
						<th className={styles.countHeader}>Votes</th>
					</tr>
					{availableChoices.concat(crossedOutChoices).map((choice) => {
						return (<Choice
							key={choice.choiceId}
							choice={choice}
							choiceNodeId={node.id}
							startsSelected={'unselected'}
						/>);
					})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
