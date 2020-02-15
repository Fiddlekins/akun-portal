import React from 'react';
import './NavBarStoryInfo.css';

export default function NavBarStoryInfo({ story, position }) {
	return (
		<div className="nav-bar-story-info" style={{ top: `${position}px` }}>
			<div className="pointer"/>
			<div className="content">
				{story.t}
			</div>
		</div>
	);
}
