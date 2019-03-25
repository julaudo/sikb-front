<template>
    <div class="kb-datatable" style="width:100%;">
        <v-toolbar class="kb-datatable-toolbar" flat>
            <v-toolbar-title>{{$t(crudKey + ".listTitle")}}</v-toolbar-title>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>

            <v-btn :loading="refreshing" color="primary" dark class="mb-2" icon v-on:click="refresh()"><v-icon>refresh</v-icon></v-btn>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>

            <v-spacer>
            </v-spacer>


            <v-dialog v-model="deleteDialog" persistent @keydown.esc="escapeDeleteDialog()">
                <v-card>
                    <v-card-title class="headline">{{$t("crud.confirmDelete")}}</v-card-title>


                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn color="blue darken-1" :disabled="deleting" flat @click="deleteDialog = false ">{{$t("no")}}</v-btn>
                        <v-btn color="blue darken-1" :disabled="deleting" :loading="deleting" flat @click="onDeleteItem">{{$t("yes")}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialog" max-width="700px" persistent @keydown.esc="escape()">
                <v-btn slot="activator" color="primary" dark class="mb-2" icon><v-icon>add</v-icon></v-btn>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ editedItem.id ? $t(crudKey + ".editDialogLabel") : $t(crudKey + ".createDialogLabel")}}</span>
                    </v-card-title>

                    <v-form
                            ref="form"
                            v-model="valid"
                    >
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex v-for="header in propertyHeaders" v-bind:key="header.value" xs12 sm12 md12 style="padding:0px">
                                        <DateEditor
                                                v-if="header.type === TYPE_DATE"
                                                v-model="editedItem[header.value]"
                                                :label="getFieldName(header)" />
                                        <v-text-field v-bind:prepend-icon="header.prepend_icon" v-if="!header.type"
                                                      v-model="editedItem[header.value]"
                                                      v-bind:label="getFieldName(header)"
                                                      :rules="getValidators(header)">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" :disabled="saving" flat @click="close">{{$t("cancel")}}</v-btn>
                            <v-btn color="blue darken-1" :disabled="saving || !valid" :loading="saving" flat @click="save">{{$t("save")}}</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-data-table
                :pagination.sync="pagination"
                :headers="headersWithText"
                :items="items"
                hide-actions
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <tr @click="editItem(props.item)">
                    <td v-for="header in propertyHeaders" class="text-xs-left kb-datatable-row">
                        <template v-if="header.type === TYPE_IMAGE && resolveProperty(header.value, props.item)">
                            <v-img :src="'https://cors-anywhere.herokuapp.com/' + resolveProperty(header.value, props.item)"/>
                        </template>
                        <template v-if="header.type === TYPE_DATE && resolveProperty(header.value, props.item)">
                            {{resolveProperty(header.value, props.item)}}
                        </template>
                        <template v-if="!header.type">
                            {{resolveProperty(header.value, props.item)}}
                        </template>
                    </td>

                    <td v-for="header in actionHeaders" class="text-xs-left kb-datatable-row">
                        <v-tooltip bottom open-delay="500">
                            <template v-slot:activator="{ on }">
                                <v-icon v-on="on"
                                        small
                                        class="mr-2"
                                        @click.stop="action(header.value, props.item)"
                                >
                                    {{header.icon || header.value}}
                                </v-icon>
                            </template>
                            <span>{{translate(crudKey + '.field.' + header.value, 'field.' + header.value)}}</span>

                        </v-tooltip>
                    </td>
                </tr>
            </template>
            <template slot="no-data">
                <span>{{$t(crudKey + ".noneFound")}}</span>
            </template>
        </v-data-table>
        <div class="text-xs-center pt-2 kb-datatable-pagination">
            <v-pagination v-model="pagination.page" :length="pages()"></v-pagination>
        </div>
    </div>
</template>



<script lang="ts">
import Component from 'vue-class-component';
import {Mixins, Prop, Watch} from 'vue-property-decorator';
import {ObjectWithId} from '@/model/model';
import Utils from '@/utils/utils';
import FieldType from '@/views/common/FieldType';
import Validators from '@/utils/validators';
import DateEditor from '@/views/common/DateEditor.vue';

