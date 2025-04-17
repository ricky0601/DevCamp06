export type ThemeName = "light" | "dark";

type ColorKey = "primary" | "background" | "secondory" | "third" ; 

interface Theme {
    name: ThemeName;
    color : Record<ColorKey, string>;
};

export const light : Theme = {
    name : 'light',
    color : {
        primary: 'brown',
        background: 'lightgray',
        secondory : 'blue',
        third : 'green',
    },
};

export const dark : Theme = {
    name : 'dark',
    color : {
        primary: 'coral',
        background : 'midnightblue',
        secondory : 'darkblue',
        third : 'darkgreen',
    },
};

export const getTheme = (themeName : ThemeName) : Theme => {
    switch(themeName){
        case "light":
            return light;
        case "dark":
            return dark;
    }
}