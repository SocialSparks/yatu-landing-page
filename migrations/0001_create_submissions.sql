-- Le tampon durable entre le navigateur et Google Apps Script.
--
-- Avant cette table, une soumission ne vivait que le temps d'un fetch depuis le
-- navigateur du visiteur : un bloqueur de pub, un DNS scolaire ou le verrou de
-- 20 s du script suffisaient a la perdre sans trace. Ici, la ligne est ecrite
-- avant toute tentative d'envoi, et rien ne l'efface tant que la feuille n'a pas
-- accuse reception.
--
-- La Google Sheet reste le tableau de bord ; cette table est le filet.

CREATE TABLE IF NOT EXISTS submissions (
  -- UUID genere par le navigateur : c'est lui qui rend un renvoi inoffensif,
  -- du double-clic du visiteur jusqu'au rejeu par le drain.
  id              TEXT PRIMARY KEY,
  kind            TEXT NOT NULL,                    -- waitlist | bde-demo | profil
  status          TEXT NOT NULL DEFAULT 'pending',  -- pending | sent | spam | dead
  -- Le JSON exact qui part vers le script. Stocke tel quel : le drain le
  -- retransmet sans le relire, ce qui garde le handler cron sous sa limite CPU.
  payload         TEXT NOT NULL,
  -- Colonnes promues : celles qu'on veut pouvoir lire d'un coup d'oeil en SQL.
  email           TEXT,
  source          TEXT,
  page            TEXT,
  attempts        INTEGER NOT NULL DEFAULT 0,
  next_attempt_at INTEGER NOT NULL DEFAULT 0,       -- epoch ms ; 0 = eligible tout de suite
  last_error      TEXT,
  created_at      INTEGER NOT NULL,                 -- epoch ms, horodate par le Worker
  updated_at      INTEGER NOT NULL,
  -- SHA-256(IP + sel) : de quoi trier un abus sans conserver d'adresse IP.
  ip_hash         TEXT,
  ua              TEXT
);

-- L'unique requete chaude du drain.
CREATE INDEX IF NOT EXISTS idx_submissions_drain
  ON submissions (status, next_attempt_at);

-- Purge de retention et endpoint de sante.
CREATE INDEX IF NOT EXISTS idx_submissions_created
  ON submissions (created_at);

-- Retrouver quelqu'un qui affirme s'etre inscrit.
CREATE INDEX IF NOT EXISTS idx_submissions_email
  ON submissions (email);
