-- 4.1 Affichez les numéros (numéroclient) et les noms (nomclient) des clients 
-- qui ont commandé un repas avec un prix compris entre 20 dollars et 40 dollars

SELECT DISTINCT c.idClient, c.nomClient
FROM TP4_Livraison.Client c
INNER JOIN TP4_Livraison.Abonner abo 
    ON c.idClient = abo.idClient
INNER JOIN TP4_Livraison.PlanRepas plan 
    ON abo.idPlan = plan.idplanrepas
WHERE plan.prix BETWEEN 20 AND 40;

-- 4.2 Afficher les numéros des plans repas (numéroplan) qui ne proviennent pas  
-- du fournisseur au nom de 'QC Transport'

SELECT plan.idplanrepas
FROM TP4_Livraison.PlanRepas plan
LEFT JOIN TP4_Livraison.Fournisseur fourn 
    ON plan.idfournisseur = fourn.idfournisseur
WHERE fourn.nomFournisseur <> 'QC Transport';

-- 4.3 Affichez la liste des numéros des plans Famille (numéroplan) dont la 
-- catégorie du plan repas correspond à 'cétogène'.

SELECT DISTINCT fam.idplanrepas
FROM TP4_Livraison.Famille fam
INNER JOIN TP4_Livraison.PlanRepas plan
    ON plan.idplanrepas = fam.idfournisseurs
WHERE plan.categorie = 'cétogène';

-- 4.4 Affichez le nombre de fournisseurs n’ayant pas de nom dans leur 
-- dossier (la valeur de nomfournisseur est NULL).

SELECT COUNT(*)
FROM TP4_Livraison.Fournisseur f
WHERE f.nomfournisseur IS NULL;

-- 4.5 Affichez les noms des fournisseurs (nomfournisseur) ayant fait des 
-- livraisons de plans repas dont le montant est supérieur aux livraisons 
-- faites par le fournisseur dont le nom est 'AB Transport'

WITH totallivraisonsfournisseurs AS (
    SELECT fourn.idfournisseur, fourn.nomfournisseur, (CASE WHEN (SUM(plan.prix) IS NOT NULL) THEN SUM(plan.prix) ELSE 0 END) as totallivraisons 
    FROM TP4_Livraison.PlanRepas plan
    FULL OUTER JOIN TP4_Livraison.Fournisseur fourn
        ON plan.idfournisseur = fourn.idfournisseur
	  GROUP BY fourn.idfournisseur
)

SELECT nomfournisseur
FROM totallivraisonsfournisseurs
WHERE totallivraisons > (
	SELECT totallivraisons 
	FROM totallivraisonsfournisseurs 
	WHERE nomfournisseur = 'AB Transport'
);

-- 4.6  Affichez les noms des fournisseurs (nomfournisseur), les adresses 
-- (adressefournisseur) et le montant total des prix des livraisons de 
-- plans repas des fournisseurs ayant les deux plus larges montants de 
-- livraison sur la plateforme.

SELECT fourn.nomFournisseur, fourn.adresseFournisseur, SUM(plan.prix) as totallivraisons 
FROM TP4_Livraison.PlanRepas plan
LEFT JOIN TP4_Livraison.Fournisseur fourn
    ON plan.idfournisseur = fourn.idfournisseur
GROUP BY fourn.idfournisseur
ORDER BY totalLivraisons DESC
LIMIT 2;

-- 4.7 Affichez le nombre de kit repas qui n’ont jamais été réservés chez les fournisseurs.

WITH plansNonCommandes AS (
	SELECT plan.idplanrepas
	FROM TP4_Livraison.KitRepas kit
	FULL OUTER JOIN TP4_Livraison.PlanRepas plan
		ON plan.idplanrepas = kit.idplanrepas
	EXCEPT (
		SELECT abo.idPlan
		FROM TP4_Livraison.abonner abo
	)
)

SELECT COUNT(*) FROM plansNonCommandes;

-- 4.8 Affichez les numéros (numéroclient), les noms (nomclient) et les prénoms 
-- (prénomclient) des clients dont le prénom ne commence pas par une voyelle 
-- (en majuscule ou en minuscule) et qu’ils habitent (villeclient) à la même
-- adresse (adressefournisseur) que le fournisseur 'Benjamin'. Ordonnez ces 
-- clients alphabétiquement selon le nom.

SELECT c.idclient, c.nomclient, c.prenomclient
FROM TP4_Livraison.client c
WHERE (
    SELECT f.adressefournisseur
    FROM TP4_Livraison.Fournisseur f
    WHERE f.nomFournisseur = 'Benjamin'
) LIKE CONCAT('%', c.villeclient, '%')
AND c.prenomclient ~ '^[^aeiouyAEIOUY].*$'
ORDER BY LOWER(c.nomclient);

-- 4.9 Affichez le pays des ingrédients (paysingrédient) et le nombre d’ingrédients 
-- par pays dont le paysingrédient ne contient pas la lettre g à la troisième position 
-- de la fin; triés par ordre décroissant selon le pays de l’ingrédient (paysingrédient) 

SELECT ing.paysingredient, COUNT(*) as nbIngredients
FROM TP4_Livraison.Ingredient ing
WHERE ing.paysIngredient NOT LIKE '%g__'
GROUP BY ing.paysIngredient
ORDER BY LOWER(ing.paysIngredient) DESC;

-- 4.10 Créez une vue 'V_fournisseur' contenant la catégorie du plan repas 'V_catégorie', 
-- l’adresse du fournisseur 'V_adresse' et le total des prix de tous les plans repas 
-- desservis par ce fournisseur 'V_tot'. Cette vue doit uniquement contenir les 
-- fournisseurs dont V_tot est supérieur à 12 500$ et dont le nom de la catégorie du 
-- plan repas contient la lettre 'e' et la lettre 'o' à la troisième position de la fin; 
-- triés par ordre croissant selon le nom de la catégorie du plan repas et par ordre 
-- décroissant selon 'V_tot'. Finalement, afficher le résultat de cette vue. 

CREATE VIEW V_fournisseur AS 
SELECT plan.categorie as "V_categorie", fourn.adresseFournisseur as "V_adresse", SUM(plan.prix) as "V_tot"
FROM TP4_Livraison.Fournisseur fourn
FULL OUTER JOIN TP4_Livraison.PlanRepas plan
    ON fourn.idfournisseur = plan.idfournisseur
WHERE plan.categorie LIKE '%e%'
AND plan.categorie LIKE '%o__'
GROUP BY plan.categorie, fourn.adresseFournisseur
HAVING SUM(plan.prix) > 12500  
ORDER BY LOWER(plan.categorie) ASC, SUM(plan.prix) DESC;

SELECT * FROM V_fournisseur;
