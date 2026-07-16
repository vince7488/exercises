# Treehouse Newsletter Signup

This project is for the second phase of the job application challenge for the Web Developer role at Treehousemarketing.com.

I could use React, Vue, or Angular for this challenge, but as I could see that Treehousemarketing.com is actually in Vue2, I will use Vue.
(but ver. 3). Challenges are much better if you put in on their game.

They used Foundation CSS though, I used Vuetify.

## Challenge Brief

### Treehouse Newsletter Signup

Create a single page application using a modern JavaScript framework (Angular, React, Vue) that can view, add, and remove users from a
newsletter subscription list.

The application should:

- Have one page to display a list of all current submissions, with the newest users first. Users should be able to be deleted from the
  list.
- Have another page with a form to add a user, with a name and an email field. These fields should be required for the form to submit.
- Be able to navigate between pages.
- Use a current version of your framework of choice under long-term support.

**A REST API is provided (private, in PDF brief, plus key)**

- `GET /newsletter` to retrieve a list of users already signed up.
- `DELETE /newsletter/{id}` to delete a user with the specified `{id}`.
- `POST /newsletter` to create a new user, with the following JSON body schema.

### Notes to the Dev Team

- Did you know your Green isn't WCAG compliant at smaller texts? #599240 and white have a contrast ratio of roughly 3.74:1. That passes
  for large text (24px) but fails WCAG AA for ordinary text. The 'black' on your site, #473F3D, against that green is only about 2.74:1.
- I did what's best: the green will not be used for texts. Only background. Never with any small elements.
- When elements are green that requires a text label (e.g., buttons), it will be white text, and min of 24px font-size, so it passes at
  least WCAG AA standards.
