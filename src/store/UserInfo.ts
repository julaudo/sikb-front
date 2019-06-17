import {Club} from '@/generated';

export interface UserInfo {
    login: string;
    token: string;
    clubs: Club[];
    functionalities: string[];
}
