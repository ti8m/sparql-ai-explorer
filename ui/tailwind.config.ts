import type {Config} from "tailwindcss";

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                "blue-whale": {
                    DEFAULT: "#009688",
                    50: "#4FFFEF",
                    100: "#3AFFED",
                    200: "#11FFE9",
                    300: "#00E8D2",
                    400: "#00BFAD",
                    500: "#009688",
                    600: "#005E55",
                    700: "#002622",
                    800: "#000000",
                    900: "#000000",
                    950: "#000000",
                },
                "surfie-green": {
                    DEFAULT: "#0B7385",
                    50: "#57DAF1",
                    100: "#44D6F0",
                    200: "#1ECEEC",
                    300: "#11B4D0",
                    400: "#0E94AB",
                    500: "#0B7385",
                    600: "#074651",
                    700: "#02191D",
                    800: "#000000",
                    900: "#000000",
                    950: "#000000",
                },
            },
        },
    },
};
