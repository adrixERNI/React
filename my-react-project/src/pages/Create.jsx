import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainNav from '../Navbars/MainNav';

function Create() {
  const [quizzes, setQuizzes] = useState([]);

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

  const handleDeleteQuiz = async (quizId) => {
    try {
      await axios.delete(`http://localhost:5001/api/Quiz/${quizId}`);

      setQuizzes(quizzes.filter((quiz) => quiz.quizId !== quizId));
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };


  const navigate = useNavigate();

  const goToUpdate = (quiz) => {
    navigate(`/quizUpdate/${quiz.quizId}`, {
      state: { quizId: quiz.quizId, question: quiz.question },
    });
  };

  return (
    <>

      <MainNav/>

      <div className="flex items-center justify-center min-h-screen bg-pink-100">
        <div className="flex flex-col space-y-4 w-full max-w-lg">
          <div className="flex justify-center">
            <h1 className="font-sans text-pink-500 text-5xl">Create Quiz</h1>
          </div>

          <hr className="border-pink-500" />

          {quizzes.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-md mt-4">
              <h2 className="text-xl font-bold text-pink-500">
                Created Quizzes:
              </h2>
              {quizzes.map((quiz) => (
                <div
                  key={quiz.quizId}
                  className="mt-2"
                >
                  <div className="container mx-auto flex justify-between items-center">
                    <div className="max-w-[80%] break-words">
                      <p>
                        <strong>Question:</strong> {quiz.question}
                      </p>
                    </div>
                    <div className="space-x-6">
                      <button
                        onClick={() => handleDeleteQuiz(quiz.quizId)}
                        className="bg-pink-400 font-serif text-white text-based font-bold py-1 px-1 rounded-lg shadow-2xl shadow-pink-500/50 hover:bg-pink-800"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                      <button
                        onClick={() => goToUpdate(quiz)} 
                        className="bg-pink-400 font-serif text-white text-based font-bold py-1 px-1 rounded-lg shadow-2xl shadow-pink-500/50 hover:bg-pink-800"
                      >
                        <FontAwesomeIcon icon={faGear} />
                      </button>
                    </div>
                  </div>

                  <ul>
                    {quiz.answers &&
                      quiz.answers.map((answer) => (
                        <li key={answer.answerId}>
                          {answer.option}: {answer.is_True ? '(Correct)' : ''}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Create;