@Component({
    components: {DateEditor},
})
export default class Crud extends Mixins(Utils, FieldType, Validators) {

    get propertyHeaders() {
        return this.headers.filter((f) => f.type !== this.TYPE_ACTION);
    }

    get actionHeaders() {
        return this.headers.filter((f) => f.type === this.TYPE_ACTION);
    }

    get headersWithText() {
        const result = this.headers.map((h) => ({...h, text: this.getHeaderName(h)}));
        return  result;
    }
    @Prop() public items!: ObjectWithId[];
    @Prop() public headers!: any[];
    @Prop() public refreshing!: boolean;
    @Prop() public crudKey!: string;

    protected editedItem: ObjectWithId = {};
    protected deletingItem: ObjectWithId = {};

    protected dialog = false;
    protected deleteDialog = false;
    private saving = false;
    private deleting = false;

    private valid = true;

    private pagination = {
        rowsPerPage: 1,
    };

    public getHeaderName(h: any) {
        return h.type === this.TYPE_ACTION ? '' : this.$t(this.crudKey + '.field.' + h.value);
    }

    public getFieldName(h: any) {
        let name = this.$t(this.crudKey + '.field.' + h.value);

        if (h.required) {
            name += '*';
        }

        return name;
    }

    public getValidators(header: any): any {
        const validators = header.validators ? [...header.validators] : [];
        if (header.required) {
            validators.push(this.required());
        }

        return validators;
    }

    private height(selector: string): number {
        const elt = this.$el.querySelector(selector);
        return elt ? elt.clientHeight : 0;
    }

    private mounted() {
        window.addEventListener('resize', this.handleResize);
    }

    private beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    }

    private handleResize() {
        this.updateSize();
    }

    private updated() {
        this.updateSize();
    }

    private updateSize() {
        const totalHeight = this.$el.parentElement!.clientHeight;

        const toolbar = this.height('.kb-datatable-toolbar');
        const pagination = this.height('.kb-datatable-pagination');
        const header = this.height('th');
        const row = this.height('.kb-datatable-row') + 1;

        const count = (totalHeight - toolbar - pagination - header) / row - 1;

        if (isFinite(count)) {
            this.pagination.rowsPerPage = Math.ceil(count);
        } else {
            this.pagination.rowsPerPage = Math.ceil(1);
        }

        const elt = this.$el.childNodes[1] as HTMLElement;
        elt.style.height = header + this.pagination.rowsPerPage * row + 'px';
    }

    private action(a: string, item: ObjectWithId) {
        switch (a) {
            case 'edit':
                this.editItem(item);
                break;
            case 'delete':
                this.deletingItem = item;
                this.deleteDialog = true;
                break;
            default:
                this.$emit(a, item);
                break;
        }
    }

    @Watch('dialog', { immediate: true, deep: true })
    private watchRoute(dialog: boolean) {
        if (dialog) {
            (this.$refs.form as HTMLFormElement).resetValidation();
        }
    }

    private editItem(item: object) {
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
    }

    private onDeleteItem() {
        this.deleting = true;
        this.$emit('deleteItem', this.deletingItem.id, (success: boolean) => {
            this.deleting = false;
            if (success) {
                this.deleteDialog = false;
            }
        });
    }

    private close() {
        this.dialog = false;
        setTimeout(() => {
            this.editedItem = {};
        }, 300);
    }

    private save() {
        this.saving = true;
        const callback = (success: boolean) => {
          this.saving = false;
          if (success) {
              this.close();
          }
        };
        if (this.editedItem.id) {
            this.$emit('updateItem', this.editedItem, callback);

        } else {
            this.$emit('createItem', this.editedItem, callback);
        }
    }

    private escape() {
        if (!this.saving) {
            this.editedItem = {};
            this.dialog = false;
        }
    }

    private escapeDeleteDialog() {
        if (!this.deleting) {
            this.deleteDialog = false;
        }
    }

    private refresh() {
        this.$emit('refreshItems');
    }

    private pages() {
        if (this.pagination.rowsPerPage == null || this.items.length == null) {
            return 0;
        }

        return Math.ceil(this.items.length / this.pagination.rowsPerPage);
    }

}
</script>
