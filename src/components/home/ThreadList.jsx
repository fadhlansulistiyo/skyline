import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

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

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      ownerId: PropTypes.string.isRequired,
      upVotesBy: PropTypes.array.isRequired,
      downVotesBy: PropTypes.array.isRequired,
      totalComments: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ThreadList;
