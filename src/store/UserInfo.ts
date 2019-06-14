import {Club} from '@/generated';

export interface UserInfo {
    login: string;
    token: string;
    profile: string;
    clubs: Club[];
    functionalities: string[];
}
