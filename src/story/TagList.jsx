import React from 'react';
import './TagList.css';

export default function TagList({ tags, spoilerTags }) {
	return (
		<div className="tag-list">
			<span className="label">TAGS:</span>
			{tags && tags.map((tag) => {
				return (
					<span
						className={`tag ${spoilerTags.includes(tag) ? 'spoiler' : ''}`}
						key={tag}
					>
						{tag}
					</span>
				);
			})}
		</div>
	);
}
