/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import './styles.css';

const JobPostingCard = ({ jobID }) => {
  const [jobDetails, setJobDetails] = useState({});
  console.log('jobDetails: ', jobDetails);

  useEffect(() => {
    axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${jobID}.json`)
      .then((res) => {
        setJobDetails(res?.data);
      });
  }, [jobID]);

  return (
    <div className="card_container">
      <div className="card_title">{jobDetails?.title}</div>
      <div className="card_by">{`By ${jobDetails?.by} • ${moment(jobDetails?.time).format('LLL')}`}</div>
    </div>
  );
};

export default JobPostingCard;
