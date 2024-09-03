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

export default Course