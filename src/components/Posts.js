import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, removePost, toggleView } from '../store/reducers/postReducer';
import Card from './Card';
import Pagination from './Pagination';
import FeedbackForm from './FeedbackForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faBars } from '@fortawesome/free-solid-svg-icons';

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, currentPage, viewToggle, loading } = useSelector((state) => state.posts);

  const [currentPosts, setCurrentPosts] = useState([]);
  const postsPerPage = 6;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
  }, [posts, currentPage]);

  const paginate = (pageNumber) => {
    setCurrentPosts(posts.slice((pageNumber - 1) * postsPerPage, pageNumber * postsPerPage));
  };

  const handleRemovePost = (id) => {
    dispatch(removePost(id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <> 
    <div className="p-4 flex gap-[1rem] bg-gray-100 min-h-screen">
      <div className="flex  w-[40%]  max-w-[40%] shadow-lg flex-col items-center mb-4">
        <div className="flex text-center space-x-2 mb-4">
            <div className='shadow-lg p-5'>
                <h2 className='mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl'>View Toggle</h2>
          <button 
            onClick={() => dispatch(toggleView())} 
            className={`m-2 p-2 rounded-full ${viewToggle ? 'bg-gray-200' : 'bg-gray-400'}`}
          >
              <FontAwesomeIcon icon={faBars} />
           
          </button>
          <button 
            onClick={() => dispatch(toggleView())} 
            className={`p-2 m-2 rounded-full ${!viewToggle ? 'bg-gray-200' : 'bg-gray-400'}`}
          >
            <FontAwesomeIcon icon={faTh} />
          </button>
          </div>
        
        </div>

        <div className='shadow-lg p-5'>
                <h2 className='mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl'>Have A feedback</h2>
        <button 
          onClick={() => document.getElementById('feedback-form').style.display = 'block'} 
          className="bg-green-500 text-white p-2 rounded-full"
        >
          We are Listening
        </button>
        </div>
      </div>
      <div className={viewToggle ? ' w-100 grid grid-cols-3 gap-4' : 'space-y-4'}>
        {currentPosts.map((post) => (
          <Card key={post.id} post={post} removePost={handleRemovePost} />
        ))}
      </div>

      <div id="feedback-form" className="shadow-md p-[14rem] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden">
        <div className="bg-white  p-4 rounded-lg" >
          <FeedbackForm />
          <button 
            onClick={() => document.getElementById('feedback-form').style.display = 'none'} 
            className="bg-red-500 text-white p-2 rounded-full mt-4"
          >
            Close
          </button>
        </div>
      </div>
    </div>
       <Pagination 
    postsPerPage={postsPerPage} 
    totalPosts={posts.length} 
    paginate={paginate} 
    className="mt-4"
  /></>
  );
};

export default Posts;
