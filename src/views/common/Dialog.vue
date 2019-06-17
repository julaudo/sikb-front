<template>
    <v-dialog id="refDeleteDialog" v-model="dialog" persistent @keydown.esc="escapeDeleteDialog()">
        <v-card>
            <v-card-title class="headline">{{title}}</v-card-title>


            <v-card-actions>
                <v-spacer></v-spacer>
                <template  v-for="button in buttons">
                    <v-btn :id="button.id"
                           color="blue darken-1"
                           :disabled="anyWorking()"
                           :loading="button.working"
                           flat
                           @click="onClick(button)">
                        {{$t(button.title)}}
                    </v-btn>

                </template>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator';
import Utils from '@/utils/utils';
import Validators from '@/utils/validators';
import {DialogButton} from '@/views/common/DialogButton';

@Component
export default class Dialog extends Mixins(Utils, Validators) {
    @Prop() public value!: boolean;
    @Prop() public title!: string;
    @Prop() public buttons!: DialogButton[];

    private working = false;

    public get dialog() {
        return this.value;
    }

    public set dialog(dialog: boolean) {
        this.$emit('input', dialog);
    }

    private escapeDeleteDialog() {
        if (!this.working) {
            this.dialog = false;
        }
    }

    private onClick(button: DialogButton) {
        button.working = true;
        button.clickPromise().then(() => {
            button.working = false;
            this.dialog = false;
        }).catch(() => {
            button.working = false;
        });
    }

    private anyWorking(): boolean {
        return this.buttons.filter((b) => b.working).length > 0;
    }
}
</script>
