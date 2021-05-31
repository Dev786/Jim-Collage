const jimp = require('jimp');

var images = [
    'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1622363254057-1887180b58e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1466&q=80',
    'https://images.unsplash.com/photo-1622176462729-6f2e63370b64?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'
];

var jimps = []
const [WIDTH, HEIGHT] = [1024, 1024];

for (var i = 0; i < images.length; i++) {
    jimps.push(jimp.read(images[i]));
}

const generateSingleThumbnail = (image) => {
    image = image.resize(WIDTH, HEIGHT);
    let newImage = new jimp(WIDTH, HEIGHT, 'green');
    return newImage.blit(image, 0, 0);
}

const generateDoubleThumbnail = (images) => {
    let newImage = new jimp(WIDTH, HEIGHT, 'green');
    images[0] = images[0].resize(WIDTH / 2, HEIGHT);
    images[1] = images[1].resize(WIDTH / 2, HEIGHT);
    newImage = newImage.blit(images[0], 0, 0);
    newImage.blit(images[1], WIDTH / 2 - 1, 0);
    return newImage;
}

const generateTripleThumbnail = (images) => {
    let newImage = new jimp(WIDTH, HEIGHT, 'green');
    images[0] = images[0].resize(WIDTH / 2, HEIGHT / 2);
    images[1] = images[1].resize(WIDTH / 2, HEIGHT / 2);
    images[2] = images[2].resize(WIDTH, HEIGHT / 2);
    newImage = newImage.blit(images[0], 0, 0);
    newImage = newImage.blit(images[1], WIDTH / 2 - 1, 0);
    newImage = newImage.blit(images[2], 0, HEIGHT / 2 - 1);
    return newImage;
}

const generateQuadrupleThumbnail = (images) => {
    let newImage = new jimp(WIDTH, HEIGHT, 'green');
    const n = images.length;
    let imageNumber = 0;
    for (let i = 0; i < n / 2; i++) {
        for (let j = 0; j < n / 2; j++) {
            images[imageNumber] = images[imageNumber].resize(WIDTH / 2, HEIGHT / 2);
            newImage = newImage.blit(images[imageNumber], i * WIDTH / 2 - 1, j * HEIGHT / 2 - 1);
            imageNumber++;
        }
    }
    return newImage;
}

generateImageFactory = (images, number) => {
    switch (number) {
        case 1: return generateSingleThumbnail(images[0]);
        case 2: return generateDoubleThumbnail(images);
        case 3: return generateTripleThumbnail(images);
        case 4: return generateQuadrupleThumbnail(images);
    }
}

Promise.all(jimps).then(data => {
    let newImage = generateImageFactory(data, 1);
    newImage.write('./output/test_single.png');

    newImage = generateImageFactory(data, 2);
    newImage.write('./output/test_double.png');

    newImage = generateImageFactory(data, 3);
    newImage.write('./output/test_triple.png');

    newImage = generateImageFactory(data, 4);
    newImage.write('./output/test_quadruple.png');
});