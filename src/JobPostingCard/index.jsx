/* eslint-disable react/prop-types */

import "./styles.css";

const JobPostingCard = (props) => {
  const { title, by, time } = props;

  return (
    <div className="card_container">
      <div className="card_title">{title}</div>
      <div className="card_by">{`By ${by} • ${new Date(time).toLocaleTimeString()}`}</div>
    </div>
  );
};

export default JobPostingCard;
