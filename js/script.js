import Joueur from './JoueurClass.js';
import Obstacle from './ObstacleClass.js';
import Decor from './DecorClass.js';
import DecorClimb from './DecorClimb.js';
import { ajouteEcouteursClavier, inputState, mousePos } from './ecouteurs.js';
import { circRectsOverlap, rectsOverlap } from './collisions.js';
import ObstacleAnime from './ObstacleAnime.js';
import Sortie from './Sortie.js';
import { createLvls } from './Lvls.js';
import { loadAssets } from './assets.js';



let canvas, ctx;
let gameState = 'menuStart';
let joueur;
let decor1;
let tableauDesObjetsGraphiques = [];
let assets;
let lvls;
let currentLvl = 0;
let currentLvlAffiche = 0;


var assetsToLoadURLs = {
    joueur: { url: '../assets/images/steve.png' }, 
    plop: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/plop.mp3', buffer: false, loop: false, volume: 1.0 },
};

// Bonne pratique : on attend que la page soit chargée
// avant de faire quoi que ce soit
window.onload = init;


function init(event) {
    console.log("Page chargée et les éléments HTML sont prêts à être manipulés");
    canvas = document.querySelector('#myCanvas');
    //console.log(canvas);
    // pour dessiner, on utilise le contexte 2D
    ctx = canvas.getContext('2d');

    // chargement des assets (musique,  images, sons)
    loadAssets(assetsToLoadURLs, startGame);
}

function startGame(assetsLoaded){
    assets = assetsLoaded;

    // appelée quand tous les assets sont chargés
    console.log("StartGame : tous les assets sont chargés");
    
    // On va prendre en compte le clavier
    ajouteEcouteursClavier();
    //ajouteEcouteurSouris();

    // On va créer un joueur
    // On va créer un joueur
    // On va créer un joueur params (x, y, l, h, couleur)
    joueur = new Joueur(10, 280, 30, 30, 'green');
    joueur.vy = 280;
    tableauDesObjetsGraphiques.push(joueur);

    lvls = createLvls(assets);

    requestAnimationFrame(animationLoop);

}


function dessinerLesObjetsGraphiques(ctx) {
    tableauDesObjetsGraphiques.forEach(o => {
        o.draw(ctx);
        });
    };

function animationLoop() {
    // On va exécuter cette fonction 60 fois par seconde
    // pour créer l'illusion d'un mouvement fluide
    // 1 - On efface le contenu du canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (gameState) {
        case 'menuStart':
            afficheMenuStart(ctx);
            break;
        case 'gameOver':
            afficheGameOver(ctx);
            break;
        case 'jeuEnCours':

            affichageRegleslvl(ctx);
            afficheLvl(ctx);

            // Changement de lvl et création des obstacles
            changeLvl();
            // 2 - On dessine le nouveau contenu
            dessinerLesObjetsGraphiques(ctx);

            // 3 - on déplace les objets
            testeEtatClavierPourJoueur();

            //joueur.followMouse(mousePos);

            joueur.move();
            joueur.testeCollisionAvecBordsDuCanvas(canvas.width, canvas.height);
            joueur.detecteCollisionJoueurAvecSol();
            detecteCollisionJoueurAvecObstacles();
            detecteCollisionJoueurAvecObstaclesAnimes();
            detecteCollisionAvecSortie();
            //grimperDecor();

            break;
        case 'gameVictory':
            afficheGameVictory(ctx);
    }

    // 4 - On rappelle la fonction d'animation
    requestAnimationFrame(animationLoop);
}

function afficheMenuStart(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "50px Arial";
    ctx.fillText("Press s to start", 190, 100);
    ctx.strokeText("Press s to start", 190, 100);
    if (inputState.start) {
        gameState = 'jeuEnCours';
    }
}
function afficheGameOver(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "50px Arial";
    ctx.fillText("GAME OVER", 190, 100);
    ctx.strokeText("GAME OVER", 190, 100);
    ctx.fillText("Press s to restart", 250, 300);
    ctx.strokeText("Press s to restart", 250, 300);
    if (inputState.start) {
        gameState = 'menuStart';
        joueur.x = 0;
    }
}

function afficheGameVictory(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.font = "50px Arial";
    ctx.fillText("VICTORY", 375, 100);
    ctx.strokeText("VICTORY", 375, 100);
    if(inputState.space) {
        gameState = 'menuStart';
        joueur.x = 0;
    }
} 


