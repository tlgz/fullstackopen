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
  
export default Courses