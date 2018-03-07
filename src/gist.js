import Gist from 'gists';
import request from 'request';

export let create = (fileContents, cb) => {
    const gist = new Gist();
    gist.create({
        "description": "",
        "public": true,
        "files": {
            "imageFile": {
                "content": fileContents
            }
        }
    }, cb);
};

export let get = (id, cb, err) => {
    request(`https://gist.githubusercontent.com/anonymous/${id}/raw`, (error, response, body) =>
        response.statusCode === 200 ? cb(body) : err(error));
};