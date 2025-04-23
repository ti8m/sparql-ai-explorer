import {mountSuspended} from "@nuxt/test-utils/runtime";
import AppHeader from "~/components/header/AppHeader.vue";
import {it, expect, describe, beforeEach} from "vitest";

import type {Props, TestComponent} from "~~/tests/types/types";

describe("AppHeader", () => {
    let component: TestComponent;

    const factory = async (props: Props) => {
        return await mountSuspended(AppHeader, {
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
