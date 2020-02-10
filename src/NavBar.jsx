import React from 'react';
import './NavBar.css';
import NavBarStory from './NavBarStory.jsx';

export default function NavBar({ liveStories, join }) {
	return (
		<div className="nav-bar">
			{liveStories.map((story) => {
				return (<NavBarStory
					key={story._id}
					data={story}
					join={join}
				/>);
			})}
		</div>
	);
}
