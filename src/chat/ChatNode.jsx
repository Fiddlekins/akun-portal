import classnames from 'classnames/bind';
import React, {useEffect, useState} from 'react';
import usernameStore from '../usernameStore.js';
import formatDate from '../utils/formatDate.js';
import formatImageUrl from '../utils/formatImageUrl.js';
import styles from './ChatNode.module.css';

const cx = classnames.bind(styles);

function NodeOwnerTrueAnon({ node }) {
	return (<span className={classnames(styles.username, styles.trueAnon)}>{node.username}</span>);
}

function NodeOwnerFalseAnon({ node }) {
	const [username, setUsername] = useState(null);

	useEffect(() => {
		const onId = (actualUsername) => {
			console.log(node.userId, actualUsername);
			setUsername(actualUsername);
		};
		usernameStore.once(node.userId, onId);
		setUsername(usernameStore.getUsername(node.userId));
		return () => {
			usernameStore.off(node.userId, onId);
		}
	}, [node.userId]);

	if (username) {
		const avatarUrl = node.avatar && formatImageUrl(node.avatar, { width: 16, height: 16 });
		return (
			<a href={`https://fiction.live/user/${username}`}>
				{avatarUrl ? (<img alt="" className={styles.avatar} src={avatarUrl}/>) : null}
				<span className={classnames(styles.username, styles.falseAnon)}>{username}</span>
			</a>
		);
	} else {
		return (
			<span className={classnames(styles.username, styles.falseAnon)}>{node.username} ({node.userId})}</span>
		);
	}
}

function NodeOwnerNonAnon({ node }) {
	const avatarUrl = node.avatar && formatImageUrl(node.avatar, { width: 16, height: 16 });
	return (
		<a href={`https://fiction.live/user/${node.username}`}>
			{avatarUrl ? (<img alt="" className={styles.avatar} src={avatarUrl}/>) : null}
			<span className={styles.username}>{node.username}</span>
		</a>
	);
}

function NodeOwner({ node }) {
	if (node.userId) {
		if (node.username === 'Anon') {
			return (<NodeOwnerFalseAnon node={node}/>);
		} else {
			return (<NodeOwnerNonAnon node={node}/>);
		}
	} else {
		return (<NodeOwnerTrueAnon node={node}/>);
	}
}

function processBody(body) {
	try {
		return body.toString().split('\n').map((line, lineIndex) => {
			let greenText = line.charAt(0) === '>';
			// TODO find a better way of doing this
			const delimiter = `some-dumb-string-nobody-would-use-${Math.random()}`;
			const content = line.replace(/https?:\/\/\S+/ig, ($0) => {
				return `${delimiter}${$0}${delimiter}`;
			}).split(delimiter).map((fragment, fragmentIndex) => {
				return /https?:\/\/\S+/i.test(fragment) ? (
					<a key={fragmentIndex + fragment} href={fragment}>{fragment}</a>) : fragment;
			});
			// TODO the key usage here is cursed
			return (<div key={lineIndex + line} className={cx({ greenText })}>{content}</div>);
		});
	} catch (err) {
		console.log(err);
		return <div style={{ color: 'red' }}> {err.toString()}</div>;
	}
}

export default function ChatNode({ node, onImageLoad, onImageLoadError }) {
	return (
		<div className={styles.node}>
			<div className={styles.info}>
				<NodeOwner node={node}/>
				<span className={styles.date}>{formatDate(new Date(node.createdTime))}</span>
			</div>
			{node.data.i && (<img
				alt="[failed to load]"
				className={styles.image}
				src={formatImageUrl(node.data.i)}
				onLoad={onImageLoad}
				onError={onImageLoadError}
			/>)}
			{node.body && (<div className={styles.body}>{processBody(node.body)}</div>)}
		</div>
	);
}
