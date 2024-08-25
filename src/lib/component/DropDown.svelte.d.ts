import { SvelteComponent } from "svelte";
import type { DropDownOption } from "./DropDownHelper.ts";
declare const __propDef: {
    props: {
        options?: DropDownOption[];
        searchable?: boolean;
        clearable?: boolean;
        multiple?: boolean;
        model: DropDownOption | DropDownOption[];
        zIndex?: number;
        optionSelectedColor?: string;
        optionHighlightedColor?: string;
        onChange: (value: DropDownOption | DropDownOption[] | undefined) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        'dropdown-item': {
            option: DropDownOption;
            index: any;
            handleClickOptions: (option: DropDownOption) => void;
        };
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
type DropDownProps_ = typeof __propDef.props;
export { DropDownProps_ as DropDownProps };
export type DropDownEvents = typeof __propDef.events;
export type DropDownSlots = typeof __propDef.slots;
export default class DropDown extends SvelteComponent<DropDownProps_, DropDownEvents, DropDownSlots> {
}
