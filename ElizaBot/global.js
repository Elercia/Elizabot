//fichier des fonctions et des veriables globale qui seront utilisée par tous le monde
function init(){
	alert("Bienvenue sur le programme elizabot version 1.0");
}

function reponse(mots_cle, ensemble_def, ensemble_dependance)
{
	if(mots_cle === "undefined" && ensemble_dependance === "undefined" && ensemble_def === "undefined")
	{
		alert("Movaise rentrée de définition");
	}
	this.mots_cle = mots_cle;
	this.ensemble_def = ensemble_def;
	this.ensemble_dependance = ensemble_dependance;
}

reponse.prototype.methode1 = function() {
	//corps de la methode
};

var a = new reponse({}, {}, {});//déclaration objet reponse