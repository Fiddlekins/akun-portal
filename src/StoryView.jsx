import React from 'react';
import Chat from './chat/Chat.jsx';
import Story from './story/Story.jsx';
import StoryControls from './StoryControls.jsx';
import './StoryView.css';

export default function StoryView({ client }) {
	return (
		<div className="story-view">
			<StoryControls/>
			<Story
				metaData={client.storyThread.metaData}
				nodes={client.storyThread.history.nodes}
			/>
			<Chat client={client}/>
		</div>
	);
}
