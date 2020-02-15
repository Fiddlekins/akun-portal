import React from 'react';
import './StoryHeader.css';
import TagList from './TagList.jsx';

export default function StoryHeader({ metaData }) {
	// const {
	// 	ta, // tags
	// 	spoilerTags,
	// 	u, // Array of authors
	// 	storyStatus, // active/hiatus/finished
	// 	contentRating, // age rating
	// 	i, // cover image
	// 	isLive,
	// 	nextLive
	// } = metaData;
	let coverUrl = null;
	if (Array.isArray(metaData.i)) {
		coverUrl = metaData.i[0];
	} else if (metaData.i) {
		coverUrl = metaData.i;
	}
	return (
		<div className="story-header">
			<h1 className="title">{metaData.t}</h1>
			{coverUrl && <img alt="" className="cover" src={coverUrl} key={coverUrl}/>}
			<div className="author">{}</div>
			<TagList tags={metaData.ta} spoilerTags={metaData.spoilerTags}/>
			{metaData.d && <div className="description">{metaData.d}</div>}
		</div>
	);
}
