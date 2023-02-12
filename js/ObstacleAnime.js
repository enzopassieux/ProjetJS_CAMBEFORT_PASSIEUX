import Obstacle  from './ObstacleClass.js';

// bonne pratique : une seule classe exportée par fichier et on l'exporte par 
// defaut
export default class ObstacleAnime extends Obstacle {
    constructor(x, y, r, couleur, vy) {
        // on appelle le constructeur de la classe mère
        super(x, y, 2*r, 2*r, couleur);
        this.r = r;
        this.vy = -vy;
    }
    // on hérite de la méthode draw(ctx)
    draw(ctx) {

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.couleur;
        // voir mooc html5 coding essentials and best practices
        // module 3 sur graphics
        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, 2*Math.PI);
        ctx.fill();
        ctx.strokeStyle="black";
        ctx.lineWidth=2;
        ctx.stroke();
        ctx.restore();


        this.y += this.vy;
        // collision en bas
        if(this.y + this.h >280) {
            // On met l'obstacle au point de contact
            this.y = -100;
            // et on inverse la vitesse
            this.vy = 0
        }
        // collision en haut
        if(this.y < -100) {
            // On met l'obstacle au point de contact
            this.y = -100;
            // et on inverse la vitesse
            this.vy = -this.vy;
        }

        // on appelle la méthode draw de la classe mère
        //super.draw(ctx);
    }

}
