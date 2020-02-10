import Akun from 'akun-api';
import React from 'react';
import './App.css';
import NavBar from './NavBar.jsx';
import StoryView from './StoryView.jsx';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this._akun = new Akun({
			protocol: 'http:',
			hostname: 'localhost:5050',
			connection: {
				hostname: 'rt.fiction.live'
			}
		});
		this.state = {
			client: null,
			clientChatFreshEntry: false,
			liveStories: []
		};

		this.updateLiveStories();
	}

	async updateLiveStories() {
		this.setState({ liveStories: (await this._akun.get('/api/anonkun/board/live')).stories });
		setTimeout(() => {
			this.updateLiveStories();
		}, 30000);
	}

	join(id) {
		this._akun.join(id)
			.then((client) => {
				this.setState({ client });
			});
	}

	render() {
		return (
			<div className="App">
				<NavBar
					liveStories={this.state.liveStories}
					join={this.join.bind(this)}
				/>
				{this.state.client ? (<StoryView client={this.state.client}/>) : (<div>Nothing to see here</div>)}
			</div>
		);
	}
}


