const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content content={course.parts} />
    </>
  )
}

const Header = ({ name }) => {
  return <h2>{name}</h2>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
  )
}

export default App