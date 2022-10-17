import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotifications,
  removeNotification,
} from '../reducers/notificationReducer';
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filterValue = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const filtredAnecdotes = () => {
    return anecdotes
      .filter((anecdote) =>
        anecdote.content
          .toLocaleLowerCase()
          .includes(filterValue.toLocaleLowerCase())
      )
      .sort((a, b) => (a.votes > b.votes ? -1 : 1));
  };

  const vote = (id, content) => {
    dispatch(voteAnecdote(id));
    dispatch(
      setNotifications({
        message: `you voted '${content}'`,
        delay: setTimeout(() => {
          dispatch(removeNotification());
        }, 5000),
      })
    );
  };
  return (
    <div>
      {filtredAnecdotes().map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
