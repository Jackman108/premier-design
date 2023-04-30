export interface Title {
    id: number;
    title: string;
    description: string;
}

export interface Button {
    buttonHeader: string;
}

export interface Data {
    title: Title[];
    button: Button[];
}