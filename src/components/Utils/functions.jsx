const scrollTo = (section, ref = undefined) => {
    const element = ref ? ref.current : document.querySelector(`${section}`);
    const headerOffset = 72;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
        top: offsetPosition
    });
}

const RemoveDuplicates = (array, key) => {
    return array.reduce((arr, item) => {
        const removed = arr.filter(i => i[key] !== item[key]);
        return [...removed, item];
    }, []);
}

export { scrollTo, RemoveDuplicates };

