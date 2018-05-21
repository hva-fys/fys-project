/**
 * Generates a random guid
 *
 * @author
 * @see https://stackoverflow.com/a/105074/4047409
 **/
export const guid = (prefix = '') => {
    const s4 = () => (
        Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    );

    return `${s4()}-${s4()}`;
};
