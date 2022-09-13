const scrollTo = (section) => {
    const element = document.querySelector(`${section}`);
    const headerOffset = 72;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
        top: offsetPosition
    });
}

export default { scrollTo };
