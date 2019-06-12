/* tslint:disable:no-var-requires */
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const { JSDOM } = require('jsdom');
const { File, FileList } = (new JSDOM()).window;


export function addFileList(input: any, filePaths: any) {
    if (typeof filePaths === 'string') {
        filePaths = [filePaths];
    } else if (!Array.isArray(filePaths)) {
        throw new Error('filePaths needs to be a file path string or an Array of file path strings');
    }

    const fileList = filePaths.map((fp: any) => createFile(fp));
    fileList.__proto__ = Object.create(FileList.prototype);

    Object.defineProperty(input, 'files', {
        value: fileList,
        writable: false,
    });

    return input;
}

function createFile(filePath: any) {
    const { mtimeMs: lastModified } = fs.statSync(filePath);

    return new File(
        [new fs.readFileSync(filePath)],
        path.basename(filePath),
        {
            lastModified,
            type: mime.lookup(filePath) || '',
        },
    );
}
