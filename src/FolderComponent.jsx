import React from 'react';
import FileComponent from './FileComponent';
import * as fileTypes from './FileTypes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFolderOpen } from '@fortawesome/free-regular-svg-icons'

class FolderComponent extends FileComponent {
    state = {
        open: false
    }

    constructor(props){
        super(props);
        if(props.file.name === "/")
            this.state.open = true;
    }

    openFolder = () => {
        this.state.open ? this.setState({open: false}) : this.setState({open: true});
        this.changePath([]);
    }

    render() { 
        const file = this.props.file;
        const buttonStyle = {
            fontWeight: this.props.file.selected ? 'bold' : 'normal'
        }
        const fileListStyle = {
            listStyle: 'none',
            display: `${this.state.open ? 'block' : 'none'}`
        }
        return ( 
            <React.Fragment>
                <FontAwesomeIcon icon={this.state.open ? faFolderOpen : faFolder} />
                <button className="btn btn-link" style={buttonStyle} onClick={this.openFolder}>{file.name}</button><br />
                <ul style={fileListStyle}>
                    {file.files.map(f => f.type === fileTypes.FILE ?
                        <FileComponent key={f.name} file={f} changePath={this.changePath} /> : 
                        <FolderComponent  key={f.name} file={f} changePath={this.changePath} />)}
                </ul>
            </React.Fragment>
        );
    }
}
 
export default FolderComponent;