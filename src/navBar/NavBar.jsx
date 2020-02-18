import React, {useReducer, useRef} from 'react';
import styles from './NavBar.module.css';
import NavBarStory from './NavBarStory.jsx';
import NavBarStoryInfo from './NavBarStoryInfo.jsx';

const initialState = { story: null, storyPosition: 0, scrollTop: 0 };

function reducer(state, { story, storyPosition, scrollTop }) {
	return {
		story: story === undefined ? state.story : story,
		storyPosition: storyPosition ?? state.storyPosition,
		scrollTop: scrollTop ?? state.scrollTop
	};
}

export default function NavBar({ liveStories, showStory }) {
	const contentRef = useRef(null);

	const [state, dispatch] = useReducer(reducer, initialState);

	const onMouseEnter = (story, position) => {
		dispatch({ story, storyPosition: position });
	};

	const onMouseLeave = (story) => {
		if (story === state.story) {
			dispatch({ story: null });
		}
	};

	const onScroll = () => {
		dispatch({ scrollTop: contentRef.current.scrollTop });
	};

	return (
		<>
			<div className={styles.navBar}>
				<div className={styles.content} ref={contentRef} onScroll={onScroll}>
					{liveStories.map((story) => {
						return (<NavBarStory
							key={story._id}
							data={story}
							showStory={showStory}
							onMouseEnter={onMouseEnter}
							onMouseLeave={onMouseLeave}
						/>);
					})}
				</div>
			</div>
			<div className={styles.navBarOverlay}>
				{state.story && (
					<NavBarStoryInfo story={state.story} position={state.storyPosition - state.scrollTop + 32}/>)}
			</div>
		</>
	);
}
