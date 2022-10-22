-- SCHEMA CREATION ==================================================

DROP SCHEMA IF EXISTS TP4_Livraison CASCADE;
CREATE SCHEMA TP4_Livraison;

CREATE TABLE IF NOT EXISTS TP4_Livraison.Client (
    idClient SMALLINT NOT NULL,
    nomClient VARCHAR(255) NOT NULL,
    prenomClient VARCHAR(255) NOT NULL,
    adresseCourrielClient VARCHAR(255) NOT NULL,
    rueClient VARCHAR(255) NOT NULL,
    villeClient VARCHAR(255) NOT NULL,
    codePostalClient VARCHAR(255) NOT NULL,

    PRIMARY KEY (idClient)
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.Telephone (
    numeroTelephone VARCHAR(20) NOT NULL,
    idClient SMALLINT NOT NULL,
    
    PRIMARY KEY (numeroTelephone, idClient),
    FOREIGN KEY (idClient) REFERENCES TP4_Livraison.Client
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.Fournisseur (
    idFournisseur SMALLINT NOT NULL PRIMARY KEY,
    nomFournisseur VARCHAR(255) NOT NULL,
    adresseFournisseur VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.PlanRepas (
    idPlanRepas SMALLINT NOT NULL PRIMARY KEY,
    categorie VARCHAR(255) NOT NULL,
    frequence INT NOT NULL,
    nbrPersonnes INT NOT NULL,
    nbrCalories INT NOT NULL,
    prix DECIMAL(5, 2) NOT NULL,
    idFournisseur SMALLINT NOT NULL,

    FOREIGN KEY (idFournisseur) REFERENCES TP4_Livraison.Fournisseur ON UPDATE CASCADE ON DELETE CASCADE,
    
    CONSTRAINT frequence CHECK (frequence > 0),
    CONSTRAINT nbrPersonnes CHECK (nbrPersonnes > 0),
    CONSTRAINT nbrCalories CHECK (nbrCalories > 0),
    CONSTRAINT prix CHECK (prix > 0)
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.Abonner (
    idClient SMALLINT NOT NULL,
    idPlan SMALLINT NOT NULL,
    duree INT NOT NULL,

    PRIMARY KEY (idClient, idPlan),
    FOREIGN KEY (idClient) REFERENCES TP4_Livraison.Client ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (idPlan) REFERENCES TP4_Livraison.PlanRepas ON UPDATE CASCADE ON DELETE CASCADE
);

-- CREATE TABLE IF NOT EXISTS TP4_Livraison.Famille (
--     PRIMARY KEY (idPlanRepas)
-- );

-- CREATE TABLE IF NOT EXISTS TP4_Livraison.Vegetarien (
--     idPlanRepas SMALLINT NOT NULL PRIMARY KEY,
--     typeDeRepas VARCHAR(255) NOT NULL,

--     FOREIGN KEY (idPlanRepas) REFERENCES PlanRepas ON UPDATE CASCADE ON DELETE CASCADE,
-- );

CREATE TABLE IF NOT EXISTS TP4_Livraison.KitRepas (
    idKitRepas SMALLINT NOT NULL PRIMARY KEY,
    "description" VARCHAR(255) NOT NULL,
    idPlanRepas SMALLINT NOT NULL, 

    FOREIGN KEY (idPlanRepas) REFERENCES TP4_Livraison.PlanRepas ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.Image (
    idImage SMALLINT NOT NULL PRIMARY KEY,
    donnes VARCHAR(2048) NOT NULL,
    idKitRepas SMALLINT NOT NULL,

    FOREIGN KEY (idKitRepas) REFERENCES TP4_Livraison.KitRepas ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.Ingredient (
    idIngredient SMALLINT NOT NULL PRIMARY KEY,
    nomIngredient VARCHAR(255) NOT NULL,
    paysIngredient VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.Contenir (
    idKitRepas SMALLINT NOT NULL,
    idIngredient SMALLINT NOT NULL,
    
    PRIMARY KEY (idKitRepas, idIngredient),
    FOREIGN KEY (idKitRepas) REFERENCES TP4_Livraison.KitRepas ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (idIngredient) REFERENCES TP4_Livraison.Ingredient ON UPDATE CASCADE ON DELETE CASCADE
);

-- CREATE TABLE IF NOT EXISTS TP4_Livraison.Etape (
--     idKitRepas SMALLINT NOT NULL PRIMARY KEY,
--     descriptionEtape VARCHAR(255) NOT NULL,
--     dureeEtape SMALLINT NOT NULL,
--     idKitRepasPartieDe SMALLINT,
    
--     FOREIGN KEY (idKitRepas) REFERENCES KitRepas ON UPDATE CASCADE ON DELETE CASCADE,
-- )



-- POPULATE ==================================================

INSERT INTO TP4_Livraison.Client VALUES (1, 'St-Cyr', 'Charles', 'charles@email.com', 'Rue Edouard-Monpetit', 'Montréal', 'A1A 1A1');
INSERT INTO TP4_Livraison.Client VALUES (2, 'Brosseau', 'Mathilde', 'mathilde@email.com', 'Rue de Marseille', 'Montréal', 'B2B 2B2');
INSERT INTO TP4_Livraison.Client VALUES (3, 'Noël', 'Père', 'papa@email.com', 'Rue Principale', 'Pôle Nord', 'H0H 0H0');

INSERT INTO TP4_Livraison.Telephone VALUES ('(000) 111-2222', 1);
INSERT INTO TP4_Livraison.Telephone VALUES ('(333) 444-5555', 2);
INSERT INTO TP4_Livraison.Telephone VALUES ('(605) 313-4000', 3);

INSERT INTO TP4_Livraison.Fournisseur VALUES (1, 'IGA Nourriture Inc', 'Rue de IGA');
INSERT INTO TP4_Livraison.Fournisseur VALUES (2, 'RICARDO', 'Rue de Richard');

INSERT INTO TP4_Livraison.PlanRepas VALUES (1, 'végétarien', 2, 2, 150, 22.00, 1);
INSERT INTO TP4_Livraison.PlanRepas VALUES (2, 'indien', 1, 4, 400, 44.50, 1);
INSERT INTO TP4_Livraison.PlanRepas VALUES (3, 'japonais', 1, 4, 350, 52.50, 2);
INSERT INTO TP4_Livraison.PlanRepas VALUES (4, 'français', 2, 2, 350, 26.25, 2);
INSERT INTO TP4_Livraison.PlanRepas VALUES (5, 'cetogène', 1, 3, 80, 17.75, 2);

INSERT INTO TP4_Livraison.Abonner VALUES (1, 2, 4);
INSERT INTO TP4_Livraison.Abonner VALUES (2, 1, 2);
INSERT INTO TP4_Livraison.Abonner VALUES (3, 4, 51); -- juste 51 semaines parce qu'à Noël il mange des biscuits

INSERT INTO TP4_Livraison.KitRepas VALUES (1, 'Tofu général tao', 1); 
INSERT INTO TP4_Livraison.KitRepas VALUES (2, 'Tacos végé au fromage fondant', 1);
INSERT INTO TP4_Livraison.KitRepas VALUES (3, 'Poulet au beurre', 2);
INSERT INTO TP4_Livraison.KitRepas VALUES (4, 'Brochette de porc Yakiton', 3);
INSERT INTO TP4_Livraison.KitRepas VALUES (5, 'Bavette au beurre à léchalotte française', 4);
INSERT INTO TP4_Livraison.KitRepas VALUES (6, 'Filets de turbot meunière', 4);

INSERT INTO TP4_Livraison.Image VALUES (1, 'https://images.ricardocuisine.com/services/recipes/5675.jpg', 1);
INSERT INTO TP4_Livraison.Image VALUES (2, 'https://images.ricardocuisine.com/services/recipes/8049.jpg', 2);
INSERT INTO TP4_Livraison.Image VALUES (3, 'https://images.ricardocuisine.com/services/recipes/8504154235512b996db487.jpg', 3);
INSERT INTO TP4_Livraison.Image VALUES (4, 'https://images.ricardocuisine.com/services/recipes/5788.jpg', 4);
INSERT INTO TP4_Livraison.Image VALUES (5, 'https://images.ricardocuisine.com/services/recipes/8914.jpg', 5);
INSERT INTO TP4_Livraison.Image VALUES (6, 'https://images.ricardocuisine.com/services/recipes/8286-portrait.jpg', 6);

INSERT INTO TP4_Livraison.Ingredient VALUES(1, 'Tofu ferme', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(2, 'Gingembre', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(3, 'Gousse dail', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(4, 'Poivrons verts', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(5, 'Tortillas', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(6, 'Cheddar doux', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(7, 'Crème sure', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(8, 'Jalapeño', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(9, 'Quariters de lime', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(10, 'Haut de cuisses de poulet', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(11, 'Marinade au yogourt épicé', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(12, 'Sauce au beurre', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(13, 'Filet de porc', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(14, 'Oignons verts', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(15, 'Tranches de flanc de porc', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(16, 'Graines de sésame', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(17, 'Lime', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(18, 'Échalote française', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(19, 'Bavette de boeuf', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(20, 'Beurre', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(21, 'Filets de turbot', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(22, 'Farine tout usage', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(23, 'Beurre', 'N/A');
INSERT INTO TP4_Livraison.Ingredient VALUES(24, 'Citron', 'N/A');

INSERT INTO TP4_Livraison.Contenir VALUES(1, 1);
INSERT INTO TP4_Livraison.Contenir VALUES(1, 2);
INSERT INTO TP4_Livraison.Contenir VALUES(1, 3);
INSERT INTO TP4_Livraison.Contenir VALUES(2, 4);
INSERT INTO TP4_Livraison.Contenir VALUES(2, 5);
INSERT INTO TP4_Livraison.Contenir VALUES(2, 6);
INSERT INTO TP4_Livraison.Contenir VALUES(2, 7);
INSERT INTO TP4_Livraison.Contenir VALUES(2, 8);
INSERT INTO TP4_Livraison.Contenir VALUES(2, 9);
INSERT INTO TP4_Livraison.Contenir VALUES(3, 10);
INSERT INTO TP4_Livraison.Contenir VALUES(3, 11);
INSERT INTO TP4_Livraison.Contenir VALUES(3, 12);
INSERT INTO TP4_Livraison.Contenir VALUES(4, 13);
INSERT INTO TP4_Livraison.Contenir VALUES(4, 14);
INSERT INTO TP4_Livraison.Contenir VALUES(4, 15);
INSERT INTO TP4_Livraison.Contenir VALUES(4, 16);
INSERT INTO TP4_Livraison.Contenir VALUES(4, 17);
INSERT INTO TP4_Livraison.Contenir VALUES(5, 18);
INSERT INTO TP4_Livraison.Contenir VALUES(5, 19);
INSERT INTO TP4_Livraison.Contenir VALUES(5, 20);
INSERT INTO TP4_Livraison.Contenir VALUES(6, 21);
INSERT INTO TP4_Livraison.Contenir VALUES(6, 22);
INSERT INTO TP4_Livraison.Contenir VALUES(6, 23);
INSERT INTO TP4_Livraison.Contenir VALUES(6, 24);