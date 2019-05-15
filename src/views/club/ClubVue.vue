<template>

    <div class="kb-datatable" style="width:100%;">
        <v-card>
            <v-card-title>
                <span class="headline">{{clubBackup.name + (modified ? ' *' : '')}}</span>

            </v-card-title>
            <v-form
                    ref="form"
                    v-model="valid"
            >
                <v-card-text>
                    <v-layout row wrap align-baseline="true">
                        <v-flex xs12>
                            <v-text-field
                                    v-model="club.name"
                                    :label="$t('clubs.field.name')"
                                    :rules="[required()]">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    v-model="club.shortName"
                                    :label="$t('clubs.field.shortName')"
                                    :rules="[required()]"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>

                            <uploader style="float: right"
                                           accept = 'image/*'
                                           @input="onFileChange"></uploader>

                            <div style="overflow: hidden; padding-right: 0.5em;">
                                <v-text-field
                                        v-model="club.logo.location"
                                        :label="$t('clubs.field.logo.location')"
                                        readonly
                                        disabled
                                ></v-text-field>
                            </div>​



                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn
                            :disabled="!modified || saving"
                            flat color="blue darken-1"
                            @click="reset"
                    >
                        {{$t("cancel")}}
                    </v-btn>

                    <v-btn
                            :loading="saving"
                            :disabled="!valid || !modified || saving"
                            flat color="blue darken-1"
                            @click="validate"
                    >
                        {{$t("validate")}}
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </div>
</template>

<script lang="ts">
import {Club, ClubsApi} from '@/generated';
import {Getter} from 'vuex-class';
import {Component, Mixins} from 'vue-property-decorator';
import {baseOptions} from '@/utils/options';
import Utils from '@/utils/utils';
import Validators from '@/utils/validators';
import {AxiosPromise} from 'axios';
import Uploader from '@/views/common/Uploader.vue';

@Component({
    components: {Uploader},
})
export default class ClubVue extends Mixins(Utils, Validators) {
    @Getter public clubs!: Club[];
    @Getter public userToken!: string;
    private club: Club | null = null;
    private clubBackup!: Club;
    private valid = false;
    private file!: File;
    private saving = false;

    public created() {
        const vm = this;
        this.clubs.forEach((c) => {
            if (c.id === +this.$route.params.clubId) {
                this.clubBackup = c;
                vm.club = this.copy(c);
            }
        });
    }

    public reset() {
        this.copy(this.clubBackup, this.club);
    }

    public validate() {
        if (this.club !== null && this.club !== undefined) {
            this.saving = true;
            const promises: AxiosPromise[] = [];
            const api = new ClubsApi(baseOptions);

            if (!this.equals(this.club.logo, this.clubBackup.logo)) {
                const logoPromise = api.uploadLogo(this.userToken, 12, this.file);
                promises.push(logoPromise);
                logoPromise.then((r) => this.club!.logo = {
                    location: r.data.location,
                });
            }

            if (!this.equals(this.omit(this.club, 'logo'), this.omit(this.clubBackup, 'logo'))) {
                promises.push(api.updateClub(this.userToken, this.clubBackup!.id, this.club));
            }

            Promise.all(promises).then(() => {

                this.$store.dispatch('UpdateClub', this.club).then(() => {
                    this.copy(this.club, this.clubBackup);
                    this.saving = false;
                });
            });
        }
    }

    public get modified() {
        return !this.equals(this.club, this.clubBackup);
    }

    public onFileChange(file: File) {
        this.file = file;
        this.club!.logo = {
            location: file.name,
        };
    }
}
</script>
