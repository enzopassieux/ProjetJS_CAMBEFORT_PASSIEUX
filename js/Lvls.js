import Obstacle from './ObstacleClass.js';
import ObstacleAnime from './ObstacleAnime.js';
import Sortie from './Sortie.js';
import Decor from './DecorClass.js';
import DecorClimb from './DecorClimb.js';

export default class Lvl {
    constructor(tabElements = []) {
        this.tabElements = tabElements;
    }
}

function createLvls(){

    let lvl1 = [  
        new Decor(0, 280, 1500, 600, 'green'),
        new Decor(0, 300, 1500, 600, '#684027'),

        new DecorClimb(300, 250, 30, 30, 'black'),

        new DecorClimb(500, 220, 30, 60, 'black'),


        new DecorClimb(1000, 250, 30, 30, 'black'),
        new DecorClimb(1030, 220, 30, 60, 'black'),
        new DecorClimb(1060, 220, 30, 30, 'black'),
        new DecorClimb(1090, 220, 30, 30, 'black'),
        new DecorClimb(1120, 220, 30, 30, 'black'),
        new DecorClimb(1150, 220, 30, 30, 'black'),
        new DecorClimb(1180, 220, 30, 30, 'black'),
        new DecorClimb(1210, 220, 30, 30, 'black'),
        new DecorClimb(1240, 220, 30, 30, 'black'),
        new DecorClimb(1270, 220, 30, 60, 'black'),
        new DecorClimb(1300, 250, 30, 30, 'black'),
        

        new Sortie(1465, 150, 30, 'yellow'),
    ];
    
    let lvl2 = [  
        new Decor(0, 280, 1500, 600, 'green'),
        new Decor(0, 300, 1500, 600, '#684027'),

        new DecorClimb(190, 250, 30, 30, 'black'),
        new DecorClimb(220, 220, 30, 60, 'black'),

        new DecorClimb(500, 210, 30, 70, 'black'),
        new DecorClimb(530, 210, 30, 70, 'black'),
        new DecorClimb(560, 210, 30, 30, 'black'),
        new DecorClimb(590, 210, 30, 30, 'black'),
        new DecorClimb(620, 210, 30, 30, 'black'),

        
        new DecorClimb(710, 210, 30, 30, 'black'),
        new DecorClimb(740, 210, 30, 30, 'black'),
        new DecorClimb(770, 140, 30, 100, 'black'),

        new ObstacleAnime(200, -100, 10, 'red', 3),
        new ObstacleAnime(Math.random() * 1500, -100, 10, 'red', 1),
        new ObstacleAnime(Math.random() * 1800, -100, 10, 'red', 6),
        new ObstacleAnime(Math.random() * 3000, -100, 10, 'red', 2),
        new ObstacleAnime(Math.random() * 4000, -100, 10, 'red', 5),
        new ObstacleAnime(Math.random() * 2500, -100, 10, 'red', 2),
        new ObstacleAnime(Math.random() * 8000, -100, 10, 'red', 1),
        new ObstacleAnime(Math.random() * 5000, -100, 10, 'red', 3),
        new ObstacleAnime(Math.random() * 4000, -100, 10, 'red', 3),

        new Sortie(1465, 150, 30, 'yellow'),

    ];

    let lvl3 = [  
        new Decor(0, 280, 1500, 600, 'green'),
        new Decor(0, 300, 1500, 600, '#684027'),

        new DecorClimb(190, 250, 30, 30, 'black'),
        new DecorClimb(220, 220, 30, 60, 'black'),

        new DecorClimb(400, 190, 30, 90, 'black'),
        new DecorClimb(430, 220, 30, 60, 'black'),
        new DecorClimb(460, 250, 30, 30, 'black'),

        new DecorClimb(700, 190, 30, 30, 'black'),
        new DecorClimb(730, 190, 30, 30, 'black'),
        new DecorClimb(760, 190, 30, 30, 'black'),
        new DecorClimb(790, 190, 30, 30, 'black'),
        new DecorClimb(820, 190, 30, 30, 'black'),
        new DecorClimb(850, 190, 30, 30, 'black'),
        new DecorClimb(880, 190, 30, 30, 'black'),
        new DecorClimb(910, 190, 30, 30, 'black'),
        new DecorClimb(940, 190, 30, 30, 'black'),
        new DecorClimb(970, 190, 30, 30, 'black'),

        new DecorClimb(1060, 190, 30, 90, 'black'),

        new ObstacleAnime(200, -100, 10, 'red', 3),
        new ObstacleAnime(Math.random() * 1500, -100, 10, 'red', 1),
        new ObstacleAnime(Math.random() * 1800, -100, 10, 'red', 6),
        new ObstacleAnime(Math.random() * 3000, -100, 10, 'red', 2),
        new ObstacleAnime(Math.random() * 4000, -100, 10, 'red', 5),
        new ObstacleAnime(Math.random() * 2500, -100, 10, 'red', 2),
        new ObstacleAnime(Math.random() * 8000, -100, 10, 'red', 1),
        new ObstacleAnime(Math.random() * 5000, -100, 10, 'red', 3),
        new ObstacleAnime(Math.random() * 4000, -100, 10, 'red', 3),

        new Sortie(1465, 150, 30, 'yellow'),

    ];
    
    
    let lvls = [
        new Lvl(lvl1),
        new Lvl(lvl2),
        new Lvl(lvl3),
    ];

    return lvls
}

export {createLvls};

