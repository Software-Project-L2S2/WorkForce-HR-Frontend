
import React from "react";
import { Container } from "react-bootstrap";
import JobList from "./hr/recruitement/joblists";
import PostJob from "./hr/recruitement/postjobs";
import ApplicantDetails from "./hr/recruitement/applicantdetails";
import AIRecommendation from "./hr/recruitement/AIRecommendation";

function App() {
  return (
    <Container fluid>
      <h2 className="mt-3">Job Portal Dashboard</h2>
      <JobList />
      <div className="d-flex flex-wrap mt-3">
        <PostJob />
        <ApplicantDetails />
        <AIRecommendation />
      </div>
    </Container>
  );
}

export default App;
