import {Club} from '@/generated';
import {Features} from '@/model/model';

export interface UserInfo {
    login: string;
    token: string;
    profile: string;
    clubs: Club[];
    features: Features[];
}
