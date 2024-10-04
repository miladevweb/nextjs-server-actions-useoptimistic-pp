'use client'
import { useFormState } from 'react-dom'
import { createPostState } from '@/utils/action'

const initialState = { message: '' }
export function FormStateComponent() {
  const [state, formAction] = useFormState(createPostState, initialState)
  return (
    <form action={formAction}>
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" required id="title" />
      <p aria-live="polite" style={{ color: 'white' }}>
        {state?.message}
      </p>
      <button>Add</button>
    </form>
  )
}
