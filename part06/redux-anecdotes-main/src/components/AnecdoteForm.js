import React from 'react';
import { useDispatch } from 'react-redux';
import { createNew } from '../reducers/anecdoteReducer';
import {
  setNotifications,
  removeNotification,
} from '../reducers/notificationReducer';
import { createAnecdote } from '../services/anecdote';
const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const createNewAnecdote = async (e) => {
    e.preventDefault();
    const newAnecdote = e.target.anecdote.value;

    const result = await createAnecdote({ content: newAnecdote, votes: 0 });
    e.target.anecdote.value = '';

    dispatch(createNew(result));
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
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
