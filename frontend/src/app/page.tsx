'use client';

import { useState } from 'react';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { Toaster } from 'react-hot-toast';
import { Layout } from 'lucide-react';

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTaskAction = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center gap-3 mb-10">
          <div className="bg-indigo-600 p-2.5 rounded-lg text-white shadow-lg shadow-indigo-100">
            <Layout size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Task Manager</h1>
            <p className="text-gray-500 font-medium">Organize your daily activities elegantly</p>
          </div>
        </header>

        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <TaskForm onTaskCreated={handleTaskAction} />
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-xl font-bold text-gray-800">Your Tasks</h2>
            <div className="h-px flex-1 bg-gray-200 mx-4"></div>
          </div>
          <TaskList refreshTrigger={refreshTrigger} />
        </section>
      </div>
    </main>
  );
}
