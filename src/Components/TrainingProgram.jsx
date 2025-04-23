import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Request.css';

function TrainingProgram() {
  const [selectedCourse, setSelectedCourse] = useState(null); // Updated to store the course object
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // List of available courses
  const courses = [
    { id: 1, name: "Software Development", description: "Learn how to build and maintain software applications.", availability: 10 },
    { id: 2, name: "Digital Marketing", description: "Master the art of online marketing, including SEO, content, and social media.", availability: 5 },
    { id: 3, name: "Data Analysis", description: "Analyze and interpret complex data to make informed business decisions.", availability: 0 },
    { id: 4, name: "Graphic Design", description: "Create visually appealing designs for both print and digital media.", availability: 3 },
    { id: 5, name: "Business Management", description: "Learn how to manage a business and lead teams effectively.", availability: 12 },
    { id: 6, name: "UI/UX Design", description: "Design intuitive and user-friendly interfaces and experiences.", availability: 8 },
    
    ,
  ];

  // Function to handle search input
  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Function to handle enrollment
  const handleEnrollNow = (course) => {
    setSelectedCourse(course); // Set the selected course
    navigate('/enrollment', { state: { course } }); // Navigate to the Enrollment page
  };

  // Filter courses based on the search query
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Workforce Training Program</h2>
      <p className="text-lg mb-4 text-center">Apply for the Available New Job or Enroll in a Training Program</p>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for a course"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold text-center mb-2">{course.name}</h3>
            <p className="text-gray-600 text-center mb-4">{course.description}</p>
            <div className="text-center">
              <p className={`font-bold ${course.availability > 0 ? "text-green-500" : "text-red-500"}`}>
                {course.availability > 0 ? `${course.availability} spots available` : "No spots available"}
              </p>
              <button 
                className={`mt-4 py-2 px-4 rounded-lg ${course.availability > 0 ? "bg-blue-500" : "bg-gray-500"} text-white`}
                disabled={course.availability === 0}
                onClick={() => handleEnrollNow(course)} // Enroll in the selected course
              >
                {course.availability > 0 ? "Enroll Now" : "Unavailable"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainingProgram;
