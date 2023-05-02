import events from 'events';
import setTimeoutPromise from './utils/setTimeoutPromise.js';

class UsernameStore extends events.EventEmitter {
	constructor() {
		super();

		this._usernameid = [];
		this._inflight = new Set();
	}

	get usernameid() {
		return this._usernameid;
	}

	getUsername(userId) {
		const username = this._usernameid[userId] ?? null;
		if (!username) {
			this._fetchUsername(userId).catch(console.error);
		}
		return username;
	}

	async _fetchUsername(userId) {
		if (this._inflight.has(userId)) {
			return;
		}
		this._inflight.add(userId);
		const res = await fetch(`http://localhost:9060/${userId}`);
		const username = await res.text();
		this._inflight.delete(userId);
		console.log(username);
		console.log(username?.length > 0);
		if (username?.length > 0) {
			this._usernameid[userId] = username;
			this.emit(userId, username);
		} else {
			await setTimeoutPromise(5000);
			this.getUsername(userId);
		}
	}
}

export default new UsernameStore();
