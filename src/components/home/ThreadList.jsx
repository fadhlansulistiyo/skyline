import React from "react";
import ThreadItem from "./ThreadItem";

const ThreadList = ({ threads }) => {
  return (
    <div className="thread-list">
      {threads.length > 0 ? (
        threads.map((thread) => <ThreadItem key={thread.id} {...thread} />)
      ) : (
        <p className="thread-list__empty">No threads available.</p>
      )}
    </div>
  );
};

export default ThreadList;
