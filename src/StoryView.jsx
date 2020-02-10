import React from 'react';
import Chat from './Chat.jsx';
import Story from './Story.jsx';
import StoryControls from './StoryControls.jsx';
import './StoryView.css';

export default class StoryView extends React.Component {
	constructor(props) {
		super(props);
		const { client } = props;

		this.state = {
			chatFreshEntry: true
		};

		client.chatThread.on('chat', () => {
			this.setState({ chatFreshEntry: false });
		});
		client.chatThread.on('chatUpdated', () => {
			this.setState({ chatFreshEntry: false });
		});


		client.storyThread.on('chapter', () => {
			this.setState({});
		});
		client.storyThread.on('chapterUpdated', () => {
			this.setState({});
		});
		client.storyThread.on('choice', () => {
			this.setState({});
		});
		client.storyThread.on('choiceUpdated', () => {
			this.setState({});
		});
		client.storyThread.on('readerPost', () => {
			this.setState({});
		});
		client.storyThread.on('readerPostUpdated', () => {
			this.setState({});
		});
	}

	render() {


		return (
			<div className="story-view">
				<StoryControls/>
				<Story
					nodes={this.props.client.storyThread.history.nodes}
				/>
				<Chat
					nodes={this.props.client.chatThread.history.nodes}
					postChat={this.props.client.postChat.bind(this.props.client)}
					freshEntry={this.state.chatFreshEntry}
				/>
			</div>
		);
	}
}
