export const randomColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let c = (hash & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();
    let hex = '#' + "00000".substring(0, 6 - c.length) + c;
    let rgba;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        rgba = hex.substring(1).split('');
        if (c.length == 3) {
            rgba = [rgba[0], rgba[0], rgba[1], rgba[1], rgba[2], rgba[2]];
        }
        rgba = '0x' + rgba.join('');
        return 'rgba(' + [(rgba >> 16) & 255, (rgba >> 8) & 255, rgba & 255].join(',') + ',0.3)';
    }
}

export default randomColor
