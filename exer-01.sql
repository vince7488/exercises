-- basically the three columns requested: Association name Company name Domain
SELECT
    a.name AS association_name,
    c.name AS company_name,
    d.domain
-- I started with domains because the result is one row per qualifying domain.
FROM domains AS d
INNER JOIN sites AS s
    ON s.id = d.site
INNER JOIN companies AS c
    ON c.id = s.company
INNER JOIN associations AS a
    ON a.id = s.association
WHERE a.name = 'Basement Systems, Inc.'
  AND d.is_primary = 1
  AND d.is_deleted = 0
  AND s.is_supercharged = 1
  AND s.is_deleted = 0
  AND c.is_deleted = 0
  AND c.is_on_hold = 0
ORDER BY
    c.name,
    d.domain;
-- grabbed s.id from domains.site, I believe that was necessary b/c two relevant properties are stored on the site (not domain) --> s.is_supercharged, s.is_deleted
-- then connected the site to it's company `c.id = s.company` in order for us to access --> is_deleted, is_on_hold
-- then connect site to it's assoc `a.id = s.association`
-- Now you can look for "WHERE a.name = 'Basement Systems, Inc.'" and the rules... line 15-20. 