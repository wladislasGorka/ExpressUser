SELECT * FROM annonces LEFT JOIN paniers ON annonces.id=paniers.annonceId WHERE id=2 AND paniers.userId=10;