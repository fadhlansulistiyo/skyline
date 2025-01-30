import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import { asyncAddThread } from "../states/threads/action";
import ThreadInput from "../components/home/ThreadInput";
import ThreadList from "../components/home/ThreadList";

function HomePage() {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads || []);
  const users = useSelector((state) => state.users || []);
  const authUser = useSelector((state) => state.authUser || null);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const handleAddThread = (thread) => {
    dispatch(asyncAddThread(thread));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId) || {
      name: "Unknown",
      avatar: "/user.png",
    },
    authUser: authUser ? authUser.id : null,
  }));

  return (
    <div className="homepage">
      <h1 className="homepage-title">Discussion Forum</h1>
      <ThreadInput addThread={handleAddThread} />
      <ThreadList threads={threadList} />
    </div>
  );
}

export default HomePage;
