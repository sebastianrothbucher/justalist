import { color as d3Color } from 'd3-color';

const DARK_THRESHOLD = 90;

export const matchingForeground = (bgColor) => {
    let rgb = d3Color(bgColor);
    if (rgb) {
        let dark = (rgb.r + rgb.g + rgb.b) / 3;
        return dark <= DARK_THRESHOLD ? "white" : "black";
    } else {
        return null;
    }
};

export const determineBackground = (c, r) =>
    ((c.choices.filter((ch) => ch.value === r.colvalues[c._id])[0] || {}).color || null);