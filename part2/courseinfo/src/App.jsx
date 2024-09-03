const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content content={course.parts} />
    </>
  )
}

const Header = ({ name }) => {
  return <h1>{name}</h1>
}

const Content = ({ content }) => {
  const total = content.reduce((accumulator, currentValue) => {
    return accumulator += currentValue.exercises
  }, 0)

  return (
    <>
      {content.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      <strong>total of {total} exercises</strong>
    </>
  )
}

const Part = ({ name, exercises }) => {
  return <p>{name} {exercises}</p>
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App