import Gist from 'gists';
import request from 'request';


export let create = (fileName, fileContents, cb) => {
    const gist = new Gist();
    let opts = {
        "description": "",
        "public": true,
        "files": {}
    };
    opts.files[fileName] = {content: fileContents};
    gist.create(opts, cb);
};

export let get = (id, cb, err) => {
    request(`https://gist.githubusercontent.com/anonymous/${id}/raw`, (error, response, body) =>
        response.statusCode === 200 ? cb(body) : err(error));
};