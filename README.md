
# Ecommerce Backend

Sample Project using Node as Backend for Ecommerce websute

## Folder Structure
```
src/                        project source code 
|- model/                   app model
|- config/                  configuration related to database, authentication, external api keys etc 
|- controller/              app controller
|- routes/                  app route
|- index.js                 app index
```


#Deployment
git push --set-upstream origin master


#Heroku cli
heroku login

heroku logs --tail --app ecommerce-be

heroku restart --app ecommerce-be


#API response
```
{
    response: '',
    message: ''
}
```


#Database Schema


```
/user

userSchema
- username
- password
- email
- userType ['admin', 'moderator', 'customer', 'seller']
```



## TODO

Business Requirements

ERD