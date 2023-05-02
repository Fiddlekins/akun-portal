import React from 'react'
import styles from './Chat.module.css'
import { ChatHeader } from './ChatHeader.jsx'
import { ChatHistory } from './ChatHistory.jsx'
import { ChatInput } from './ChatInput.jsx'

export function Chat ({ client }) {
  const postChat = client.postChat.bind(client)

  return (
    <div className={styles.chat}>
      <ChatHeader client={client}/>
      <ChatHistory client={client}/>
      <ChatInput postChat={postChat}/>
    </div>
  )
}
