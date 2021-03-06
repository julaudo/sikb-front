<template>
    <div class="kb-datatable" style="width:100%;">
        <v-toolbar class="kb-datatable-toolbar" flat>
            <v-toolbar-title>{{$t(crudKey + ".listTitle")}}</v-toolbar-title>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>

            <v-btn id="btnRefresh" :loading="refreshing" color="primary" dark class="mb-2" icon @click="refresh()"><v-icon>refresh</v-icon></v-btn>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>

            <v-spacer>
            </v-spacer>
            <v-btn v-if="canCreate()" id="btnCrudCreate" color="primary" dark class="mb-2" icon @click="create()"><v-icon>add</v-icon></v-btn>

            <Dialog v-model="deleteDialog"
                    :title="$t('crud.confirmDelete')"
                    :buttons="deleteButtons">
            </Dialog>

            <v-dialog id="refDialog" v-model="dialog" max-width="700px" persistent @keydown.esc="escape()">
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
                                        <v-select
                                                :id="getId(header)"
                                                v-if="header.type === TYPE_LIST"
                                                :value="resolveProperty(header.value, editedItem)"
                                                @input="setProperty(header.value, editedItem, header.list.filter((e) => header.itemValue.print(e) === $event)[0])"
                                                :items="header.list"
                                                :item-text="header.itemText.printer"
                                                :item-value="header.itemValue.printer"
                                                :label="getFieldName(header)"
                                        ></v-select>

                                        <MultiEditor
                                                :id="getId(header)"
                                                v-if="header.type === TYPE_LIST_MULTI"
                                                :value="resolveProperty(header.value, editedItem)"
                                                :items="header.list"
                                                :itemText="header.itemText"
                                                :chipText="header.chipText"
                                                :format="(a)=>a.name"
                                                :label="getFieldName(header)"
                                                @input="setProperty(header.value, editedItem, $event)"
                                        ></MultiEditor>

                                        <DateEditor
                                                :id="getId(header)"
                                                v-if="header.type === TYPE_DATE"
                                                v-model="editedItem[header.value]"
                                                :label="getFieldName(header)" />
                                        <v-text-field v-bind:prepend-icon="header.prepend_icon" v-if="!header.type"
                                                :id="getId(header)"
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
                            <v-btn id="refDialogCancel" color="blue darken-1" :disabled="saving" flat @click="close">{{$t("cancel")}}</v-btn>
                            <v-btn id="refDialogSave" color="blue darken-1" :disabled="saving || !valid" :loading="saving" flat @click="save">{{$t("save")}}</v-btn>
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
                            <v-img :src="resolveProperty(header.value, props.item)"/>
                        </template>
                        <template v-if="header.type !== TYPE_IMAGE && resolveProperty(header.value, props.item)">
                            {{getColumnText(header, props.item)}}
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
import {ICrud, ObjectWithId} from '@/model/model';
import Utils from '@/utils/utils';
import FieldType from '@/views/common/FieldType';
import Validators from '@/utils/validators';
import DateEditor from '@/views/common/DateEditor.vue';
import MultiEditor from '@/views/common/MultiEditor.vue';
import {Getter} from 'vuex-class';
import {DialogButton} from '@/views/common/DialogButton';
import Dialog from '@/views/common/Dialog.vue';

@Component({
    components: {DateEditor, MultiEditor, Dialog},
})
export default class Crud extends Mixins(Utils, FieldType, Validators) implements ICrud {
    @Prop() public items!: ObjectWithId[];
    @Prop() public headers!: any[];
    @Prop() public refreshing!: boolean;
    @Prop() public crudKey!: string;
    @Prop() public rightPrefix!: string;
    @Getter public features!: string[];

    get propertyHeaders() {
        return this.headers.filter((f) => f.type !== this.TYPE_ACTION);
    }

    get actionHeaders() {
        return this.visibleHeaders.filter((f) => f.type === this.TYPE_ACTION);
    }

    get visibleHeaders() {
        return this.headers
            .filter((f) => this.features.includes(this.rightPrefix + '_DELETE') || f.value !== 'delete')
            .filter((f) => this.features.includes(this.rightPrefix + '_UPDATE') || f.value !== 'edit');
    }

    get headersWithText() {
        const result = this.visibleHeaders.map((h) => ({...h, text: this.getHeaderName(h)}));
        return  result;
    }

    public dialog = false;

    public editedItem: ObjectWithId = {};
    public deletingItem: ObjectWithId = {};
    public deleteDialog = false;

    private saving = false;

    private valid = true;


    private deleteButtons = [
        new DialogButton('no', 'refDeleteDialogNo', () => Promise.resolve()),
        new DialogButton('yes', 'refDeleteDialogYes', this.onDeleteItem),
    ];

    private pagination = {
        rowsPerPage: 1,
    };

    public getColumnText(header: any, item: any) {
        if (header.type === this.TYPE_DATE) {
            return this.resolveProperty(header.value, item); // Todo format
        } else if (header.type === this.TYPE_LIST) {
            return this.getItemText(header, this.resolveProperty(header.value, item));
        } else if (header.type === this.TYPE_LIST_MULTI) {
            return this.resolveProperty(header.value, item).map((i: any) => this.getItemText(header, i)).join(', ');
        } else {
            return this.resolveProperty(header.value, item);
        }
    }

    public getItemText(header: any, item: any) {
        if (header.chipText) {
            return header.chipText.print(item);
        }
        return header.itemText.print(item);
    }

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

        const elt = this.$el.children[1] as HTMLElement;
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

    private onDeleteItem(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.$emit('deleteItem', this.deletingItem.id, (success: boolean) => {
                if (success) {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }

    private close() {
        this.dialog = false;
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

    private defaultItem() {
        const item = {};
        this.headers.filter((h) => h.type !== this.TYPE_ACTION).forEach((h) => {
            this.setProperty(h.value, item, null);
        });
        return item;
    }

    private create() {
        this.editedItem = this.copy(this.defaultItem());
        this.dialog = true;
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

    private getId(header: any): string {
        return 'crud_' + header.value;
    }

    private canCreate(): boolean {
        return this.features.includes(this.rightPrefix + '_CREATE');
    }

}
</script>
