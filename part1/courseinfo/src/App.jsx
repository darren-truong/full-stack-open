const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Content = ({ part1, part2, part3 }) => {
  return (
    <>
      <Part part={part1.name} exerciseCount={part1.exercises} />
      <Part part={part2.name} exerciseCount={part2.exercises} />
      <Part part={part3.name} exerciseCount={part3.exercises} />
    </>
  )
}

const Part = ({ part, exerciseCount }) => {
  return <p>{part} {exerciseCount}</p>
}

const Total = ({ total }) => {
  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = 'Fundamentals of React'
//   const exercises1 = 10
//   const part2 = 'Using props to pass data'
//   const exercises2 = 7
//   const part3 = 'State of a component'
//   const exercises3 = 14

//   return (
//     <div>
//       <Header course={course}/>
//       <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3} />
//       <Total total={exercises1 + exercises2 + exercises3} />
//     </div>
//   )
// }

export default App