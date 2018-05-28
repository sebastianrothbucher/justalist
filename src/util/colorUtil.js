import { color as d3Color } from 'd3-color';

const DARK_THRESHOLD = 70;

export const matchingForeground = (bgColor) => {
    let rgb = d3Color(bgColor);
    let dark = (rgb.r + rgb.g + rgb.b) / 3;
    return dark <= DARK_THRESHOLD ? "white" : "black";
};
