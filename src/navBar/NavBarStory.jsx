import classnames from 'classnames/bind';
import React from 'react';
import formatImageUrl from '../utils/formatImageUrl.js';
import styles from './NavBarStory.module.css';

const cx = classnames.bind(styles);

function getShortName(title) {
	const match = title.match(/\b[A-z:']/g);
	if (!match) {
		console.warn(`Could not derive short name for ${title}`);
		return 'X';
	}
	return match.join('');
}

export default function NavBarStory({ data, showStory, onMouseEnter, onMouseLeave }) {
	const options = {
		width: 64,
		height: 64,
		crop: true
	};
	let coverUrl = null;//`https://placekitten.com/${options.width}/${options.height}`;
	if (data.i) {
		if (Array.isArray(data.i)) {
			coverUrl = formatImageUrl(data.i[0], options);
		} else {
			coverUrl = formatImageUrl(data.i, options);
		}
	}
	const onClick = () => {
		showStory(data._id);
	};
	const shortName = getShortName(data.t);
	let shortNameClass = 'large';
	if (shortName.length > 3) {
		shortNameClass = 'medium';
	}
	if (shortName.length > 5) {
		shortNameClass = 'small';
	}
	return (
		<div className={styles.story}
			 onClick={onClick}
			 onMouseEnter={(e) => {
				 onMouseEnter(data, e.currentTarget.offsetTop);
			 }}
			 onMouseLeave={() => {
				 onMouseLeave(data);
			 }}
		>
			<div className={cx('shortName', shortNameClass)}>{shortName}</div>
			{coverUrl && <img src={coverUrl} alt="" className={styles.icon}/>}
		</div>
	);
}
