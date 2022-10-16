import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotifications,
  removeNotification,
} from '../reducers/notificationReducer';
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(voteAnecdote(id));
    dispatch(setNotifications(`you voted '${content}'`));
    dispatch(removeNotification());
  };
  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => (a.votes > b.votes ? -1 : 1))
        .map((anecdote) => (
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
