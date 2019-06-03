let httpServer: any = null;
let requests = 0;
let interceptors = false;


export const startjsonserver = (init: (server: any) => void, done: any) => {
    const fs = require('fs');
    fs.copyFile('dbbackup.json', 'db.json', () => {
        const jsonServer = require('json-server');
        const server = jsonServer.create();
        const router = jsonServer.router('db.json');
        const middlewares = jsonServer.defaults();

        server.use(middlewares);
        init(server);
        server.use(router);
        httpServer = server.listen(3000, () => {
            console.log('JSON Server is running');  /* tslint:disable-line:no-console */
            done();
        });
    });
};


export const stopjsonserver = (done: any) => {
    httpServer.close(() => {
        console.log('JSON Server is stopped');  /* tslint:disable-line:no-console */
        done();
    });
};

export const initAxiosInterceptors = (axiosInstance: any) => {
    if (!interceptors) {
        interceptors = true;

        axiosInstance.interceptors.request.use((req: any) => {
            requests++;
            return req;
        });

        axiosInstance.interceptors.response.use((response: any) => {
            requests--;
            return response;
        }, (error: any) => {
            requests--;
            return Promise.reject(error);
        });
    }

};

const flushAxiosPromises = (resolve: any, reject: any) => {
    if (requests) {
        setTimeout(() => {
            flushAxiosPromises(resolve, reject);
        }, 100);
    } else {
        resolve();
    }
};

function flushOtherPromises() {
    return new Promise((resolve) => {
        setImmediate(resolve);
    });
}

export const flushPromises = async () => {
    await flushOtherPromises();
    const promise = new Promise((resolve, reject) => {
        flushAxiosPromises(resolve, reject);
    });

    await promise;
};
