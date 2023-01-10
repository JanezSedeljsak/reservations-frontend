const cardGradients = {
    open: ['#6a3093', '#a044ff'],
    reserved: ['#403A3E', '#BE5869'],
    old: ['#29322c', '#485563'],
};

export default function getGradient(name) {
    const [fromColor, toColor] = cardGradients[name];
    return `linear-gradient(to bottom, ${fromColor}, ${toColor})`;
}