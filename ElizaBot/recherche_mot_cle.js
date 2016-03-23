/*Fonction recherche mot clé et gérage de la casse*/
function rechercher_mot_cle(saisie_utilisateur)
{
	var retour = [];
	var temp;
	
	temp = saisie_utilisateur.toLowerCase();
	
	// Recherche d'une première lettre d'un mot clé dans le texte
    for(var i = 0; i < temp.length; i++) {
	    if (texte[i] == "E") {
		    // Si nous le trouvons, ajoutons les caractères 
                    // au tableau jusqu'à la longueur de mon nom
		    for(var j = i; j < (monNom.length + i); j++) {
			    retour.push(retour[j]);
		    }
	    }
    }
	return retour;
	
}
