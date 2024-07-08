import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitFeedback } from '../store/reducers/feedbackReducer'; // Updated import

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      dispatch(submitFeedback({ name, email, message }));
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="p-2 border rounded"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="p-2 border rounded"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        required
        className="p-2 border rounded"
      ></textarea>
      <button type="submit" className="bg-blue-500 text-white w-[5rem] m-[auto] p-2 rounded-full mt-4">
        Submit
      </button>
    </form>
  );
};

export default FeedbackForm;
