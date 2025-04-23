import type {VueWrapper} from "@vue/test-utils";

export interface Props {
    [key: string]: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TestComponent = VueWrapper<any>;
