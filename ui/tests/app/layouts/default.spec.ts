import {mountSuspended} from "@nuxt/test-utils/runtime";
import DefaultLayout from "~/layouts/default.vue";
import {it, expect, describe, beforeEach} from "vitest";

import type {Props, TestComponent} from "~~/tests/types/types";

describe("DefaultLayout", () => {
    let component: TestComponent;

    const factory = async (props: Props) => {
        return await mountSuspended(DefaultLayout, {
            props: {
                ...props,
            },
        });
    };

    beforeEach(async () => {
        component = await factory({});
    });

    it("should match html", () => {
        expect(component.html()).toMatchSnapshot();
    });
});
