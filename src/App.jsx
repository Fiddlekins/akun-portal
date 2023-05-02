import React from 'react'
import akun from './akun.js'
import './App.css'
import { LoadingScreen } from './LoadingScreen.jsx'
import { NavBar } from './navBar/NavBar.jsx'
import { StoryView } from './story/StoryView.jsx'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      initPhase: true,
      client: null,
      clientChatFreshEntry: false,
      liveStories: []
    }

    this.init()
  }

  async init () {
    await Promise.all([
      akun.ephemeralUserIdPromise,
      this.joinPinnedStories()
    ])
    await Promise.all([
      this.showStory('vhHhMfskRnNDbxwzo'),
      await this.updateLiveStories()
    ])
    this.setState({ initPhase: false })
  }

  async joinPinnedStories () {
    // Use live instead of pinned for now
    const { stories } = await akun.getStories('live', null)
    return stories.map((story) => {
      return akun.join(story._id)
    })
  }

  async updateLiveStories () {
    const { stories } = await akun.getStories('live', null)
    this.setState({ liveStories: stories })
    // setTimeout(() => {
    // 	this.updateLiveStories();
    // }, 30000);
  }

  async showStory (id) {
    const client = await akun.join(id)
    this.setState({ client })
  }

  render () {
    if (this.state.initPhase) {
      return (<LoadingScreen/>)
    } else {
      return (
        <div className="App">
          <NavBar
            liveStories={this.state.liveStories}
            showStory={this.showStory.bind(this)}
          />
          {this.state.client ? (<StoryView client={this.state.client}/>) : (<div>Nothing to see here</div>)}
        </div>
      )
    }
  }
}
