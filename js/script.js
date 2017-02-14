function drawBackground() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, W_WIDTH, W_HEIGHT);
}

function drawPlayer() {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(player_x, player_y, P_WIDTH, P_HEIGHT);
}

function main() {
    if (isPressed(up_keys))
        player_y = Math.max(player_y - P_SPEED, 0);
    if (isPressed(left_keys))
        player_x = Math.max(player_x - P_SPEED, 0);
    if (isPressed(down_keys))
        player_y = Math.min(player_y + P_SPEED, W_HEIGHT - P_HEIGHT);
    if (isPressed(right_keys))
        player_x = Math.min(player_x + P_SPEED, W_WIDTH - P_WIDTH);


    drawBackground();
    drawPlayer();
    setTimeout(main, 30);
}

function isPressed(keys) {
    var res = false;
    for (var i = 0; i < keys.length; i++) {
        res |= keys_pressed[keys[i]];
    }
    return res;
}

$(document).ready(function(){
    keys_pressed = [];
    window.onkeydown = function(e) {keys_pressed[e.keyCode]=true;}
    window.onkeyup = function(e) {keys_pressed[e.keyCode]=false;}

    W_WIDTH = document.documentElement.clientWidth;
    W_HEIGHT = document.documentElement.clientHeight;

    var canvas = document.getElementById('canvas');
    canvas.width = W_WIDTH;
    canvas.height = W_HEIGHT;

    ctx = canvas.getContext('2d');


    player_x = Math.round(W_WIDTH / 2);
    player_y = Math.round(W_HEIGHT / 5 * 4);

    main();
});
