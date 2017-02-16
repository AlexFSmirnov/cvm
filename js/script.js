function drawBackground() {
    ctx.drawImage(background_image, 0, 0);
}

function drawPlayer() {
    var scp = cat_sprites[cur_action]['scp'];
    var prev_change = cat_sprites[cur_action]['prev_change'];
    if (Date.now() - prev_change > scp) {
        cat_sprites[cur_action]['prev_change'] = Date.now();
        cat_sprites[cur_action]['cur'] += 1;
        cat_sprites[cur_action]['cur'] %= cat_sprites[cur_action]['all'];
    }
    cur_x = (cat_sprites[cur_action]['x'] + cat_sprites[cur_action]['cur'] * 
                                                                       P_WIDTH);
    cur_y = cat_sprites[cur_action]['y'];
    if (cur_direction == 'left') {
        cur_y += P_HEIGHT;
        cur_x = 96 - cur_x;
    }

    ctx.drawImage(cat_sprites['image'], cur_x, cur_y, P_WIDTH, P_HEIGHT,
                        player_x, player_y, P_WIDTH, P_HEIGHT);
}

function attack() {
    new_fireball = {
        'x': player_x,
        'y': player_y + P_HEIGHT / 2 - 5,
        'dir': cur_direction,
        'is_alive': true
    }
    if (cur_direction == 'right') new_fireball['x'] += P_WIDTH;
    fireballs.push(new_fireball);
}

function drawFireball(fireball) {
    ctx.fillStyle = "#FFA500";
    ctx.fillRect(fireball['x'] - 5, fireball['y'] - 5, 10, 10);
}

function updateFireballs() {
    // Updating fireballs' coordinaions
    for (var i = 0; i < fireballs.length; i++) {
        if (!fireballs[i]['is_alive']) continue;
        var x = fireballs[i]['x'];
        var y = fireballs[i]['y'];
        var dir = fireballs[i]['dir'];
        if (dir == 'right') {
            if (x + FIREBALL_SPEED <= W_WIDTH) {
                fireballs[i]['x'] += FIREBALL_SPEED;
                drawFireball(fireballs[i]);
            } else {
                fireballs[i]['is_alive'] = false;
            }
        } else {
            if (x - FIREBALL_SPEED >= 0) {
                fireballs[i]['x'] -= FIREBALL_SPEED;
                drawFireball(fireballs[i]);
            } else {
                fireballs[i]['is_alive'] = false;
            }
        }
    }
    // Removing 'dead' fireballs
    while (fireballs.length > 0 && !fireballs[0]['is_alive']) {
        fireballs.shift();
    }
}

function playerFall() {
    player_y = Math.min(player_y + GRAVITY - cur_jump, GROUND_LEVEL - P_HEIGHT);
    cur_jump = Math.max(cur_jump - JUMP_FADE_SPEED, 0);
}

function check_pressed(e) {
    if (isPressed(attack_keys)) {
        cur_action = 'attack';
        if (Date.now() - prev_attack >= ATTACK_PERIOD) {
            prev_attack = Date.now();
            did_attack = ATTACK_LENGTH;
            attack();
        }
    }
}

function main() {
    console.log(fireballs);
    if (did_attack) {
        did_attack -= 1;
        cur_action = 'attack';
    } else if (player_y != GROUND_LEVEL - P_HEIGHT) {
        cur_action = 'jump';
    } else if (isPressed(left_keys) || isPressed(right_keys)) {
        cur_action = 'walk';
    } else {
        cur_action = 'still';
    }

    if (isPressed(left_keys)) {
        player_x = Math.max(player_x - P_SPEED, 0);
        cur_direction = 'left';
    } 
    if (isPressed(right_keys)) {
        player_x = Math.min(player_x + P_SPEED, W_WIDTH - P_WIDTH);
        cur_direction = 'right';
    } 
    if (isPressed(up_keys) && player_y == GROUND_LEVEL - P_HEIGHT) {
        cur_jump = JUMP_SPEED;
    }
    playerFall();

    drawBackground();
    updateFireballs();
    drawPlayer();
    setTimeout(main, 1000 / FPS);
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
    window.onkeypress = function(e) {check_pressed(e);}
    window.addEventListener('resize', adjustWindow, true);
    adjustWindow();

    GROUND_LEVEL = W_HEIGHT - GROUND_LEVEL;
    JUMP_SPEED += GRAVITY;

    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    background_image = new Image();
    background_image.src = "images/background.png";


    player_x = Math.round(W_WIDTH / 2);
    player_y = GROUND_LEVEL - P_HEIGHT;
    cur_jump = 0;
    cur_action = 'walk';
    cur_direction = 'right';
    did_attack = 0;

    prev_attack = Date.now();
    fireballs = [];

    prepareSprites();

    main();
});

function adjustWindow() {
    var c_width = document.documentElement.clientWidth;
    var c_height = document.documentElement.clientHeight;
    if (c_width / c_height > 16 / 9) {
        document.getElementById("canvas").style = "height: " + c_height + "px";
    } else {
        document.getElementById("canvas").style = "width: " + c_width + "px";
    }
}
