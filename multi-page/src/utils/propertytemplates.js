export const makeNumericProperty = () => {
    return {
        def: 9,
        max: 100,
        min: 0,
        set: "--",
        step: 1.0,
        unit: "--"
    }
};

export const makeSelectProperty = () => {
    return {
        set: "--",
        options: ["--", "---"]
    }
};