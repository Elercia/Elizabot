/**
 * Permet de récupérer tous les mots clés identifiés dans la phrase de l'utilisateur
 * @method     recherche_mot_cle
 * @param {String}  saisie_utilisateur  {Saisie de l'utilisateur}
 * @return {Array} retour {tableau de mots clés identifiés dans la phrase}
 */

/*Fonction recevant le message de l'utilisateur, puis gérant les caractères spéciaux et met le tout en miniscule et renvoie les mots clés*/
ElizaBot.prototype.recherche_mot_cle =  function(saisie_utilisateur)
{
	//Déclaration variables
	var minuscule; //String
	var espace = " "; //String
	var retour = []; //Array
	var tab_split = []; //Array
	
	//On enlève les signes de ponctuation et les accents pour ne pas bloquer un mot clé
	saisie_utilisateur = saisie_utilisateur.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," "); //Supprime ponctuation
	saisie_utilisateur = saisie_utilisateur.replace(/['"')]/g," "); //Supprime "
	saisie_utilisateur = saisie_utilisateur.replace(/["'")]/g," "); //Supprime '
	saisie_utilisateur = saisie_utilisateur.replace(/[âÄÆààáãäåÀÁ]/g,"a"); //Supprime 'A' spéciaux
	saisie_utilisateur = saisie_utilisateur.replace(/[Çç]/g,"c"); //Supprime 'C' spéciaux
	saisie_utilisateur = saisie_utilisateur.replace(/[èéêëËÊÉÈ]/g,"e"); //Supprime 'E' spéciaux
	saisie_utilisateur = saisie_utilisateur.replace(/[îÌÍÎÏìíï]/g,"i"); //Supprime 'I' spéciaux
	saisie_utilisateur = saisie_utilisateur.replace(/[ñÑ]/g,"n"); //Supprime 'N' spéciaux
	saisie_utilisateur = saisie_utilisateur.replace(/[ôÒÓÔÕÖØðòóõö]/g,"o"); //Supprime 'O' spéciaux
	saisie_utilisateur = saisie_utilisateur.replace(/[ûùÙÚÛÜùúûü]/g,"u"); //Supprime 'U' spéciaux
	saisie_utilisateur = saisie_utilisateur.replace(/[Ýýÿ]/g,"y"); //Supprime 'Y' spéciaux	
	console.log(saisie_utilisateur);
	
	
	//On met l'ensemble de la phrase en miniscule pour être en concordance avec la base
	minuscule = saisie_utilisateur.toLowerCase();
	console.log(minuscule);
	
	//On met la chaîne de caractère sous forme de tableau de String
	tab_split = minuscule.split(espace);
    console.log(tab_split);
	
	//Parcourir les mots du tableau et rechercher si = tableau mot clé
	for(var i = 0; i < tab_split.length; i++) //Parcours tableau utilisateur
	{
	    for(var j = 0; j < this.ensemble_rep.length; j++) //Parcours tableau ensemble réponses
	    {
	        for(var k in (this.ensemble_rep[j]).mots_cle) //Parcours tableau des mots clés
	        {
	            if((tab_split[i]) === (this.ensemble_rep[j].mots_cle[k])) //Recherche correspondance
	            {	
	                retour.push(tab_split[i]); //Si Ok ajout dans tableau de retour
	            }
	        }
	    }
	}

    retour.sort(); //Tri des éléments dans ordre alphabétique
    
    for(var l = retour.length; l > -1; l--) //Parcours du tableau en partant de la fin
    {
        for( var m = (l-1); m > -1; m--) //Parcours du tableau en partant du point d'arrêt de la boucle précédente
        {
            if(retour[l] === retour[m]) //Comparaison de deux valeurs
            {
                retour.splice(l,1); //Si deux valeurs sont les mêmes alors on supprime 
            }
        }
    }
    
	console.log(retour); //Affiche le tableau de retour dans la console
	return retour;//Retourner le tableau avec les mots clés
}
