function drawBackground() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, W_WIDTH, W_HEIGHT);

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, GROUND_LEVEL, W_WIDTH, 1);
}

function drawPlayer() {
    if (cur_action == 'still') {
        if (Date.now() - prev_sprite_change > SCP_STILL) {
            cur_cat_still = (cur_cat_still + 1) % 2;
            prev_sprite_change = Date.now();   
        }
        cur_image = cats_still[cur_cat_still];
    } else if (cur_action == 'walk') {
        console.log(cur_cat_walk);
        if (Date.now() - prev_sprite_change > SCP_WALK) {
            cur_cat_walk = (cur_cat_walk + 1) % 4;
            prev_sprite_change = Date.now();   
        }
        cur_image = cats_walk[cur_cat_walk];
    } else if (cur_action == 'jump') {
        cur_image = cat_jump;
    }

    ctx.drawImage(cur_image, player_x, player_y, P_WIDTH, P_HEIGHT);
}

function playerFall() {
    player_y = Math.min(player_y + GRAVITY - cur_jump, GROUND_LEVEL - P_HEIGHT);
    cur_jump = Math.max(cur_jump - JUMP_FADE_SPEED, 0);
}

function main() {
    if (player_y != GROUND_LEVEL - P_HEIGHT) {
        cur_action = 'jump';
    } else if (isPressed(left_keys) || isPressed(right_keys)) {
        cur_action = 'walk';
    } else {
        cur_action = 'still';
    }

    if (isPressed(left_keys)) {
        player_x = Math.max(player_x - P_SPEED, 0);
    } 
    if (isPressed(right_keys)) {
        player_x = Math.min(player_x + P_SPEED, W_WIDTH - P_WIDTH);
    } 
    if (isPressed(up_keys) && player_y == GROUND_LEVEL - P_HEIGHT) {
        cur_jump = JUMP_SPEED;
    }
    playerFall();

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

    GROUND_LEVEL = W_HEIGHT - GROUND_LEVEL;
    JUMP_SPEED += GRAVITY;

    var canvas = document.getElementById('canvas');
    canvas.width = W_WIDTH;
    canvas.height = W_HEIGHT;

    ctx = canvas.getContext('2d');


    player_x = Math.round(W_WIDTH / 2);
    player_y = GROUND_LEVEL - P_HEIGHT;
    cur_jump = 0;
    cur_action = 'walk';

    prepareSprites();
    main();
});

function prepareSprites() {
    prev_sprite_change = Date.now();

    cat_still_1 = new Image(); cat_still_1.src = "images/cat_still_1.gif";
    cat_still_2 = new Image(); cat_still_2.src = "images/cat_still_2.gif";
    cats_still = [cat_still_1, cat_still_2];
    cur_cat_still = 1;

    cat_walk_1 = new Image(); cat_walk_1.src = "images/cat_walk_1.gif";
    cat_walk_2 = new Image(); cat_walk_2.src = "images/cat_walk_2.gif";
    cat_walk_3 = new Image(); cat_walk_3.src = "images/cat_walk_3.gif";
    cat_walk_4 = new Image(); cat_walk_4.src = "images/cat_walk_4.gif";
    cats_walk = [cat_walk_1, cat_walk_2, cat_walk_3, cat_walk_4];
    cur_cat_walk = 3;

    cat_jump = new Image(); cat_jump.src = "images/cat_jump.gif";
}
