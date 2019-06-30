<template>
    <div style="width:100%;">
        <v-card style="height:100%;display: flex; flex-direction: column">
            <v-card-title>
                <span class="headline">{{$t('affiliationsToValidate.title')}} ({{affiliations.length}})</span>

            </v-card-title>

            <v-card-text style="flex:1">
                <split-pane :min-percent='20' :default-percent='30' split="vertical">
                    <template slot="paneL">
                        <v-list two-line style="height: 100%; overflow-y: scroll;">
                            <template v-for="(item, index) in affiliations">
                                <v-subheader
                                        v-if="item.header"
                                        :key="item.header"
                                >
                                    {{ item.club.name }}
                                </v-subheader>

                                <v-list-tile
                                        :key="index"
                                        @click="current = item"
                                        :to="{name: 'affiliationValidation', params: {id: item.affiliation.affiliation.id}}"
                                >
                                    <v-list-tile-avatar>
                                        <img :src="getLogo(item)">
                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="item.club.name"></v-list-tile-title>
                                        <v-list-tile-sub-title v-html="item.affiliation.season.description"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                        </v-list>
                    </template>
                    <template slot="paneR">
                        <router-view v-if="current"
                                        style="height:100%"
                                        :key="current.club.id"
                                        :entity="current.affiliation.affiliation"
                                        :clubId="current.club.id"
                                        :seasonId="current.affiliation.season.id"
                                        @cancel="cancel"></router-view>
                    </template>
                </split-pane>
            </v-card-text>
        </v-card>


    </div>
</template>

<script lang="ts">
import {AffiliationsApi, AffiliationStatus, Club, ClubsApi} from '@/generated';
import {Component, Mixins} from 'vue-property-decorator';
import Utils from '@/utils/utils';
import Validators from '@/utils/validators';
import {ClubAffiliation} from '@/model/model';
import {Route} from 'vue-router';
import {baseOptions} from '@/utils/options';
import store from '@/store/store';

@Component
export default class AffiliationsToValidate extends Mixins(Utils, Validators) {
    private affiliations: ClubAffiliation[] = [];
    private clubs: Club[] = [];

    private getLogo(item: ClubAffiliation) {
        const logo = item.club.logo;
        return logo ? logo.location : null;
    }

    get current() {
        const id = this.$route.params.id;
        if (!id) {
            return null;
        }

        return this.affiliations.filter((a: any) => a.affiliation.affiliation.id === +id)[0];
    }

    set current(value: any) {

    }

    public async beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
        const userToken = store.getters.userToken;
        const clubs = (await new ClubsApi(baseOptions).findClubs(userToken)).data;
        const allAffiliations: ClubAffiliation[] = [];
        await Promise.all(clubs.map(async (club) => {
            const affiliations = (await new AffiliationsApi(baseOptions)
                .findAllClubAffiliations(userToken, club.id)).data;
            affiliations.filter((affiliation) => affiliation.affiliation.status === AffiliationStatus.SUBMITTED)
                .forEach((affiliation) => allAffiliations.push({
                    club,
                    affiliation,
                }));
        }));

        next((vm: AffiliationsToValidate) => {
            vm.affiliations = allAffiliations;
            vm.clubs = clubs;
        });
    }

    private cancel() {

    }
}
</script>
