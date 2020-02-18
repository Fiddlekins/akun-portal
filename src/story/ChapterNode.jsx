import React from 'react';
import formatDate from '../utils/formatDate.js';
import formatImageUrl from '../utils/formatImageUrl.js';
import styles from './ChapterNode.module.css';

export default function ChapterNode({ node }) {
	let innerHTML = node.body;
	innerHTML = innerHTML.replace(/(<img.*?src=")(https?:\/\/[A-z0-9/.]+)(".*?>)/g, ($0, $1, $2, $3) => {
		return `${$1}${formatImageUrl($2)}${$3}`;
	});
	return (
		<div className={styles.node}>
			<div className={styles.header}>
				<span className={styles.date}>{formatDate(new Date(node.createdTime))}</span>
			</div>
			<div className={styles.body} dangerouslySetInnerHTML={{ __html: innerHTML }}/>
		</div>
	);
}
