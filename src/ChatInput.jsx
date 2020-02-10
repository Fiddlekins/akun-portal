import React, {useReducer, useRef} from 'react';
import './ChatInput.css';

const initialState = {
	textarea: ''
};

function reducer(state, { field, value }) {
	return {
		...state,
		[field]: value
	};
}

export default function ChatInput({ postChat }) {
	const chatInputRef = useRef(null);

	const [state, dispatch] = useReducer(reducer, initialState);

	const tryPost = () => {
		const body = chatInputRef.current.value;
		if (body.length > 0) {
			dispatch({ field: 'textarea', value: '' });
			postChat(body);
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		tryPost();
	};

	const onKeyDown = (e) => {
		if (e.key === 'Enter' && !e.altKey && !e.shiftKey && !e.ctrlKey) {
			e.preventDefault();
			tryPost();
		}
	};

	const onChange = (e) => {
		dispatch({ field: e.target.name, value: e.target.value });
		e.target.style.height = 'inherit';
		e.target.style.height = `${e.target.scrollHeight}px`;
	};

	return (
		<form className="chat-input" onSubmit={onSubmit}>
			<textarea
				ref={chatInputRef}
				name="textarea"
				value={state.textarea}
				rows="1"
				onKeyDown={onKeyDown}
				onChange={onChange}
			/>
			{/*<button type="submit">Submit</button>*/}
		</form>
	);
}
