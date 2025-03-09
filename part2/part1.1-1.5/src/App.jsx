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
      <Courses courses={courses}/>
      
    </div>
  )
}

const Course = ({course}) => {
  return (
    <>
    <Header key={course.id} course={course}/>
    <Content course={course}/>
    <Total course={course.parts}/>
    </>
  )
}
const Courses = ({courses}) => {
  return (
    <>
      {courses.map(course=>{
  return( 
    <Course key={course.id} course={course}/>
  ) 
}



      )}
    </>
  )
}



const Header = (props) => {
  return (
  <h1>{props.course.name}</h1>
  )
}
const Content = (props) => {
  return (
    <>
      {props.course.parts.map(course=>{
        return(<Part key={course.id} name={course.name} exercises={course.exercises} />) 
      }

      

      )}
    </>
      
    
  )
}

const Total = ({course}) => {
  return(

    <p>total of {course.reduce((sum,part)=>
      sum+part.exercises,0
    ) }
     </p>
  )
}

const Part = (props) => {
  
  return(
    
    <p>
        {props.name} {props.exercises}
    </p>
  )
}




export default App

