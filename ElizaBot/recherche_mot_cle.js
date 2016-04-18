/*Fonction recevant le message de l'utilisateur, puis gérant les caractères spéciaux et met le tout en miniscule et renvoie les mots clés*/
ElizaBot.prototype.recherche_mot_cle =  function(saisie_utilisateur)
{
	var minuscule;
	var espace = " ";
	var retour = [];
	var tab_split;
	
	//On enlève les signes de ponctuation et les accents pour ne pas bloquer un mot clé
	saisie_utilisateur = saisie_utilisateur.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ");	
	saisie_utilisateur = saisie_utilisateur.replace(/[âÄÆààáãäå]/g,"a");
	saisie_utilisateur = saisie_utilisateur.replace(/[Çç]/g,"c");
	saisie_utilisateur = saisie_utilisateur.replace(/[èéêëÊ]/g,"e");
	saisie_utilisateur = saisie_utilisateur.replace(/[îÌÍÎÏìíï]/g,"i");
	saisie_utilisateur = saisie_utilisateur.replace(/[ñ]/g,"n");
	saisie_utilisateur = saisie_utilisateur.replace(/[ôÒÓÔÕÖØðòóõö]/g,"o");
	saisie_utilisateur = saisie_utilisateur.replace(/[ûùÙÚÛÜùúûü]/g,"u");
	saisie_utilisateur = saisie_utilisateur.replace(/[Ýýÿ]/g,"y");
	
	
	//On met l'ensemble de la phrase en miniscule pour être en concordance avec la base
	minuscule = saisie_utilisateur.toLowerCase();
	
	//Mise en forme de la chaîne de caractère en tableau / mots
	tab_split = minuscule.split(espace);
	
	//Parcourir les mots du tableau et rechercher si = tableau mot clé
	for(var i = 0; i < tab_split.length; i++)
	{
	    for(var j = 0; j < this.ensemble_rep.length; j++)
	    {
	        for(var k in (this.ensemble_rep[j]).mots_cle)
	        {
	            if((tab_split[i]) === (this.ensemble_rep[j].mots_cle[k]))
	            {	
	                retour.push(tab_split[i]);

	            }
	        }
	    }
	}
	var tmp;
	for(var l = 0; l < retour.length; l++)
	{
	    tmp = retour[l];
	    for(var m = (l+1); m < retour.length; m++)
	    {
	        if(tmp === retour[m])
	        {
	            retour.splice(m, 1);
	        }
	    }
	}
	console.log(retour);
	
	//Retourner le tableau avec les mots clés
	return retour;
}
