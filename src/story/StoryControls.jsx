import React from 'react';
import styles from './StoryControls.module.css';

export default function StoryControls() {
	return (
		<div className={styles.controls}>
			<div>Live Timer</div>
			<div>Reviews</div>
			<div>Follow</div>
			<div>Pick chapter</div>
		</div>
	);
}
