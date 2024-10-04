'use client'
import { createPost } from '@/utils/action'
import { useOptimistic, useRef, useState } from 'react'

type Message = {
  message: string
}
// We need to store optimisticMessage in a useState because the one lasts during the action is executed
export function FormOptimisticComponent() {
  const formRef = useRef<HTMLFormElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  // optimisticMessage stores all messages, addOptimisticMessage does the same as callback
  const [optimisticMessage, addOptimisticMessage] = useOptimistic<Message[], string>(messages, (currentState, newMessage) => {
    return [...currentState, { message: newMessage }]
  })

  const optimisticAction = async (formData: FormData) => {
    const title = formData.get('title') as string
    addOptimisticMessage(title) // "title" is the newMessage of the callback
    formRef.current?.reset() // we reset the input values
    await createPost(formData)
    setMessages((currentMessages) => [...currentMessages, { message: title }])
  }

  return (
    <div>
      {optimisticMessage?.map((m, index) => (
        <div key={index} style={{ color: 'tomato' }}>
          {m.message}
        </div>
      ))}

      <form ref={formRef} action={optimisticAction}>
        <input type="text" name="title" />
        <button type="submit">Send Optimistic value</button>
      </form>
    </div>
  )
}
