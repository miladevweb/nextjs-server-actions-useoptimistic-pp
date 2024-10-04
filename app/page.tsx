import { getPosts, createPost } from '@/utils/action'
import { FormStatusButton } from './_components/form-status'
import { FormStateComponent } from './_components/form-state'
import { FormOptimisticComponent } from './_components/form-optimistic'

export default async function Page() {
  const data = await getPosts()
  return (
    <div style={{ color: 'white', fontSize: '5rem', marginTop: '7rem' }}>
      {data.map(({ title }) => (
        <div key={title}>{title}</div>
      ))}

      <form action={createPost}>
        <input type="text" name="title" />
        {/* useFormStatus */}
        <FormStatusButton />
      </form>

      {/* useFormState */}
      <FormStateComponent />

      {/* useFormOptimistic */}
      <FormOptimisticComponent />
    </div>
  )
}
