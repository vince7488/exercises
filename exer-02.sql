SELECT
    a.name AS association_name,
    c.name AS company_name,
    s.name AS site_name
-- I want to start from sites, joins each site to its company and association
FROM sites AS s
INNER JOIN companies AS c
    ON c.id = s.company
INNER JOIN associations AS a
    ON a.id = s.association
-- then keeps only sites where:
WHERE s.is_deleted = 0
  AND c.is_deleted = 0
  AND c.is_on_hold = 0
-- excludes any site that has a matching row in domains
  AND NOT EXISTS (
      SELECT 1
      FROM domains AS d
      WHERE d.site = s.id
  )
ORDER BY
    a.name,
    c.name,
    s.name;