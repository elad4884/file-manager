import React, { Component } from 'react';
import * as fileTypes from './FileTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt ,faPlusSquare } from '@fortawesome/free-regular-svg-icons'

class FileForm extends Component {
    state = { 
        file_name: "",
        file_type: fileTypes.FILE
    }

    changeFileName = (event) => {
        this.setState({file_name: event.target.value});
    }

    changeFileType = (event) => {
        this.setState({file_type: event.target.value});
    }

    render() {
        const { file_name, file_type } = this.state;
        const buttonStyle = {
            margin: '10px',
            padding: '10px 20px'
        }
        return (
            <div style={{padding: '20px 30px'}}>
                <div className="form-group">
                    <label>Name:</label>
                    <input className="form-control" type="text" onChange={this.changeFileName} required />
                </div>

                <div className="form-check" style={{padding: '30px'}}>

                    <input className="form-check-input" type="radio" value={fileTypes.FILE} onChange={this.changeFileType} checked={file_type===fileTypes.FILE}/>
                    <label className="form-check-label">File</label><br />

                    <input className="form-check-input" type="radio" value={fileTypes.DIRECTORY} onChange={this.changeFileType} checked={file_type===fileTypes.DIRECTORY} />
                    <label className="form-check-label">Directory</label><br />

                </div>

                <div className="form-group" style={{padding: '5px 10px'}}>
                    <button className='btn btn-primary btn-lg' style={buttonStyle} onClick={() => this.props.createFile(file_name, file_type)}>
                        <FontAwesomeIcon icon={faPlusSquare} />
                        &nbsp; Create
                    </button>   
                    <button className='btn btn-danger btn-lg' style={buttonStyle}  onClick={() => this.props.deleteFile()}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                        &nbsp; Delete
                    </button>
                </div>
            </div>
        );
    }
}
 
export default FileForm;