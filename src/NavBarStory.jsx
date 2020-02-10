import React from 'react';
import './NavBarStory.css';
import formatImageUrl from './utils/formatImageUrl.js';

export default function NavBarStory({ data, join }) {
	const options = {
		width: 64,
		height: 64,
		crop: true
	};
	let coverUrl = `https://placekitten.com/${options.width}/${options.height}`;
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
	return (
		<div className="nav-bar-story" onClick={onClick}>
			{/*<div className="nav-bar-story">*/}
			{/*<span className="title">{data.t}</span>*/}
			<img src={coverUrl} alt=""/>
		</div>
	);
}
