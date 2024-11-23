export interface CascaderOption {
    value: string;
    label: string;
    children?: CascaderOption[];
}

export interface SelectOption {
    value: string;
    label: string;
}