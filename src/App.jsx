import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import JobPostingCard from "./JobPostingCard";

const App = () => {
  const [jobIDs, setJobIDs] = useState([]);

  useEffect(() => {
    axios
      .get("https://hacker-news.firebaseio.com/v0/jobstories.json")
      .then((res) => {
        setJobIDs(res?.data);
      });
  }, []);

  return (
    <div className="container">
      <div className="header">Hacker News Jobs Board</div>
      {jobIDs?.map((jobID) => <JobPostingCard key={jobID.toString()} jobID={jobID}/>)}
    </div>
  );
};

export default App;
