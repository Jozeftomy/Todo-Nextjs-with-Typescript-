'use client';

import React, { FormEventHandler, useState } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import Modal from './Modal';
import { addTodo } from '../../../api';
import { useRouter } from 'next/navigation';
import {v4 as uuidv4} from 'uuid';

const AddTask = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [newTodo, setNewTodo] = useState<string>("");

const HandleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e)=> {
  e.preventDefault();
  await addTodo({
    id: uuidv4(),
    text: newTodo,
  })
  setNewTodo("");
  setIsOpen(false);
  router.refresh();
}

  return (
    <div>
      <button className='btn btn-primary w-full' onClick={() => setIsOpen(true)}>
        Add Task
        <AiOutlinePlus size={15} className='ml-2' />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={HandleSubmitNewTodo}>
        <h3 className="font-bold text-lg">Add Task</h3>
        <div className='modal-action'>
        <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        type="text" 
        placeholder="Type here" 
        className="input input-bordered w-full" />
          <button type="submit" className="btn">
            Add Task
          </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
