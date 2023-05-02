import React from 'react'
import styles from './NavBarStoryInfo.module.css'

export function NavBarStoryInfo ({ story, position }) {
  return (
    <div className={styles.storyInfo} style={{ top: `${position}px` }}>
      <div className={styles.pointer}/>
      <div className={styles.content}>
        <div dangerouslySetInnerHTML={{ __html: story.t }}/>
      </div>
    </div>
  )
}
