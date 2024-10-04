'use client'
import { useFormStatus } from 'react-dom'

export function FormStatusButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      Send
    </button>
  )
}
