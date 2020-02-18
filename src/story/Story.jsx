import React, {useEffect, useState} from 'react';
import ChapterNode from './ChapterNode.jsx';
import ChoiceNode from './ChoiceNode.jsx';
import ReaderPostNode from './ReaderPostNode.jsx';
import styles from './Story.module.css';
import StoryHeader from './StoryHeader.jsx';

export default function Story({ client }) {
	const [nodes, setNodes] = useState(client.storyThread.history.nodes);
	const [metaData, setMetaData] = useState(client.storyThread.metaData);

	useEffect(() => {
		const onChapter = () => {
			setNodes(client.storyThread.history.nodes.slice());
		};
		const onChapterUpdated = () => {
			setNodes(client.storyThread.history.nodes.slice());
		};
		const onChoice = () => {
			setNodes(client.storyThread.history.nodes.slice());
		};
		const onChoiceUpdated = () => {
			setNodes(client.storyThread.history.nodes.slice());
		};
		const onReaderPost = () => {
			setNodes(client.storyThread.history.nodes.slice());
		};
		const onReaderPostUpdated = () => {
			setNodes(client.storyThread.history.nodes.slice());
		};
		const onMetaData = (metaData) => {
			setMetaData(metaData);
		};

		client.storyThread.on('chapter', onChapter);
		client.storyThread.on('chapterUpdated', onChapterUpdated);
		client.storyThread.on('choice', onChoice);
		client.storyThread.on('choiceUpdated', onChoiceUpdated);
		client.storyThread.on('readerPost', onReaderPost);
		client.storyThread.on('readerPostUpdated', onReaderPostUpdated);
		client.storyThread.on('metaData', onMetaData);

		setNodes(client.storyThread.history.nodes.slice());
		setMetaData(client.storyThread.metaData);
		return () => {
			client.storyThread.off('chapter', onChapter);
			client.storyThread.off('chapterUpdated', onChapterUpdated);
			client.storyThread.off('choice', onChoice);
			client.storyThread.off('choiceUpdated', onChoiceUpdated);
			client.storyThread.off('readerPost', onReaderPost);
			client.storyThread.off('readerPostUpdated', onReaderPostUpdated);
			client.storyThread.off('metaData', onMetaData);
		}
	}, [client]);

	let unrecognisedKey = 0;
	return (
		<div className={styles.story}>
			<StoryHeader metaData={metaData}/>
			<div className={styles.history}>
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
				<div className={styles.footer}/>
			</div>
		</div>
	);
}
