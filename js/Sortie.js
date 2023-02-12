import ObjetGraphique from './ObjetGraphique.js';

// bonne pratique : une seule classe exportée par fichier et on l'exporte par 
// defaut
export default class Sortie extends ObjetGraphique {
    constructor(x, y, r, couleur) {
        // on appelle le constructeur de la classe mère
        super(x, y, r*2, r*2, couleur);
        this.r = r;
    }
    // on hérite de la méthode drawCircle(ctx)

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.couleur;
        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Sortie", 0, 8);
        
        ctx.restore();
    }

}