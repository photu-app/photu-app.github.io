import React, {Component} from 'react';
import './Home.css';
import Uppy from 'uppy/lib/core';
import DragDrop from 'uppy/lib/react/DragDrop';
import {create} from './gist';
import {Redirect} from 'react-router-dom';

class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.uppy = Uppy({
            id: 'photu',
            restrictions: {maxNumberOfFiles: 1, maxFileSize: 3000000, allowedFileTypes: ['image/*']},
            autoProceed: true,
        });
        this.uppy.on('file-added', this.readFile.bind(this));
        this.state = {uploaded: false, imageId: ""};
    }

    readFile(file) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            create(fileReader.result, (err, resp) => {
                this.uploadComplete(resp["id"]);
            });
        };
        fileReader.readAsDataURL(file.data);
    }

    uploadComplete(id) {
        this.setState({uploaded: true, imageId: id});
    }

    componentWillMount() {
        this.uppy.run();
    }

    renderUpload() {
        return (
            <div className="Home">
                <DragDrop
                    uppy={this.uppy}
                    width='100%'
                    height='100%'
                    locale={{
                        strings: {
                            chooseFile: 'Upload an Image',
                            youCanOnlyUploadX: 'Only 1 file allowed.',
                            youHaveToAtLeastSelectX: "Select a file jackass",
                            exceedsSize: 'This file exceeds maximum allowed size of 3MB',
                            youCanOnlyUploadFileTypes: 'You can only upload images'
                        }
                    }}
                />
            </div>);
    }

    render() {
        return this.state.uploaded ?
            (<Redirect push to={`/image/${this.state.imageId}`}/>) : this.renderUpload.bind(this)();
    }
}

export default Home;
