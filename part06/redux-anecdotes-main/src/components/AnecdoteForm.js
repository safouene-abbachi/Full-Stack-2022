import React from 'react';
import { useDispatch } from 'react-redux';
import { createNew } from '../reducers/anecdoteReducer';
import {
  setNotifications,
  removeNotification,
} from '../reducers/notificationReducer';
const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const createNewAnecdote = (e) => {
    e.preventDefault();
    const newAnecdote = e.target.anecdote.value;
    dispatch(createNew(newAnecdote));
    dispatch(
      setNotifications({
        message: `You just created '${e.target.anecdote.value}'`,
        delay: setTimeout(() => {
          dispatch(removeNotification());
        }, 5000),
      })
    );
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
