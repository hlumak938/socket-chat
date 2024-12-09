import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/chat')({
  component: Chat,
})

function Chat() {
  return <div>Hello "/chat"!</div>
}
