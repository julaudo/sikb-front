import {Functionality} from '@/generated';
let httpServer: any = null;
let requests = 0;
let interceptors = false;

// tslint:disable no-console

function initLogin(server: any) {
    server.get('/users/logout', (req: any, res: any) => {
        res.jsonp({});
    });

    server.post('/users/login', (req: any, res: any) => {
        if (req.body.login === 'loginOK') {
            res.jsonp({
                access_token: 'ZWEyMDMyMDItNDFmMS00ZmI1LTllYWYtYjYxNDQ2N2MyMWZlMjAxOS0wNi0wN1QwNjoxNToyNC42MjZa',
                user: {
                    id: 1,
                    email: 'myEmail@kin-ball.fr',
                    profile: {
                        type: {
                            id: 1,
                            name: 'Administrator',
                            functionalities: Object.values(Functionality),
                        },
                        clubIds: [1],
                    },
                },
            });
        } else {
            res.status(500).jsonp({});
        }
    });
}

export const startjsonserver = async () => {
    return new Promise((done) => {
        const fs = require('fs');
        fs.copyFile('dbbackup.json', 'db.json', () => {
            const jsonServer = require('json-server');
            const server = jsonServer.create();
            const router = jsonServer.router('db.json');
            const middlewares = jsonServer.defaults();
            const request = require('request');
            server.use(jsonServer.bodyParser);
            server.use(middlewares);

            server.use((req: any, res: any, next: any) => {
                console.log(req.method + ' ' + req.url + ' => ' + res.statusCode);
                next();
                console.log(req.method + ' ' + req.url + ' => ' + res.statusCode);
            });

            server.use('/clubs/:clubId/seasons/:seasonId/affiliations', (req: any, res: any) => {
                if (req.method === 'POST') {
                    res.redirect(307, '/affiliations?clubId=' + req.params.clubId + '&seasonId=' + req.params.seasonId);
                } else {
                    res.redirect(307, '/affiliations/' + req.params.clubId + req.params.seasonId);
                }
            });

            server.use('/affiliations', (req: any, res: any, next: any) => {
                if (req.method === 'POST') {
                    // Create affiliation : need to create an affiliationsWithSeason too
                    request.post({
                        url: 'http://localhost:3000/affiliationsWithSeason',
                        form: {
                            clubId: req.query.clubId,
                            seasonId: req.query.seasonId,
                            affiliationId: req.query.clubId + '' + req.query.seasonId,
                            id: req.query.clubId + '_' + req.query.seasonId,
                        },
                    }, () => {
                        // Set affiliation id
                        req.body.id = req.query.clubId + '' + req.query.seasonId;
                        next();
                    });
                } else {
                    next();
                }
            });

            server.use('/clubs/:clubId/logo', (req: any, res: any) => {
                res.redirect(307, '/logos/' + req.params.clubId);
            });

            server.use('/logos/:logoId', (req: any, res: any, next: any) => {
                if (req.method === 'POST') {
                    req.method = 'PUT';
                }
                next();
            });

            server.use('/clubs/:clubId', (req: any, res: any, next: any) => {
                req.query._expand = 'logo';
                next();
            });

            server.use('/clubs/:clubId/affiliations', (req: any, res: any) => {
                res.redirect(307, '/affiliationsWithSeason?_expand=season&_expand=affiliation&clubId=' + req.params.clubId);
            });

            initLogin(server);
            server.use(router);

            httpServer = server.listen(3000, () => {
                console.log('JSON Server is running');  /* tslint:disable-line:no-console */
                done();
            });
        });
    });

};


export const stopjsonserver = async () => {
    return new Promise((resolve) => {
        httpServer.close(() => {
            console.log('JSON Server is stopped');  /* tslint:disable-line:no-console */
            resolve();
        });
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
            console.log(error);  /* tslint:disable-line:no-console */
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



export const setInputText = (wrapper: any, selector: string, value: string) => {
    wrapper.find(selector).element.value = value;
    wrapper.find(selector).trigger('input');
};

export const expectInput = (wrapper: any, selector: string, value: string) => {
    expect(wrapper.find(selector).element.value).toEqual(value);
};
