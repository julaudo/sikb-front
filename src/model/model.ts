
export interface ObjectWithId {
    id?: any;
}

export interface ICrudParent {
    items: ObjectWithId[];
    headers: any[];
}

export interface ICrud {
    dialog: boolean;
    deleteDialog: boolean;
    editedItem: ObjectWithId;
    deletingItem: ObjectWithId;
    readonly visibleHeaders: any;
}
