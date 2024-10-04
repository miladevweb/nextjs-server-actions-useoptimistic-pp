'use server'
import { supabase as db } from './supabase'

export async function getPosts() {
  const { data, error } = await db.from('posts').select()
  if (error) throw new Error(error.message)
  return data
}

export async function createPost(formData: FormData) {
  const { title } = Object.fromEntries(formData) as { title: string }
  const { error, status, statusText } = await db.from('posts').insert({ title })
  if (error) throw new Error(error.message)
  console.log(status, statusText)
}

// useFormState needs a prevState as its first parameter
// Even, even though, although it doesn't use it
export async function createPostState(_prevState: any, formData: FormData) {
  const { title } = Object.fromEntries(formData) as { title: string }
  const { error, status, statusText } = await db.from('posts').insert({ title })
  if (error) return { message: 'Please enter a valid title' }
  return { message: `Codigo de status: ${status} - ${statusText}` }
}
