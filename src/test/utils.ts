let httpServer: any = null;
let requests = 0;
let interceptors = false;


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
                            functionalities: [
                                'USER_READ',
                                'USER_CREATE',
                                'USER_UPDATE',
                                'USER_DELETE',
                                'CLUB_READ',
                                'CLUB_CREATE',
                                'CLUB_UPDATE',
                                'CLUB_DELETE',
                                'AFFILIATION_VALIDATE',
                                'PERSON_READ',
                                'PERSON_CREATE',
                                'PERSON_UPDATE',
                                'PERSON_DELETE',
                                'SEASON_READ',
                                'SEASON_CREATE',
                                'SEASON_UPDATE',
                                'SEASON_DELETE',
                            ],
                        },
                        clubIds: [],
                    },
                },
            });
        } else {
            res.status(500).jsonp({});
        }
    });
}

export const startjsonserver = (init: (server: any) => void, done: any) => {
    const fs = require('fs');
    fs.copyFile('dbbackup.json', 'db.json', () => {
        const jsonServer = require('json-server');
        const server = jsonServer.create();
        const router = jsonServer.router('db.json');
        const middlewares = jsonServer.defaults();
        server.use(jsonServer.bodyParser);
        server.use(middlewares);

        server.use('/clubs/:clubId/seasons/:seasonId/affiliations', (req: any, res: any) => {
            res.redirect('/clubs/:clubId/affiliations?season.id=:seasonId');
        });

        initLogin(server);
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
