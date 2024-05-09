const themeDefinition = (mode) => ({
    palette: {
        mode,
        ...(mode === "light") ?
            {
                text: {
                    primary: "#5C3C3C", // light red-gray
                    secondary: "#BF8A8A" // red-gray
                },
                background: {
                    primary: "#FFF6F6", // light red-gray
                    secondary: "#FFFFFF", // white
                    third: "#FFFFFF" // white
                },
                primary: {
                    main: "#FF496F" // bright red
                },
                common: {
                    border: "#F2E0E0", // light red-gray
                    boxShadow: "#F2E0E0", // light red-gray
                    misc: "#BF8A8A", // red-gray
                    disButton: "#BF8A8A" // red-gray
                }
            } :
            {
                text: {
                    primary: "#FFD6D6", // light red-gray
                    secondary: "#FFD6D6" // light red-gray
                },
                background: {
                    primary: "#000000", // near pitch black
                    secondary: "#0F0F0F", // darker red-gray
                    third: "#000000" // near pitch black
                },
                primary: {
                    main: "#FF496F" // bright red
                },
                common: {
                    border: "#202020", // dark red-gray
                    boxShadow: "#FF496F", // bright red
                    misc: "#7E5A5A", // medium red-gray
                    disButton: "#989898" // light red-gray
                }
            }
    }
});

export default themeDefinition;
