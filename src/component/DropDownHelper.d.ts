export type KeyValueObject = {
    [key: string]: unknown;
};
export type DropDownOption = {
    value: string | number | boolean | unknown;
    label: string;
} & (KeyValueObject);
export type OptionsComponentProps = {
    listOptions: DropDownOption[];
    isSearch?: boolean;
    searchKeyword?: string;
    handleClickOptions: (option: DropDownOption) => void;
};
export declare const highlightText: (text: string, keyword: string, fontColor?: string, backgroundColor?: string) => string;
