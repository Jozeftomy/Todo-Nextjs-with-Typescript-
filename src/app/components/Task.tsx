'use client';

import React, { FormEventHandler, useState } from 'react';
import { Task as TaskType } from '../../../types/tasks';
import { MdOutlineDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import Modal from './Modal'; 
import { useRouter } from 'next/navigation';
import { editTodo, deleteTodo } from '../../../api'; 

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>(task.text); 
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await editTodo({
      id: task.id,
      text: newTodo,
    });

    setNewTodo('');
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDelete(false);
    router.refresh();
  };
  
  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        {/* Edit Icon */}
        <FiEdit
          cursor="pointer"
          size={20}
          className="text-blue-500"
          onClick={() => setOpenModalEdit(true)}
        />

        {/* Edit Modal */}
        <Modal isOpen={openModalEdit} onClose={() => setOpenModalEdit(false)}>
          <form onSubmit={handleSubmitNewTodo}>
            <h3 className="font-bold text-lg">Edit Task</h3>
            <div className="modal-action flex gap-2">
              <input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                type="text"
                placeholder="Edit task"
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          </form>
        </Modal>
        <MdOutlineDelete
          cursor="pointer"
          size={20}
          className="text-red-500"
          onClick={() => setOpenModalDelete(true)}
        />
        <Modal isOpen={openModalDelete} onClose={() => setOpenModalDelete(false)}>
          <h1 className="text-lg">Are you sure, you want to delete this task?</h1>
          <div className="modal-action flex gap-3">
            <button className="btn btn-outline" onClick={() => setOpenModalDelete(false)}>
              Cancel
            </button>
            <button className="btn btn-error" onClick={() => handleDeleteTask(task.id)}>
              Delete
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
