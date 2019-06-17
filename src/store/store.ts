import Vue from 'vue';
import Vuex from 'vuex';
import {
  Club,
  ClubsApi,
  ConfigurationsApi,
  Credentials,
  IdentificationsApi,
  Season,
  Session,
} from '../generated';
import {AxiosPromise, AxiosResponse} from 'axios';
import {UserInfo} from '@/store/UserInfo';
import createPersistedState from 'vuex-persistedstate';
import {baseOptions} from '@/utils/options';

Vue.use(Vuex);

interface State {
  userInfo: UserInfo | null;
  seasons: Season[];
  currentSeason: Season | null;
}


const getters = {
  userToken: (s: State) => s.userInfo!.token,
  clubs: (s: State) => s.userInfo!.clubs || [],
  features: (s: State) => s.userInfo!.functionalities || [],
  seasons: (s: State) => new Map( // Look Ma!  No type annotations
      s.seasons.map((season) => [season.id, season] as [string, Season])),
  currentSeason: (s: State) => s!.currentSeason,
};

const store = new Vuex.Store({
  state: {
    userInfo: null,
    seasons: [],
    currentSeason: null,
  },
  getters,
  mutations: {
    SET_LOGIN_INFO: (s: State, userInfo: UserInfo) => {
      s.userInfo = userInfo;
    },
    SET_SEASON_INFO: (s: State, seasons: Season[]) => {
      s.seasons = seasons;
      s.currentSeason = seasons.sort((s1, s2) => s2.id.localeCompare(s1.id))[0];
    },
    UPDATE_CLUB: (s: State, data: {index: number, club: Club}) => {
      s.userInfo!.clubs[data.index] = data.club;
    },
  },
  actions: {
    UpdateClub({commit}, club: Club) {
      return new Promise((resolve, reject) => {
        const index = store.state.userInfo!.clubs.findIndex((c) => c.id === club.id);
        if (index === -1) {
          reject();
        } else {
          commit('UPDATE_CLUB', {index, club});
          resolve();
        }

      });
    },
    Login({ commit }, credentials: Credentials) {
      return new Promise((resolve, reject) => {
        new IdentificationsApi(baseOptions).userLogin(credentials, {
        }).then((response: AxiosResponse<Session>) => {


          const userInfo: UserInfo = {
            token: response.data.access_token,
            login: credentials.login,
            clubs: [],
            functionalities: []};

          const promises: AxiosPromise[] = [];

          const clubsIds = response.data.user.profile.clubIds;
          userInfo.functionalities = response.data.user.profile.type.functionalities;

          clubsIds.forEach((id) => {
            const promise = new ClubsApi(baseOptions).getClubById(response.data.access_token, id);
            promises.push(promise);
            promise.then((clubs: AxiosResponse<Club>) => {
              userInfo.clubs.push(clubs.data);
            });
          });

          const seasonsPromise = new ConfigurationsApi(baseOptions).findSeasons(response.data.access_token);
          promises.push(seasonsPromise);
          const seasons: Season[] = [];
          seasonsPromise.then((r) => {
            r.data.forEach((s) => seasons.push(s));
          });

          Promise.all(promises).then(() => {
            commit('SET_LOGIN_INFO', userInfo);
            commit('SET_SEASON_INFO', seasons);
            resolve();
          });
        }).catch((error: any) => {
          reject(error);
        });
      });
    },
    Logout({ commit }) {
      const userInfo = store.state.userInfo;
      if (userInfo !== null) {
        return new Promise((resolve, reject) => {
          new IdentificationsApi(baseOptions).userLogout(userInfo.token, {}).then(() => {
            commit('SET_LOGIN_INFO', {
            });
            resolve();
          }).catch((error: any) => {
            reject(error);
          });
        });
      }
    },
  },
  plugins: [createPersistedState()],
});

export default store;
