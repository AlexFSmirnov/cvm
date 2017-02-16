function prepareSprites() {
    cat_ss = new Image(); cat_ss.src = "images/cat_spritesheet.png";
    cat_sprites = {
        'width': 128,
        'image': cat_ss,
        'still': {
            'cur': 0,
            'all': 2,
            'x': 0,
            'y': 0,
            'scp': 500,
            'prev_change': Date.now()
        },
        'walk': {
            'cur': 0,
            'all': 4,
            'x': 0,
            'y': 64,
            'scp': 50,
            'prev_change': Date.now()
        },
        'jump': {
            'cur': 0,
            'all': 1,
            'x': 64,  
            'y': 0,
            'scp': 1000,
            'prev_change': Date.now()  
        },
        'attack': {
            'cur': 0,
            'all': 1,
            'x': 96,
            'y': 0,
            'scp': 1000,
            'prev_change': Date.now()
        }
    };
}
