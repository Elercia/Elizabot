/*Fonction recherche mot clé et gérage de la casse*/
function rechercher_mot_cle(saisie_utilisateur)
{
	var minuscule;
	var espace = " ";
	var final = [];
	var tab_split;
	var i;
	var j;	
	
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
	for(i = 0;i <= tab_split.length;i++)
	{
	    for(j = 0;j <= .length;j++)
	    {
	        if(tab_split[i] === [j])
	        {
	            final.push(tab_split[i]);
	        }
	    }
	}
	
	//retourner le tableau avec les mots clés
	return final;
	console.log(final);
}
