import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DeleteCourse from './DeleteCourse';

const CourseDetail = () => {
  const [courseDetails, setCourseDetails] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => setCourseDetails(data))
      .catch((error) => console.log('Error fetching and parsing data', error));
  }, []);

  return (
    <div className='wrap'>
      {/* {console.log(courseDetails)} */}
      <div className='actions--bar'>
        <Link className='button' to={`/courses/${courseDetails.id}/update`}>
          Update Course
        </Link>
        {/* Delete button */}
        <DeleteCourse />
        <Link className='button button-secondary' to='/'>
          Return to List
        </Link>
      </div>

      <div className=' main--flex  '>
        <div>
          <h2>Course Detail</h2>
          <h3 className='course--detail--title'>Course</h3>
          <h3 className='course--name'>{courseDetails.title}</h3>
          <p>By{}</p>
          <p>{courseDetails.description}</p>
        </div>
        <div>
          <h3 className='course--detail--title'>Estimated Time</h3>
          <p>{courseDetails.estimatedTime}</p>

          <h3 className='course--detail--title'>Materials Needed</h3>
          <ul>
            <li className='course--detail--list'>
              {courseDetails.materialsNeeded}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
