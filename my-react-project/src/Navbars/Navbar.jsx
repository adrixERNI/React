import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
      <nav className="bg-pink-400 p-9 rounded-lg shadow">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">
            <a href="\">
              <FontAwesomeIcon icon={faHouse} />
            </a>
          </div>
          <div className="space-x-6">
            <a
              href="\create"
              className="text-gray-300 hover:text-white text-2xl font-sans"
            >
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </a>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;