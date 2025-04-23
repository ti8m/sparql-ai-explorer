import {mountSuspended} from "@nuxt/test-utils/runtime";
import AppSpinner from "~/components/spinner/AppSpinner.vue";
import {it, expect, describe, beforeEach} from "vitest";

import type {Props, TestComponent} from "~~/tests/types/types";

describe("AppSpinner", () => {
    let component: TestComponent;

    const factory = async (props: Props) => {
        return await mountSuspended(AppSpinner, {
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
