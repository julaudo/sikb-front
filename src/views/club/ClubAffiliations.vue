<template fill-height>

    <div style="height:100%;width:100%;">
        <v-card style="height:100%" >
            <v-card-title ref="title">
                <span class="headline">{{club ? club.name : ''}} - {{$t('route.affiliations')}}</span>
            </v-card-title>
            <div ref="btnAffiliate" height="100%">
                <v-layout layout align-center justify-center column fill-height>
                    <span v-if="affiliations.length === 0" class="subheading">{{$t('affiliation.noAffiliation')}}</span>
                    <span v-if="noAffiliationForCurrentSeason()" class="subheading">{{$t('affiliation.noAffiliationCurrentSeason', [currentSeason.description])}}</span>
                    <v-layout layout align-center justify-center row fill-height>
                        <v-btn v-if="affiliations.length === 0"
                                @click="affiliateForSeasonAndSetRouteFromExisting(currentSeason)"
                                color="primary"
                        >
                            {{$t('affiliation.affiliate', [currentSeason.description])}}
                        </v-btn>
                        <v-menu v-if="affiliations.length > 0 && noAffiliationForCurrentSeason()">
                            <template v-slot:activator="{ on }">
                                <v-btn
                                        color="primary"
                                        v-on="on"
                                >
                                    {{$t('affiliation.affiliate', [currentSeason.description])}}
                                </v-btn>
                            </template>

                            <v-list>
                                <v-list-tile
                                        v-for="(item, i) in reaffiliateItems"
                                        :key="i"
                                        @click="affiliateForSeasonAndSetRouteFromExisting(currentSeason, item)"
                                >
                                    <v-list-tile-title>{{ getReaffiliateDescription(item) }}</v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                        <v-menu v-if="availableSeasons.length > 0">
                            <template v-slot:activator="{ on }">
                                <v-btn
                                        color="primary"
                                        v-on="on"
                                >
                                    {{$t('affiliation.affiliateOneYear')}}
                                </v-btn>
                            </template>

                            <v-list>
                                <v-list-tile
                                        v-for="(item, i) in availableSeasons"
                                        :key="i"
                                        @click="affiliateForSeasonAndSetRouteFromExisting(item)"
                                >
                                    <v-list-tile-title>{{ item.description }}</v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                    </v-layout>
                </v-layout>
            </div>

            <v-tabs
                    ref="tabs"
                    v-if="affiliations.length !== 0"
                    v-model="active"
                    color="white"
                    slider-color="primary">
                <v-tab
                        ref="tab"
                        style="height:100%"
                        v-for="a in sortedAffiliations"
                        :key="'' + a.season.id"
                        :to="'' + a.season.id"
                        ripple>
                    {{ a.season.description }}
                </v-tab>
                <v-tab-item
                        ref="tabItem"
                        v-for="a in sortedAffiliations"
                        :value="'' + a.season.id"
                        :key="'' + a.season.id"
                        transition="false"
                        reverse-transition="false">
                    <v-card flat style="height:100%" >
                        <router-view
                                style="height:100%"
                                :key="clubId"
                                :entity="a.affiliation"
                                :clubId="clubId"
                                :seasonId="seasonId"
                                @cancel="cancelAffiliation"/>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </div>
</template>


<style>
    .v-tabs .v-window {
        height:100%;
    }
    .v-tabs .v-window__container, .v-window-item  {
        height: 100%;
    }
</style>
<script lang="ts">
import {AffiliationsApi, AffiliationStatus, Club, ClubsApi, Season, Sex} from '@/generated';
import {Component, Mixins} from 'vue-property-decorator';
import Utils from '@/utils/utils';
import Validators from '@/utils/validators';
import AffiliationVue from '@/views/club/AffiliationVue.vue';
import {Getter} from 'vuex-class';
import {baseOptions} from '@/utils/options';
import {AxiosResponse} from 'axios';
import store from '@/store/store';
import {Route} from 'vue-router';
import {SeasonWithAffiliation} from '@/generated/api';
import Vue from 'vue';

@Component({
    components: {
        AffiliationVue,
    },
})
export default class ClubAffiliations extends Mixins(Utils, Validators) {
    @Getter public userToken!: string;
    @Getter public currentSeason!: Season;
    @Getter public seasons!: Map<string, Season>;


    private club: Club | null = null;
    private active: any = null;
    private affiliations: SeasonWithAffiliation[] = [];

    public beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
        const clubId = +to.params.clubId;