function affichageRegleslvl(ctx) {
    ctx.font = "20px Arial";
    if(currentLvl == 0){
        ctx.fillText("Vous pouvez sautez sur les blocs noirs via la touche du haut" , 190, 100)
    }
    else if(currentLvl == 1){
        ctx.fillText("Bravo ! Maintenant esquivez les boules rouges", 190, 100)
    }
    currentLvlAffiche = currentLvl + 1;

}


function afficheLvl(ctx) {
    ctx.fillStyle = 'black';
    ctx.font = "20px Arial";
    currentLvlAffiche = currentLvl + 1;
    ctx.fillText("Niveau: " + currentLvlAffiche, 10, 60);
}


function testeEtatClavierPourJoueur() {
    joueur.vx = 0;
    if (inputState.left) {
        joueur.vx = -5;
    } else {
        if (inputState.right) joueur.vx = 5;
    }

    if (inputState.up && joueur.peutSauter) {
        //joueur.gravity = 0;
        console.log("jumpPower")
        joueur.vy = joueur.jumpPower;
        joueur.peutSauter = false;
    }

}

function detecteCollisionJoueurAvecObstacles() {
    let collisionExist = false;
    // On va tester si le joueur est en collision avec un des obstacles
    let obstacleCourant;

    for (let i = 0; i < tableauDesObjetsGraphiques.length; i++) {
        let o = tableauDesObjetsGraphiques[i];
        if (o instanceof Obstacle) {
            if (rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, o.x, o.y, o.l, o.h)) {
                collisionExist = true;
                obstacleCourant = o;
                if (collisionExist) {
                    if ((joueur.y < obstacleCourant.y) && (joueur.x > (obstacleCourant.x - joueur.l))
                        && (joueur.x < (obstacleCourant.x + obstacleCourant.l))) {
                        console.log("collision par le haut de l'obstacle")
                        joueur.y = obstacleCourant.y - joueur.h;
                        joueur.vy = 0
                    } else if (joueur.x < obstacleCourant.x) {
                        //collision par gauche
                        console.log("collision par la gauche de l'obstacle")
                        joueur.x = obstacleCourant.x - joueur.l;
                        joueur.vx = 0;
                        //joueur.y = obstacleCourant.y;
                    } else if (joueur.x > obstacleCourant.x) {
                        console.log("collision par la droite de l'obstacle")
                        joueur.x = obstacleCourant.x + obstacleCourant.l;
                        //joueur.y = obstacleCourant.y;
                        joueur.vx = 0;
                    }
                } else {
                    joueur.couleur = 'green';
                }
            }
        }

    }






    /*else if ((joueur.y < obstacleCourant.y) && (joueur.x < obstacleCourant.x)){
        joueur.x = obstacleCourant.x - joueur.l;
        joueur.y = obstacleCourant.y - joueur.h;
    }

    else if((joueur.y < obstacleCourant.y) && (joueur.x > obstacleCourant.x)){
        joueur.x = obstacleCourant.x + obstacleCourant.l;
        joueur.y = obstacleCourant.y - joueur.h;
    }*/



    //gameState = 'gameOver';


}

function detecteCollisionJoueurAvecObstaclesAnimes() {
    let collisionExist = false;
    // On va tester si le joueur est en collision avec un des obstacles
    let obstacleCourant;
    tableauDesObjetsGraphiques.forEach(oa => {
        if (oa instanceof ObstacleAnime) {
            if (rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, oa.x, oa.y, oa.l, oa.h)) {
                collisionExist = true;
                obstacleCourant = oa;
                //o.drawBoundingBox(ctx);
                //joueur.draw(ctx);
                //joueur.drawBoundingBox(ctx);
            }
        }
    });
    if (collisionExist) {
        joueur.couleur = 'blue';
        //joueur.x -= 10;
        gameState = 'gameOver';
        currentLvl = 0;
    } else {
        joueur.couleur = 'green';
    }
}


function detecteCollisionAvecSortie() {
    tableauDesObjetsGraphiques.forEach(o => {
    if (o instanceof Sortie) {
        if (circRectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, o.x, o.y, o.r)) {
            joueur.x = joueur.x - joueur.vx;
            joueur.y = joueur.y - joueur.vy;
            if (currentLvl < lvls.length - 1 ) {
                currentLvl = currentLvl + 1;
                joueur.x = 10;
            }
            else {
                gameState = 'gameVictory';
                currentLvl = 0;
                joueur.x = 10;
            }
        }
    }
    });
}

function changeLvl() {
    let tabElement = lvls[currentLvl].tabElements;
    tableauDesObjetsGraphiques = [...tabElement];
    tableauDesObjetsGraphiques.push(joueur);
}