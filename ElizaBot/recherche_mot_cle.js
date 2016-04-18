/*Fonction recherche mot clé et gérage de la casse*/
ElizaBot.prototype.recherche_mot_cle =  function(saisie_utilisateur)
{
	saisie_utilisateur = "clef1, clef11, clef2";
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
	for(var i = 0; i <= tab_split.length; i++)
	{
	    for(var j = 0; j <= this.ensemble_rep.length; j++)
	    {
	        for(var k = 0; k <= this.ensemble_rep[j].mots_cle.length; k++)
	        {
	            if(tab_split[i] === this.ensemble_rep[j].mots_cle[k])
	            {
	                retour.push(tab_split[i]);
	            }
	        }
	    }
	}
	
	//retourner le tableau avec les mots clés
	return retour;
	console.log(retour);
}
