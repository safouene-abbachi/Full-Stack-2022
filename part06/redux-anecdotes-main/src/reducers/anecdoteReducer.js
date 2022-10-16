import { createSlice } from '@reduxjs/toolkit';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createNew(state, action) {
      state.push({ content: action.payload, id: getId(), votes: 0 });
    },
    voteAnecdote(state, action) {
      return state.map((anecdote) => {
        if (action.payload === anecdote.id) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1,
          };
        }
        return anecdote;
      });
    },
  },
});

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'ADD_VOTE':
//       return state.map((anecdote) => {
//         if (action.id === anecdote.id) {
//           return {
//             ...anecdote,
//             votes: anecdote.votes + 1,
//           };
//         }
//         return anecdote;
//       });
//     case 'NEW_ANECDOTE':
//       return [...state, { content: action.data, id: getId(), votes: 0 }];

//     default:
//       return state;
//   }
// };

// export const voteAnecdote = (id) => {
//   return {
//     type: 'ADD_VOTE',
//     id,
//   };
// };
// export const createNew = (data) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     data,
//   };
// };

export const { createNew, voteAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
