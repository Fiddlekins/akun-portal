import React from 'react';
import Chat from '../chat/Chat.jsx';
import Story from './Story.jsx';
import StoryControls from './StoryControls.jsx';
import styles from './StoryView.module.css';

export default function StoryView({ client }) {
	return (
		<div className={styles.view}>
			<StoryControls/>
			<Story
				client={client}
			/>
			<Chat client={client}/>
		</div>
	);
}
