'use client';

import { useEffect, useState } from 'react';
import { getTasks, updateTask, deleteTask } from '@/lib/api';
import toast from 'react-hot-toast';
import { Trash2, CheckCircle, Circle, Clock } from 'lucide-react';

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

interface TaskListProps {
  refreshTrigger: number;
}

export default function TaskList({ refreshTrigger }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);

  const handleToggleComplete = async (task: Task) => {
    try {
      await updateTask(task._id, { completed: !task.completed });
      toast.success(task.completed ? 'Task marked as incomplete' : 'Task completed!');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(id);
      toast.success('Task deleted');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <p className="text-gray-500 font-medium">No tasks found. Add your first task above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`p-5 rounded-xl border transition-all duration-300 flex items-start gap-4 group ${
            task.completed ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-100 hover:shadow-md hover:border-indigo-100'
          }`}
        >
          <button
            onClick={() => handleToggleComplete(task)}
            className={`mt-1 transition-colors ${
              task.completed ? 'text-green-500 hover:text-green-600' : 'text-gray-400 hover:text-indigo-500'
            }`}
          >
            {task.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
          </button>
          
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-semibold truncate ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-400 font-medium">
              <Clock size={12} />
              <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <button
            onClick={() => handleDelete(task._id)}
            className="text-gray-300 hover:text-red-500 transition-colors p-1"
            title="Delete task"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}
