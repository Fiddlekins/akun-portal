import React from 'react';
import Chat from '../chat/Chat.jsx';
import Story from './Story.jsx';
import StoryControls from './StoryControls.jsx';
import './StoryView.css';

export default function StoryView({ client }) {
	return (
		<div className="story-view">
			<StoryControls/>
			<Story
				client={client}
			/>
			<Chat client={client}/>
		</div>
	);
}
