import React from 'react';
import './NavBarStory.css';
import formatImageUrl from './utils/formatImageUrl.js';

function getShortName(title) {
	const match = title.match(/\b[A-z:']/g);
	if (!match) {
		console.warn(`Could not derive short name for ${title}`);
		return 'X';
	}
	return match.join('');
}

export default function NavBarStory({ data, join }) {
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
		join(data._id);
	};
	const style = {
		width: `${options.width}px`,
		height: `${options.height}px`,
		borderRadius: `${options.width / 2}px`
	};
	const shortNameStyle = {
		width: `${options.width}px`,
		height: `${options.height}px`,
		lineHeight: `${options.height}px`
	};
	const shortName = getShortName(data.t);
	let shortNameClass = 'short-name-large';
	if (shortName.length > 3) {
		shortNameClass = 'short-name-medium';
	}
	if (shortName.length > 5) {
		shortNameClass = 'short-name-small';
	}
	return (
		<div className="nav-bar-story" onClick={onClick} style={style}>
			<div className={`short-name ${shortNameClass}`} style={shortNameStyle}>{shortName}</div>
			{coverUrl && <img src={coverUrl} alt="" className="icon"/>}
		</div>
	);
}
