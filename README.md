# E-commerce task

### Task description
This task is to create a simple e-commerce website using React.

# keynotes
## Tools
- React Query
- React Router
- zod
- zustand

## Components library
- shadcn ui
- Signup

## Notes
- I have combined the react query and react router hooks with shadcn ui. and make reusable components. such as TextField, SelectField. this will allow me to reuse the components in other pages without having to write form logic again.
- Email is used as access key for the profile. generally this should be token from server.
- User will keep logged in even if they close the browser.

## Features

### Signup

### Login

### Home page
- Filtering logic
  User can filter by category, brand, price range.
  when user selects a category, the query will be invalidated and the products will be fetched again.

## Error handling

- First Step: Using Zod to check for user input.
- Second Step: If there is an error related to field I pollute the form with the error message. for example when user enters already existing email, I will show the error message.
- Third Step: For general errors there Is toast message set by react-form. for example when server return 500.

- In Product listing page, I there is error if server does not respond allowing the user to retry the request.

## Constraints

- server json does not allow AND statement. So I couldn't fetch multiple brands or categories.

## Future work
- Sorting product by price
- Sorting product by rating
- Displaying product according to user preference
