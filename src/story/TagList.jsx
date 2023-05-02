import classnames from 'classnames/bind'
import React from 'react'
import styles from './TagList.module.css'

const cx = classnames.bind(styles)

export function TagList ({ tags, spoilerTags }) {
  return (
    <div className={styles.tagList}>
      <span className={styles.label}>TAGS:</span>
      {tags && tags.map((tag) => {
        return (
          <span
            className={cx('tag', { spoiler: spoilerTags.includes(tag) })}
            key={tag}
          >
						{tag}
					</span>
        )
      })}
    </div>
  )
}
