import {AffiliationStatus} from "../../generated";
import {AffiliationStatus} from "../../generated";
import {Features} from "../../model/model";
import {AffiliationStatus} from "../../generated";
<template style="height:100%">

    <v-form v-model="valid" style="height:100%">

        <Dialog v-model="deleteDialog"
                :title="$t('crud.confirmDelete')"
                :buttons="deleteButtons">
        </Dialog>

        <v-card style="display: flex; flex-direction: column; height: 100%;">
            <v-container grid-list-md style="flex-shrink: 1;overflow-y: scroll;">

                <v-stepper alt-labels style="box-shadow: none"  v-model="currentStep">
                    <v-stepper-header>
                        <v-stepper-step :complete="currentStep > 1" step="1">{{$t('affiliation.status.TO_COMPLETE')}}</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :complete="currentStep > 2" step="2">{{$t('affiliation.status.SUBMITTED')}}</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :complete="currentStep > 3" step="3">{{$t('affiliation.status.VALIDATED')}}</v-stepper-step>
                    </v-stepper-header>
                </v-stepper>

                <div style="display: flex; flex-direction: row; justify-content: center ">
                    <v-btn id="btnAffiliationValidate" v-if="canValidate()"
                           color="success"
                           :disabled="!valid"
                           :loading="saving"
                           @click="validate"
                    >
                        {{$t("validate")}}
                    </v-btn>

                    <v-btn id="btnAffiliationReject" v-if="canReject()"
                           color="error"
                           :disabled="!valid"
                           :loading="saving"
                           @click="reject"
                    >
                        {{$t("reject")}}
                    </v-btn>

                    <v-btn id="btnAffiliationSubmit" v-if="canSubmit()"
                           color="success"
                           :disabled="!valid"
                           :loading="saving"
                           @click="submit"
                    >
                        {{$t("submit")}}
                    </v-btn>
                </div>

                <v-layout row wrap>

                    <v-flex xs12 sm6 md6>
                        <v-text-field
                                id="prefectureCity"
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

                <v-btn id="btnAffiliationCancel"
                       v-if="isCreation() || isDirty()"
                       flat color="primary"
                       @click="cancel"
                >
                    {{$t("cancel")}}
                </v-btn>

                <v-btn id="btnAffiliationDelete"
                       v-if="canDelete() && !isCreation()"
                       flat color="primary"
                       @click="deleteDialog = true"
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
import {Affiliation, AffiliationsApi, AffiliationStatus, Functionality} from '@/generated';
import {baseOptions} from '@/utils/options';
import {Getter} from 'vuex-class';
import {AxiosResponse} from 'axios';
import {DialogButton} from '@/views/common/DialogButton';
import Dialog from '@/views/common/Dialog.vue';


@Component({
components: {BoardVue, Dialog},
})
export default class AffiliationVue extends Mixins(Utils, Validators, mixins<EntityForm<Affiliation>>(EntityForm)) {
    @Getter public features!: string[];
    @Prop() public clubId!: number;
    @Prop() public seasonId!: string;

    private deleteDialog = false;
    private deleteButtons = [
        new DialogButton('no', 'refDeleteDialogNo', () => Promise.resolve()),
        new DialogButton('yes', 'refDeleteDialogYes', this.onDeleteAffiliation),
    ];

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

    private onDeleteAffiliation(): Promise<AxiosResponse> {
        const promise = new AffiliationsApi(baseOptions).deleteAffiliation(this.userToken, this.clubId, this.seasonId);

        promise.then(() => {
            this.$emit('cancel', this.seasonId);
        });

        return promise;
    }

    private save(status: AffiliationStatus) {
        this.saving = true;

        let promise;
        if (this.entity.id) {
            promise = new AffiliationsApi(baseOptions)
                .updateAffiliation(this.userToken, this.clubId, this.seasonId,
                    {...this.entity, status});
        } else {
            promise = new AffiliationsApi(baseOptions)
                .createAffiliation(this.userToken, this.clubId, this.seasonId, {...this.entity, status : AffiliationStatus.SUBMITTED});
        }

        promise.then((response: AxiosResponse<Affiliation>) => {
            this.copy(response.data, this.entityBackup);
            this.copy(response.data, this.entity);
            this.saving = false;
        }).catch(() => {
            this.saving = false;
        });
    }

    private submit() {
        this.save(AffiliationStatus.SUBMITTED);
    }

    private validate() {
        this.save(AffiliationStatus.VALIDATED);
    }

    private reject() {
        this.save(AffiliationStatus.TOCOMPLETE);
    }

    private canValidate(): boolean {
        return this.entity.status === AffiliationStatus.SUBMITTED
            && this.features.includes(Functionality.AFFILIATIONVALIDATE);
    }

    private canReject(): boolean {
        return this.entity.status === AffiliationStatus.SUBMITTED
            && this.features.includes(Functionality.AFFILIATIONREJECT);
    }

    private canDelete(): boolean {
        if (!this.features.includes(Functionality.AFFILIATIONDELETE)) {
            return false;
        }
        switch (this.entity.status) {
            case AffiliationStatus.TOCOMPLETE:
                return this.features.includes(Functionality.AFFILIATIONCREATE);
            case AffiliationStatus.SUBMITTED:
            case AffiliationStatus.VALIDATED:
                return this.features.includes(Functionality.AFFILIATIONREJECT)
                    || this.features.includes(Functionality.AFFILIATIONVALIDATE);
        }
    }

    private canSubmit(): boolean {
        return this.entity.status === AffiliationStatus.TOCOMPLETE
            && this.features.includes(Functionality.AFFILIATIONCREATE);
    }

    private get currentStep(): number {
        switch (this.entity.status) {
            case AffiliationStatus.TOCOMPLETE:
                return 1;
            case AffiliationStatus.SUBMITTED:
                return 2;
            case AffiliationStatus.VALIDATED:
                return 3;
        }
    }

    private set currentStep(step: number) {
        // Empty setter, step is never set directly
    }
}
</script>