        new AffiliationsApi(baseOptions).findAllClubAffiliations(store.getters.userToken, clubId)
            .then((response: AxiosResponse<SeasonWithAffiliation[]>) => {
                next((vm: any) => {
                    vm.setAffiliations(response.data, to);
                    new ClubsApi(baseOptions).getClubById(vm.$store.getters.userToken, clubId).then((c) => {
                        vm.club = c.data;
                    });
                });
        });
    }

    public get sortedAffiliations() {
        return this.affiliations.sort((a, b) => b.season.begin.localeCompare(a.season.begin));
    }

    public get availableSeasons(): Season[] {
        const seasons = new Map(this.seasons);

        this.affiliations.forEach((a) => seasons.delete(a.season.id));
        seasons.delete(this.currentSeason.id);

        return Array.from(seasons.values()).sort((a, b) => a.description.localeCompare(b.description));
    }

    public get reaffiliateItems(): Array<SeasonWithAffiliation | null> {
        return [null, ...this.affiliations];
    }

    public getReaffiliateDescription(a: SeasonWithAffiliation | null) {
        if (!a) {
            return this.$t('affiliation.reaffiliateEmpty');
        } else {
            return this.$t('affiliation.reaffiliateFromExisting', [a.season.description]);
        }
    }

    public setAffiliations(affiliations: SeasonWithAffiliation[], to: Route) {
        this.affiliations = [];
        affiliations.forEach((a) => this.affiliations.push(a));

        if (to.params.seasonId && this.affiliations.filter((a) => a.season.id === to.params.seasonId).length === 0) {
            const season = store.getters.seasons.get(to.params.seasonId);
            if (season) {
                this.affiliateForSeasonAndSetRouteFromExisting(season);
            }
        } else if (affiliations.length > 0) {
            if (to.params.seasonId) {
                this.active = to.params.seasonId;
            }
            this.$router.replace({
                name: 'affiliation',
                params: {seasonId: to.params.seasonId || this.affiliations[0].season.id}});
        }
        this.resize();
    }

    public updated() {
        this.resize();
    }

    public async resize() {
        await this.$nextTick();
        await this.$nextTick();
        if (this.$refs.tabs) {
            const tabsElement = this.getComponentRefElement(this.$refs.tabs);
            const tabItemElement = this.getComponentRefElement(this.$refs.tabItem);
            const tabElement = this.getComponentRefElement(this.$refs.tab);
            const btnAffiliate = this.$refs.btnAffiliate as HTMLElement;


            const titleElement = this.$refs.title as HTMLElement;

            let height = titleElement.clientHeight;
            if (btnAffiliate) {
                height += btnAffiliate.clientHeight;
            }
            tabsElement.style.height = this.calcHeight(height);

            tabItemElement.parentElement!.style.height = '100%';
            tabItemElement.parentElement!.parentElement!.style.height
                = this.calcHeight(tabElement.clientHeight);
        }
    }

    public calcHeight(height: number): string {
        return 'calc(100% - ' + height + 'px)';
    }

    public getComponentRefElement(ref: Vue | Element | Vue[] | Element[]): HTMLElement {
        let component;
        if (Array.isArray(ref)) {
            component = (ref as Vue[])[0];
        } else {
            component = ref as Vue;
        }
        return component.$el as HTMLElement;
    }

    public beforeRouteUpdate(to: Route, from: Route, next: () => void) {
        if (+to.params.clubId !== this.clubId) {
            const clubId = +to.params.clubId;

            new AffiliationsApi(baseOptions).findAllClubAffiliations(store.getters.userToken, clubId)
                .then((response: AxiosResponse<SeasonWithAffiliation[]>) => {
                    next();
                    this.setAffiliations(response.data, to);
                });
        } else if (to.params.seasonId) {
            if (this.affiliations.filter((a) => a.season.id === to.params.seasonId).length === 0) {
                const season = store.getters.seasons.get(to.params.seasonId);
                if (season) {
                    this.affiliateForSeasonAndSetRouteFromExisting(season);
                }
            }
            next();
        } else if (this.affiliations.length > 0) {
            this.affiliations = this.affiliations.filter((a) => a.affiliation.hasOwnProperty('id'));
            next();

            this.$router.replace({name: 'affiliation', params: {seasonId: this.firstAffiliation.season.id }});
        } else {
            this.active = null;
            next();
        }

    }

    private affiliateForSeasonAndSetRouteFromExisting(season: Season, affiliationSeason: SeasonWithAffiliation | null = null) {
        const newAffiliation = {
            address: '',
                board: {
                electedDate: '',
                    membersNumber: 0,
                    president: {name: '', sex: Sex.MALE},
                secretary: {name: '', sex: Sex.MALE},
                treasurer: {name: '', sex: Sex.MALE},
            },
            city: '',
                email: '',
                phoneNumber: '',
                postalCode: '',
                prefectureCity: '',
                prefectureNumber: '',
                siretNumber: '',
                webSite: '',
                id: 0,
                status: AffiliationStatus.TOCOMPLETE,
        };
        const affiliation = {
            season,
            affiliation: this.copy(affiliationSeason ? affiliationSeason.affiliation : newAffiliation),
        };
        affiliation.affiliation.id = 0;
        affiliation.affiliation.board.electedDate = '';
        affiliation.affiliation.status = AffiliationStatus.TOCOMPLETE;
        this.active = '' + affiliation.season.id;

        this.affiliations.push(affiliation);
        this.resize();

        this.$router.push({name: 'affiliation', params: {seasonId: season.id }});
    }

    private cancelAffiliation(seasonId: string) {
        this.affiliations = this.affiliations.filter((a) => a.season.id !== seasonId);

        this.$router.replace({
            name: 'affiliations'});
        this.resize();
    }

    private noAffiliationForCurrentSeason(): boolean {
        return this.affiliations.length > 0
            && this.affiliations.filter((a) => a.season.id === this.currentSeason.id).length === 0;
    }

    get clubId(): number {
        return +this.$route.params.clubId;
    }

    get seasonId(): string {
        return this.$route.params.seasonId;
    }

    get firstAffiliation() {
        return this.affiliations.sort((a1, a2) => a2.season.id.localeCompare(a1.season.id))[0];
    }

}
</script>
