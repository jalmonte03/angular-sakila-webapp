const graphColors = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(255, 159, 64, 0.7)',
    'rgba(255, 205, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(54, 162, 235, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(201, 203, 207, 0.7)'
];

export function getGraphColors(length: number) {
    const colors: string[] = [];

    for(let i = 0;i < length;i++){
        colors.push(graphColors[i % graphColors.length]);
    }

    return colors;
}