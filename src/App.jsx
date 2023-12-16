/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useCallback } from "react";
import JobPostingCard from "./JobPostingCard";

import "./App.css";

const API_ENDPOINT = "https://hacker-news.firebaseio.com/v0/";
const ITEM_PER_PAGE = 6;

const App = () => {
  const [allJobItems, setAllJobItems] = useState([]);
  const [jobItems, setJobItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const skip = useRef(0);

  const fetchItems = async () => {
    setLoading(true);
    let response = await fetch(`${API_ENDPOINT}/jobstories.json`);
    response = await response.json();

    const itemsForPage = await Promise.all(
      response?.map((itemId) =>
        fetch(`${API_ENDPOINT}/item/${itemId}.json`).then((res) => res.json())
      )
    );
    setJobItems(itemsForPage?.splice(0, ITEM_PER_PAGE));
    setAllJobItems(itemsForPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOnLoadMore = useCallback(() => {
    skip.current += ITEM_PER_PAGE;
    const moreJobIDs = allJobItems?.splice(skip.current, ITEM_PER_PAGE);
    setJobItems([...jobItems, ...moreJobIDs]);
    setAllJobItems(allJobItems);
  }, [allJobItems, jobItems]);

  return (
    <div className="container">
      <div className="header">Hacker News Jobs Board</div>

      {loading ? (
        <div className="loader">
          <img src={"Images/loading.gif"} height={50} width={50} />
        </div>
      ) : jobItems.length ? (
        jobItems?.map((items) => (
          <JobPostingCard
            key={items?.id}
            title={items?.title}
            by={items?.by}
            time={items?.time}
          />
        ))
      ) : null}
      <div className="load_more_jobs" onClick={handleOnLoadMore}>
        Load more Jobs
      </div>
    </div>
  );
};

export default App;
