import React from 'react';
import './TopBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faFolder } from '@fortawesome/free-regular-svg-icons'

function TopBar(props){
    const {undo, redo, canUndo, canRedo, displayPath} = props;
    return(
        <div className='top-bar'>
            <button onClick={() => undo()} disabled={!canUndo} className='btn top-bar-btn'>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button onClick={() => redo()} disabled={!canRedo} className='btn top-bar-btn'>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <div className='top-bar-item'>
              PATH:
            </div>
            <div className='top-bar-item' style={{background: '#efefef'}}>
              <FontAwesomeIcon icon={faFolder} />
              {displayPath()}
            </div>
          </div>
    );
}

export default TopBar;