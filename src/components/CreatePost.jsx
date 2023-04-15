import React from 'react';
import MakePost from './MakePost';

const CreatePost = ({ token }) => {
  return (
    <div className="create-post">
      <MakePost token={token} />
    </div>
  );
};

export default CreatePost;