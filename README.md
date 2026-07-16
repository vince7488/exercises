# exercises
These are personal exercises, challenges, and tests.

## Treehouse Marketing (Contractor Nation)

(2026 - JUL - 15)

### Challenge Brief: Treehouse reporting (SQL)

The UML diagram below shows some of the tables and relationships we deal with on a daily
basis. We have multiple companies as clients. Each of those companies can have multiple
sites, and each of those sites can have multiple domains. Sites belong to a single association.
A domain, site, or company is considered active if it’s not deleted or on hold, and doesn’t belong
to anything that is deleted or on hold.

![UML diagram](image.png)

_Please complete the following exercises and send back the queries used to generate
each list._

1. Provide a list (association name, company name, domain) of all active primary
supercharged domains belonging to the Basement Systems, Inc. association.
1. Provide a list (association name, company name, site name) of all active sites that do
not have a domain.
1. Provide a list (site id, site name) of distinct active sites who have one or more domain,
and whose domains are all deleted.

### Digging beyond the brief

- Schema has four tables: `companies` `sites` `domains` `associations`
- A company can own many sites. A site belongs to one company and one association. A site can have many domains.
- I think I'll be using inner join a lot.
- But that's not the hard part. It's actually correctly applying the inherited def. of "`active`".

```text
company
   └── site
         └── domain

association
   └── site
```
- instructions say that a domain, site, or company is active when it: Is not deleted. Is not on hold. Does not belong to something deleted or on hold.

### Answers

The answers are in files:
- `exer-01.sql`
- `exer-02.sql`
- and `exer-03.sql`

## Newsletter Signup and Subscriber Management DevChallenge

The demonstration for the Newsletter Signup and Subscriber list is on this directory of the branch: [**/treehouse-newslettersignup**](https://github.com/vince7488/exercises/tree/treehouse-marketing-cn/treehouse-newslettersignup)

- You can install locally and run `yarn dev`
- The brief was to use any of the three: React, Angular, Vue - I chose Vue3. (I think your site is in Vue2?)
- The site mimics the treehouse marketing theme.
- I added extras.

### Screens

<img width="500" height="auto" alt="image 1" src="https://github.com/user-attachments/assets/243b8cd0-205e-4981-908e-4cf4e41b9c5c" />

---

<img width="500" height="auto" alt="image 2" src="https://github.com/user-attachments/assets/24753ab4-feda-4cce-9291-9905545e8b81" />

---

<img width="500" height="auto" alt="image 3" src="https://github.com/user-attachments/assets/35445390-0870-42d7-b135-5b143c882efd" />

---

<img width="500" height="auto" alt="image 4" src="https://github.com/user-attachments/assets/b586edf8-e6a8-4656-870f-39cf0e0706ff" />

---

<img width="500" height="auto" alt="image 5" src="https://github.com/user-attachments/assets/5eb88db2-5c2b-4d66-af79-224ebc1f08b6" />

---

<img width="500" height="auto" alt="image 6" src="https://github.com/user-attachments/assets/b2d5cd18-3338-4ada-8b91-ca30bef48d68" />

---

<img width="auto" height="500" alt="image 7" src="https://github.com/user-attachments/assets/ae506dfa-8c57-47f5-88b7-7dba5642c85e" />
