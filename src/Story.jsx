import React from 'react';
import ChapterNode from './ChapterNode.jsx';
import ChoiceNode from './ChoiceNode.jsx';
import ReaderPostNode from './ReaderPostNode.jsx';
import './Story.css';

export default function Story({ nodes }) {
	let unrecognisedKey = 0;
	return (
		<div className="story">
			<div className="history">
				{nodes.map((node) => {
					switch (node.type) {
						case 'chapter':
							return (<ChapterNode key={node.id} node={node}/>);
						case 'choice':
							return (<ChoiceNode key={node.id} node={node}/>);
						case 'readerPost':
							return (<ReaderPostNode key={node.id} node={node}/>);
						default:
							return (<div key={unrecognisedKey++}>Unrecognised node type: {node.type}</div>);
					}
				})}
			</div>
		</div>
	);
}
