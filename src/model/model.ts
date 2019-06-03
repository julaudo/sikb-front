
export interface ObjectWithId {
    id?: any;
}

export enum Features {
    ADMIN,
    CLUB_ADMIN,
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
}
