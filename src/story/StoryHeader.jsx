import React from 'react';
import formatImageUrl from '../utils/formatImageUrl.js';
import './StoryHeader.css';
import TagList from './TagList.jsx';

function Author({ user }) {
	const avatarUrl = user.a && formatImageUrl(user.a, { width: 32, height: 32 });
	return (<div className="author">
		<a href={`https://fiction.live/user/${user.n}`}>
			{avatarUrl ? (<img alt="" className="avatar" src={avatarUrl}/>) : null}
			<span className="username">{user.n}</span>
		</a>
	</div>);
}

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
	if (coverUrl) {
		coverUrl = formatImageUrl(coverUrl);
	}
	return (
		<div className="story-header">
			<h1 className="title">{metaData.t}</h1>
			{coverUrl && <img alt="" className="cover" src={coverUrl} key={coverUrl}/>}
			<div className="authors">{
				metaData.u.filter((user) => user.n).map((user) => {
					return (<Author key={user.n} user={user}/>)
				})
			}</div>
			<TagList tags={metaData.ta} spoilerTags={metaData.spoilerTags}/>
			{metaData.d && <div className="description">{metaData.d}</div>}
		</div>
	);
}
