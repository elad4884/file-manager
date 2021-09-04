import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt } from '@fortawesome/free-regular-svg-icons'

class FileComponent extends Component {

    changePath = add_to_path => {
        const add_file = [this.props.file.name];
        if(add_to_path === [])
            this.props.changePath(add_file);
        else
            this.props.changePath(add_file.concat(add_to_path));
    }

    render() { 
        const file = this.props.file;
        const buttonStyle = {
            fontWeight: this.props.file.selected ? 'bold' : 'normal'
        }
        return ( 
            <li>
                <FontAwesomeIcon icon={faFileAlt} />
                <button className="btn btn-link" style={buttonStyle} onClick={() => this.changePath([])}>
                    {file.name}
                </button>
            </li>
        );
    }
    
}
 
export default FileComponent;