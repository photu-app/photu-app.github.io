import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import 'bulma/css/bulma.css';
import './Home.css';
import {create} from './gist';
import {chunk} from './utils';

class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {images: new Map()};
        this.updateFile = this.updateFile.bind(this);
        this.readFile = this.readFile.bind(this);
    }

    onDrop(acceptedFiles) {
        const images = this.state.images;
        acceptedFiles.forEach(f => images.set(f.preview,
            new Map([['data', f],
                ['uploadProgress', 0],
                ['updateProgress', this.updateFile('uploadProgress', f)],
                ['updateURL', this.updateFile('url', f)]])));
        this.setState({images: new Map(images)});
        [...this.state.images.values()].filter(f => f.get('uploadProgress') !== 100)
            .map(this.upload.bind(this));
    }

    updateFile(key, file) {
        return (value) => {
            const images = this.state.images;
            const fileMap = images.get(file.preview);
            fileMap.set(key, value);
            images.set(file.preview, fileMap);
            this.setState({images: new Map(images)});
        }
    }

    readFile(f, reader) {
        return () => {
            f.get('updateProgress')(50);
            create(reader.result, (err, resp) => {
                f.get('updateProgress')(100);
                f.get('updateURL')(`/image/${resp['id']}`)
            });
        }
    }

    upload(file) {
        file.get('updateProgress')(10);
        const reader = new FileReader();
        reader.onload = this.readFile(file, reader);
        reader.readAsDataURL(file.get('data'));
    }

    invalidFileType(rejected) {

    }

    renderPlaceHolder() {
        return (
            <div className="container has-text-centered">
                <h1 className="subtitle white">Drop your image here</h1>
                <h1 className="white">(3MB File Size Limit)</h1>
            </div>);
    }

    renderListOfFiles() {
        const images = [...this.state.images.values()];
        const imagePreviews = images.map((f) => {
            const url = f.get('url');
            const {preview, name} = f.get('data');
            const uploadProgress = f.get('uploadProgress');
            return (
                <div className='column'>
                    <div className="media">
                        <figure className="media-left">
                            <p className="image is-128x128">
                                <img className="preview-image" src={preview} alt={name}/>
                            </p>
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <p className="has-text-white">{name}</p>
                                {
                                    url === undefined ?
                                        (<progress className="progress-bar is-white"
                                                   value={uploadProgress}
                                                   max='100'/>) :
                                        (<div className="field has-addons url-bar">
                                            <div className="control">
                                                <input className="input is-success"
                                                       type="text"
                                                       value={`${process.env.PUBLIC_URL}${url}`}>
                                                </input>
                                            </div>
                                            <p className="control">
                                                <CopyToClipboard text={`${process.env.PUBLIC_URL}${url}`}>
                                                    <a className="button" onClick={() => {
                                                    }}>
                                                        Copy URL
                                                    </a>
                                                </CopyToClipboard>
                                            </p>
                                        </div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
        const columns = chunk(imagePreviews, 3).map((ip) => (
            <div className="columns">
                {ip}
            </div>));
        return images.length === 0 ?
            this.renderPlaceHolder() : (
                <div className="container">
                    {columns}
                </div>)
    }

    renderUpload() {
        let dropzoneRef;
        return (
            <div className="hero is-fullheight bg-lighter-purple dropzone-container">
                <div className="hero-head lighter-purple dropzone-header has-text-centered">
                    <div className="title">
                        <a className="white has-text-weight-bold" href="/">Photu Upload</a>
                    </div>
                </div>
                <Dropzone className="hero-body dropzone-element"
                          accept="image/*"
                          ref={(node) => dropzoneRef = node}
                          maxSize={3000000}
                          disableClick={true}
                          onDropAccepted={this.onDrop.bind(this)}
                          onDropRejected={this.invalidFileType.bind(this)}>
                    {this.renderListOfFiles()}
                </Dropzone>
                <button type="button" className="button"
                        onClick={() => dropzoneRef.open()}>
                    <p className="has-text-grey-darker">Browse</p>
                </button>
            </div>
        );
    }

    render() {
        return this.renderUpload();
    }
}

export default Home;
