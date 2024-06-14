function stringifyStyle(style) {
    const styleString = Object.entries(style)
        .map(([key, value]) => {
            const kebabKey = key
                .replace(/([a-z])([A-Z])/g, '$1-$2')
                .toLowerCase();
            return `${kebabKey}: ${value}`;
        })
        .join('; ');
    return styleString;
}

export default stringifyStyle;