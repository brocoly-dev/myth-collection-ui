// Create and export a static Map
const groupColorMap = new Map([
    ['V1', '#f2f2f2'],
    ['V2', '#544f5a'],
    ['V3', '#a2385b'],
    ['V4', '#b8ecf7'],
    ['V5', '#41a4ed'],
    ['BLACK', '#1e1e1e'],
    ['SECONDARY', '#b7d2e4'],
    ['STEEL', '#999b9f'],
    ['SILVER', '#e3e0df'],
    ['GOLD', '#f4e540'],
    ['ROBE', '#647ce9'],
    ['SCALE', '#00a064'],
    ['GOD', '#ffffff'],
    ['SURPLICE', '#cda0dd'],
    ['SPECTER', '#7e264c'],
    ['JUDGE', '#554d9e'],
    ['INHERITOR', '#fde833']
]);

const lineUpLogoMap = new Map([
    ['MYTH_CLOTH_EX', 'https://imagizer.imageshack.com/img922/1037/VGb1UY.png'],
    ['MYTH_CLOTH', 'https://imagizer.imageshack.com/img924/6752/iUnW9X.png'],
    ['APPENDIX', 'https://imagizer.imageshack.com/img924/4460/ie9qrP.png'],
    ['SC_LEGEND', 'https://imagizer.imageshack.com/img923/1657/Q5BSqo.png'],
    ['FIGUARTS', 'https://imagizer.imageshack.com/img924/8374/u8fqwi.png'],
    ['FIGUARTS_ZERO', 'https://imagizer.imageshack.com/img924/3571/4Lb8pL.png'],
    ['SC_CROWN', 'https://imagizer.imageshack.com/img922/4038/bdn9mi.png'],
    ['DDP', 'https://imagizer.imageshack.com/img923/9839/zPtgsH.png']
]);


export const findColorByCategory = (category) => {
    if (category) {
        return groupColorMap.get(category);
    } else {
        return "#0d0d0d";
    }
};

export const findMythClothLogoByLineUp = (lineUp) => {
    if (lineUp) {
        return lineUpLogoMap.get(lineUp);
    } else {
        return "";
    }
};

