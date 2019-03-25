<template style="height:100%">

    <v-form v-model="valid" style="height:100%">
        <v-card style="display: flex; flex-direction: column; height: 100%;">
            <v-container grid-list-md style="flex-shrink: 1;overflow-y: scroll;">
                <v-layout row wrap>

                    <v-flex xs12 sm6 md6>
                        <v-text-field
                                v-model="entity.prefectureCity"
                                :label="$t('affiliation.prefectureCity')"
                                :rules="[required()]"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                        <v-text-field
                                v-model="entity.prefectureNumber"
                                :label="$t('affiliation.prefectureNumber')"
                                :rules="[required()]"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                        <v-text-field
                                v-model="entity.siretNumber"
                                :label="$t('affiliation.siretNumber')"
                                :rules="[required()]"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm12 md12>
                        <v-text-field
                                v-model="entity.address"
                                :label="$t('affiliation.address')"
                                :rules="[required()]"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm3 md3>
                        <v-text-field
                                v-model="entity.postalCode"
                                :label="$t('affiliation.postalCode')"
                                :rules="[required()]"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm9 md9>
                        <v-text-field
                                v-model="entity.city"
                                :label="$t('affiliation.city')"
                                :rules="[required()]"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                        <v-text-field
                                v-model="entity.phoneNumber"
                                mask="##########"
                                :label="$t('affiliation.phoneNumber')"
                                :rules="[phoneNumber()]"
                                prepend-icon="smartphone"
                                style="max-width: 20em"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                        <v-text-field
                                v-model="entity.email"
                                :label="$t('affiliation.email')"
                                :rules="[required(), mail()]"
                                prepend-icon="email"
                                style="max-width: 20em"
                        ></v-text-field>
                    </v-flex>

                    <v-card>
                        <v-card-title class="headline">Board</v-card-title>
                        <v-card-text>
                            <v-flex xs12 sm12 md12>
                                <BoardVue v-model="entity.board" />
                            </v-flex>
                        </v-card-text>
                    </v-card>
                </v-layout>
            </v-container>
            <v-card-actions  style="flex-shrink: 0;">
                <v-spacer></v-spacer>

                <v-btn
                        :disabled="cancelDisabled() && !isCreation()"
                        flat color="blue darken-1"
                        @click="cancel"
                >
                    {{$t("cancel")}}
                </v-btn>

                <v-btn
                        :loading="saving"
                        :disabled="validateDisabled()"
                        flat color="blue darken-1"
                        @click="validate"
                >
                    {{$t("validate")}}
                </v-btn>

                <v-btn
                        :disabled="isCreation()"
                        :loading="saving"
                        flat color="blue darken-1"
                        @click="deleteAffiliation()"
                >
                    {{$t("delete")}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator';
import Utils from '@/utils/utils';
import Validators from '@/utils/validators';
import BoardVue from '@/views/club/BoardVue.vue';
import EntityForm from '@/views/generic/EntityForm';
import {mixins} from 'vue-class-component';
import {Affiliation, AffiliationsApi} from '@/generated';
import {baseOptions} from '@/main';
@Component({
    components: {BoardVue},
})
export default class AffiliationVue extends Mixins(Utils, Validators, mixins<EntityForm<Affiliation>>(EntityForm)) {
    @Prop() public clubId!: number;
    @Prop() public seasonId!: string;

    protected isCreation() {
        return !this.entity.id ;
    }

    protected cancel() {
        if (this.isCreation()) {
            this.$emit('cancel', this.seasonId);
        } else {
            this.reset();
        }
    }

    protected deleteAffiliation() {
        new AffiliationsApi(baseOptions).deleteAffiliation(this.userToken, this.clubId, this.seasonId).then(
            () => {
                this.$emit('deleteAffiliation', this.seasonId);
            },
        );
    }

    private validate() {
        new AffiliationsApi(baseOptions).createAffiliation(this.userToken, this.clubId, this.seasonId, this.entity);
    }
}
</script>
