* See [example milestone #01](https://github.com/nyu-csci-ua-0480-008-spring-2017/final-project-example)
* Add images to your repository and link / display with markdown


The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.

# Fantasy NBA Management 

## Overview

Fantasy NBA Management is a web application created for NBA fans. Users can create their own imaginary NBA team. First users will have to register their account. After they login, users can create their team and add players into the team. 

Users can decide on the attributes of both the team and the players. For example, users can decide on the team name, location of the team, and more. Users can also add/delete playyers. 


## Data Model

The application will store Users, Teams and Players

* A User can have one team with multiple players
* Each Team can have multiple players (by embedding)

An Example User:

```javascript
{
  username: "hsump1996",
  hash: // a password hash,
  Team: // a reference to a Team object
}
```

An Example Team:

```javascript
{
  team_name: "Los Angeles Lakers",
  arena_stadium: "Staples Center",
  location: "Los Angeles, California",
  founded: 1947
}
```

An Example Team with Embedded Players:

```javascript
{
  team_name: // a reference to a User object
  arena_stadium: "Breakfast foods",
  players: [
    { name: "Lebron James", born: 12/30/1984, nationality: "USA", position: "Small Forward", height: "6 ft 9 in", weight: "113 kg"},
    { name: "Carmelo Anthony", born: 02/10/1982, nationality: "USA", position: "Center", height: "6 ft 9 in", weight: "120 kg"},
  ],
  founded: 1947
}
```


An Example Player:

```javascript
{
  name: "Lebron James",
  born: 12/30/1984,
  nationality: "USA",
  position: "Small Forward",
  height: "6 ft 9 in",
  weight: "113 kg",
}
```


## [Link to Commented First Draft Schema](db.js) 

(___TODO__: create a first draft of your Schemas in db.js and link to it_)

## Wireframes

(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

(___TODO__: draw out a site map that shows how pages are related to each other_)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

(___TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://www.mongodb.com/download-center?jmp=docs&_ga=1.47552679.1838903181.1489282706#previous)_)

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new grocery list
4. as a user, I can view all of the grocery lists I've created in a single list
5. as a user, I can add items to an existing grocery list
6. as a user, I can cross off items in an existing grocery list

## Research Topics

(___TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed_)

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit_)


## [Link to Initial Main Project File](app.js) 

(___TODO__: create a skeleton Express application with a package.json, app.js, views folder, etc. ... and link to your initial app.js_)

## Annotations / References Used

(___TODO__: list any tutorials/references/etc. that you've based your code off of_)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)