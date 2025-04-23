import {mountSuspended} from "@nuxt/test-utils/runtime";
import LandingPage from "~/pages/index.vue";
import {it, expect, describe, beforeEach} from "vitest";

import type {Props, TestComponent} from "~~/tests/types/types";

describe("Landing Page", () => {
    let component: TestComponent;

    const factory = async (props: Props) => {
        return await mountSuspended(LandingPage, {
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
