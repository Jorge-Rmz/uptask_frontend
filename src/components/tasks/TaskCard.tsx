import type { Task } from '@/types/index'
import React from 'react'

interface TaskCardProps {
    task: Task
}

export default function TaskCard( {task}: TaskCardProps) {
  return (
    <div>
      <h1>Task Card</h1>
    </div>
  )
}
