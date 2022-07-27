const Header = (props) => {
  return (
    <div>
      <h1>{props.courseName}</h1>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <p>
        {props.parts.part1} {props.exercises.exercises1}
      </p>
      <p>
        {props.parts.part2} {props.exercises.exercises2}
      </p>
      <p>
        {props.parts.part3} {props.exercises.exercises3}
      </p>
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>
        Total number of exercises{' '}
        {props.exercises.exercises1 +
          props.exercises.exercises2 +
          props.exercises.exercises3}
      </p>
    </div>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header courseName={course} />
      <Content
        parts={{ part1, part2, part3 }}
        exercises={{ exercises1, exercises2, exercises3 }}
      />
      <Total exercises={{ exercises1, exercises2, exercises3 }} />
    </div>
  );
};

export default App;
