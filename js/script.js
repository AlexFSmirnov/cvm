function onload() {
    W_WIDTH = document.documentElement.clientWidth;
    W_HEIGHT = document.documentElement.clientHeight;

    var canvas = document.getElementById('canvas');
    canvas.width = W_WIDTH;
    canvas.height = W_HEIGHT;

    ctx = canvas.getContext('2d');
};
