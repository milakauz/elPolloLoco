let level1;

async function initLevel() {
    level1 = new Level(
        createEnemies(),
        createClouds(),
        createBackgroundObjects(),
        createCoins(),
        createBottles(),
        createEndboss(),
    )
}

function createEnemies() {
    return [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken()
    ]
}

function createClouds() {
    return [
        new Cloud(),
        new Cloud(),
        new Cloud()
    ]
}

function createBackgroundObjects() {
    return [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 1438),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1438),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1438),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1438),

        new BackgroundObject('img/5_background/layers/air.png', 2157),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 2157),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 2157),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 2157),

        new BackgroundObject('img/5_background/layers/air.png', 2876),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2876),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2876),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2876)
    ]
}

function createCoins() {
    return [
        new Coin('img/8_coin/coin_1.png'),
        new Coin('img/8_coin/coin_1.png'),
        new Coin('img/8_coin/coin_1.png'),
        new Coin('img/8_coin/coin_1.png'),
        new Coin('img/8_coin/coin_1.png'),
        new Coin('img/8_coin/coin_1.png'),
        new Coin('img/8_coin/coin_1.png'),
        new Coin('img/8_coin/coin_1.png'),
        new Coin('img/8_coin/coin_1.png'),
        new Coin('img/8_coin/coin_1.png')
    ]
}

function createBottles() {
    return [
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png')
    ]
}

function createEndboss() {
    return [
        new Endboss()
    ]
}
