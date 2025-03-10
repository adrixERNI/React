import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbars/navbar';
function Play() {
  const [quizzes, setQuizzes] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/Quiz');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchQuizzes();
  }, []);

  const handleAnswer = (quizId,answerId) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [quizId] : answerId,
    }))
  };

  const handleSubmit = async () => {
    let score = 0;

    for(const quiz of quizzes){
      const userAnswerId = userAnswers[quiz.quizId];
      const correctAnswer = quiz.answers.find((answer) => answer.is_True);


      if(userAnswerId === correctAnswer?.answerId){
        score++;
      }
    }
    if(score >= (quizzes.length/100)*50 ){
    alert(`Aba lakas neto : You scored ${score} out of ${quizzes.length}`);
    }
    else {
      alert(`Bakit ang hina mo: You scored ${score} out of ${quizzes.length}`);
    }
  }

  return (
    <>
 
      
        <Navbar/>
      <div className="flex items-center justify-center min-h-screen bg-pink-100">
        <div className="flex flex-col space-y-4 w-full max-w-lg">
          <div className="flex justify-center">
            <h1 className="font-sans text-pink-500 text-5xl">Quiz</h1>
          </div>

          <hr className="border-pink-500" />

          {quizzes.length > 0 ? (
  <>
    {quizzes.map((quiz) => (
      <div
        key={quiz.quizId}
        className="mb-6 p-4 border border-pink-500 rounded-lg"
      >
        <p className="text-lg font-semibold">{quiz.question}</p>
        <ul className="mt-2">
          {quiz.answers?.map((answer) => (
            <li key={answer.answerId} className="mt-1">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`quiz-${quiz.quizId}`}
                  value={answer.answerId}
                  checked={userAnswers[quiz.quizId] === answer.answerId}
                  onChange={() => handleAnswer(quiz.quizId, answer.answerId)}
                  className="accent-pink-500"
                />
                <p>{answer.option}</p>
              </label>
            </li>
          ))}
        </ul>
      </div>
    ))}

    <button
      onClick={handleSubmit}
      className="bg-pink-400 font-serif text-white text-3xl font-bold py-5 px-10 rounded-lg shadow-2xl shadow-pink-500/50 hover:bg-pink-800"
    >
      Submit Quiz
    </button>
  </>
) : (
  <p className="text-center text-gray-500">No quizzes available.</p>
)}
      
        </div>
      </div>

    </>
  );
}

export default Play;