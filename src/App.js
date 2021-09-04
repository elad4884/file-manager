import './App.css';
import { Component } from 'react';
import FolderComponent from './FolderComponent';
import FileForm from './FileForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as fileTypes from './FileTypes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import TopBar from './TopBar';

class App extends Component {
  state = {
    current_path: ['/'],
    undo_stack: [],
    redo_stack: [],
    root: {
      name: '/',
      type: fileTypes.DIRECTORY,
      files: [
        {
          name: 'file 1',
          type: fileTypes.FILE,
          selected: false
        },
        {
          name: 'file 2',
          type: fileTypes.FILE,
          selected: false
        },
        {
          name: 'file 3',
          type: fileTypes.FILE,
          selected: false
        },
        {
          name: 'Documents',
          type:  fileTypes.DIRECTORY,
          files: [],
          selected: false
        },
        {
          name: 'Downloads',
          type: fileTypes.DIRECTORY,
          files: [
            {
              name: 'New folder',
              type: fileTypes.DIRECTORY,
              files: [
                {
                  name: 'New text',
                  type: fileTypes.FILE,
                  selected: false
                }
              ],
              selected: false
            }
          ],
          selected: false
        },
        {
          name: 'Temp',
          type: fileTypes.DIRECTORY,
          files: [],
          selected: false
        }
      ],
      selected: true
    }
  }

  undo = () => {
    if(this.state.undo_stack.length > 0){
      this.setState(prevState => ({...this.state.undo_stack.pop(), redo_stack: [...this.state.redo_stack, prevState]}));
    }
  }

  redo = () => {
    if(this.state.redo_stack.length > 0){
      this.setState(prevState => ({...this.state.redo_stack.pop(), undo_stack: [...this.state.undo_stack, prevState]}));
    }
  }

  cloneRoot(root){
    const new_root = {
      name: root.name,
      type: root.type,
      selected: root.selected
    }
    if(root.type === fileTypes.DIRECTORY){
      new_root.files = [];
      root.files.forEach(f => new_root.files.push(this.cloneRoot(f)));
    }
    return new_root;
  }

  changePath = new_path => {
    const new_root = this.cloneRoot(this.state.root);

    const prev_file = this.getFileFromPath(new_root, this.state.current_path);
    prev_file.selected = false;

    const current_file = this.getFileFromPath(new_root, new_path);
    current_file.selected = true;

    this.setState({current_path: new_path, root: new_root});
  }

  getFileFromPath(root, path){
    let current_file = root;
    if (path.length > 1)
      for(let i = 1; i < path.length; i++)
        current_file = current_file.files.find(f => f.name === path[i]);
    return current_file;
  }

  deleteFile = () => {
    const current_path = this.state.current_path;
    if(current_path.length === 1) //delete the root dir will delete all of it's sub dirs
      this.setState({root: {
        name: '/',
        type: fileTypes.DIRECTORY,
        files: []
      }});
    else{
      const new_root = this.cloneRoot(this.state.root);

      const parent_folder = this.getFileFromPath(new_root, current_path.slice(0, current_path.length - 1));
      parent_folder.files = parent_folder.files.filter(f => f.name !== current_path[current_path.length - 1]);
      parent_folder.selected = true;

      this.setState(prevState => ({root: new_root, current_path: current_path.slice(0,current_path.length-1), undo_stack: [...prevState.undo_stack, prevState], redo_stack: []}));
    }
  }

  createFile = (file_name, file_type) => {
    const new_file = {
      name: file_name,
      type: file_type
    }
    if(file_type === fileTypes.DIRECTORY)
      new_file.files = [];

    const new_root = this.cloneRoot(this.state.root);
    const current_path = this.state.current_path;

    //determine where to put the new file
    let dest_folder;
    const current_file = this.getFileFromPath(new_root, current_path);
    if(current_file.type === fileTypes.DIRECTORY)
      dest_folder = current_file;
    else
      dest_folder = this.getFileFromPath(new_root, current_path.slice(0, current_path.length - 1));

    //verify that there's not a file with the same name in the chosen directory
    if(dest_folder.files.find(f => f.name === file_name) !== undefined)
      alert("A file with the same name already exists in this directory.");
    else
      dest_folder.files.push(new_file);

    this.setState(prevState => ({root: new_root, undo_stack: [...this.state.undo_stack, prevState], redo_stack: []}));
  }

  displayPath = () => {
    if(this.state.current_path.length === 1){
      return '/';
    } 
    let result = "";
    this.state.current_path.slice(1).forEach(f => {
      result = result + "/" + f;
    });
    return result;
  }

  render(){
    return (
        <div className="file-manager-container">
          <h1><FontAwesomeIcon icon={faFile} /> File Manager</h1>

          <TopBar undo={this.undo} redo={this.redo} canUndo={this.state.undo_stack.length > 0} canRedo={this.state.redo_stack.length > 0} displayPath={this.displayPath} />

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
            <div className='files-tree'>
              <FolderComponent file={this.state.root} changePath={this.changePath} />
            </div>
            <FileForm deleteFile={this.deleteFile} createFile={this.createFile}/>
          </div>
          
        </div>
      );
  }
}

export default App;
