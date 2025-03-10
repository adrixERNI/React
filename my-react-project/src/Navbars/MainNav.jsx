import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
function MainNav(){
    return(
      <nav className="bg-pink-400 p-9 rounded-lg shadow">
            <div className="container mx-auto flex justify-between items-center">
              <div className="text-white text-2xl font-bold">
                <a href="\">Quiz App</a>
              </div>
              <div className="space-x-6">
                <a
                  href="\play"
                  className="text-gray-300 hover:text-white text-2xl font-sans font-bold"
                >
                  Play
                </a>
    
                <a
                  href="\quizCreate"
                  className="text-gray-300 hover:text-white text-2xl font-sans"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </a>
              </div>
            </div>
          </nav>
          );
}

export default MainNav