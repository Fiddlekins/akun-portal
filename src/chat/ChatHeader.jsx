import React, { useEffect, useState } from 'react'
import styles from './ChatHeader.module.css'

export function ChatHeader ({ client }) {
  const [usersCount, setUsersCount] = useState(client.chatThread.usersCount)

  useEffect(() => {
    const onChatUsersCount = (usersCount) => {
      setUsersCount(usersCount)
    }
    client.chatThread.on('usersCount', onChatUsersCount)
    setUsersCount(client.chatThread.usersCount)
    return () => {
      client.chatThread.off('usersCount', onChatUsersCount)
    }
  }, [client])

  return (
    <div className={styles.header}>
      <div className={styles.title}>Chat</div>
      <div className={styles.userCount}>{usersCount} users</div>
    </div>
  )
}
