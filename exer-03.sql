SELECT
    s.id AS site_id,
    s.name AS site_name
FROM sites AS s
INNER JOIN companies AS c
    ON c.id = s.company
-- we're looking for undeleted domains right? so I just need to make sure we filter it out in:
WHERE s.is_deleted = 0
  AND c.is_deleted = 0
  AND c.is_on_hold = 0
-- confirm the domain exists...
  AND EXISTS (
      SELECT 1
      FROM domains AS d
      WHERE d.site = s.id
  )
-- and rule out any site with active domain
  AND NOT EXISTS (
      SELECT 1
      FROM domains AS d
      WHERE d.site = s.id
        AND d.is_deleted = 0
  )
ORDER BY
    s.id;