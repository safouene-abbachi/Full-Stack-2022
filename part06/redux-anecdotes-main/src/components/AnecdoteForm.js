import React from 'react';
import { useDispatch } from 'react-redux';
import { createNewEntry } from '../reducers/anecdoteReducer';
import {
  setNotifications,
  removeNotification,
  setNotifs,
} from '../reducers/notificationReducer';
const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const createNewAnecdote = async (e) => {
    console.log(e.target);
    e.preventDefault();
    const newAnecdote = e.target.anecdote.value;
    dispatch(createNewEntry({ content: newAnecdote, votes: 0 }));
    dispatch(
      setNotifs(`You just created '${e.target.anecdote.value}'`, 5)

      // setNotifications({
      //   message: `You just created '${e.target.anecdote.value}'`,
      //   delay: setTimeout(() => {
      //     dispatch(removeNotification());
      //   }, 5000),
      // })
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
