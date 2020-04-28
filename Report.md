<h1>MakeUpForMe</h1>
<h2>2560 Web Technologies and Standards - Final Project Report</h2>
<p>Casey Hirth (KCH39), Jaime Fawcett (JAF157), Amber Torrise (AAT38), Jose Zindia (JDZ18)</p>

<h2>Introduction</h2>
<p>
This project was a collaboration between Jaime Fawcett, Casey Hirth, Amber Torrise, and Jose Zindia. Specific contributions are described in the 
contributions section. 
  
Together, we created MakeUpForMe, a social media sharing site where users can create profiles, post pictures of their make up ‘looks’ with associated products, 
and view other users’ make-up looks to find inspiration. The project provides personalization through the use of tags and the ability to follow other users,
which updates the user's personal feed to populate with the looks of those individual's they are following. Users are also able to update their own profiles with looks that they add
and update these looks.

</p>

<h2>Objectives</h2>

<h3>Project Objectives</h3>

For project objectives, we wanted to accomplish the following:

- Develop a website with user and admin capabilities that accessed a MongoDB database;
- Develop some form of personalization/recommendation system through the use of 'followers' and a feed;
- Develop an application that would allows users to find new make up products to achieve looks they like and view more information on those products;
- Develop profiles and feed that could dynamically update after CRUD functions; and
- Create an aesthetically pleasing and fun to use web application.

<h3>Learning Objectives</h3>

- Learn how to develop an interface that could implement CRUD capabilities with the database (via forms/buttons, etc.); and
- Learn how to delineate and separate project components in an effective way.

<h3>Additional Features</h3>
Additional features we incorporated included:

- Using data from an external API [https://makeup-api.herokuapp.com](https://makeup-api.herokuapp.com). We used a static JSON
  file from this project site and incorporatd it into our own personal project as a JSON file ("products.json"). However, we use
  hyperlinks that reference URLs for this API so that users can view more information about products used in users' looks. This is
  a key feature we wanted to implement.
- Created a tailored feed based on 'followers' so that users had a customized feed based on who they follow. This builds on CRUD operations.
- Use of IP address web service to get IP address of users so that we could access location information to populate the user's profile.

<h2>Contributions</h2>
<h3>Casey Hirth</h3>
* EJS views for viewing other looks (feed);
* Middleware for viewing other looks/profiles (via feed) and following other profiles;
* Session management and login/sign-up capabilities; 
* Error handling;
* Data object design/representation; and
* Report/presentation.

<h3>Jaime Fawcett</h3>
* EJS views for User side (creating, viewing, updating, deleting looks/personal profile);
* Middleware for User Side (creating, viewing, updating, deleting looks/personal profile);
* CSS/bootstrap styling of entire application;
* Data object design/representation; and
* Report/presentation.

<h3>Amber Torrise</h3>
* Initial concept, functionalities, and wireframe/design;
* EJS views for viewing other looks (feed)-secondary;
* EJS views of Admin side (viewing, updating, deleting users/profiles/looks);
* Middleware of Admin side (viewing, updating, deleting users/profiles/looks);
* Error handling;
* Middleware for viewing other looks/profiles (via feed) and following other profiles-secondary;
* Data object design/representation; and
* Report/presentation.

<h3>Jose Zindia</h3>
* EJS views of Admin side (viewing, updating, deleting users/profiles/looks);
* Middleware of Admin side (viewing, updating, deleting users/profiles/looks);
* Session management and login/sign-up capabilities; 
* Data object design/respresentation; and
* Report/presentation.

<h2>Technical Architecture</h2>

<h3>Model-View-Controller</h3>
For our data model, we used Mongoose and MongoDB Atlas to house and access our data. For our view, we used EJS to render our webpages. 
For our controller, we used Node.js and Express to develop endpoints and create our application programming interface (API) to send HTTP requests to the 
database.

We did not use any frameworks like React or Angular.

<h3>Other Technologies</h3>
As noted above, we used an additional API, [https://makeup-api.herokuapp.com](https://makeup-api.herokuapp.com).

We also used the following key technologies (see also, 'package.json' for a full list of dependencies):

- Passport - Local: We created our own local authorization using passport-local to authenticate user login and signup.
- Bcrypt: We used this to encrypt passwords that users created.
- Express-Session and Sessions: Used to maintain session management by storing user information.
- Mongoose-Role: A plugin used to manage user access to aspects of the site (admin vs user).
- Connect-Ensure-Login: Used to facilitate login authentication.
- Express-IP and IPStack: Allows the application to get the user's IP address and then use this addrses to obtain location information. This was used
  to populate location automatically for our user profiles (city and state).

<h2>Challenges</h2>
<h3>Process Challenges</h3>
Some process challenges emerged related to process, such as version control and separation of concerns/tasks.
While working in Glitch allows multiple people to work on a project at one time, while we were working on 
separate sections, we worked in separate remixed projects to reduce introducing error that would stall each 
other’s progress. We resolved this by setting up an assembly line in the last phase of the project to merge 
all of our respective pieces. Second, regarding separation of concerns, we didn’t understand how closely some 
parts of the project were tied together when we first started working on them. So when these were assigned to separate members, we didn’t 
realize that they needed to be done collaboratively. To resolve this we identified the problem and rearranged 
priorities and responsibilities.

<h3>Technology Challenges</h3>
There were some technology challenges. At first, it was difficult to figure out how to use forms and buttons to send requests to the 
database. But once this was figured out, creating the necessary endpoints for our data was rather easy.

There was also a challenge related to Passport. This was a particularly difficult thing to implement and the documentation did not seem
clear. However, we were able to resolve and have members of the team implement all aspects of authentication, authorization, and session management.

We also only used javascript and did not use any frameworks like Angular or React. This limited our ability to implement some more elegant
rendering and implementation as we had to rely on EJS, which is limited in some of its capabilities to access data. For example, implementing
dynamic drop downs was a little more complex than if we used react/angular, or another library or non-ejs method.

<h2>Future Work</h2>
One feature we didn't create, but wanted to, was searching based on tags or to incorporate this into the feed. We didn't implement this, mostly due to
the unexpected time it took to figure out our problems with Passport and authorization. However, we think this could be easily implemented 
given just a bit more time.

We also think it would be valuable to incorporate things like React and Angular for some more elegant building of the application and dynamic features.
Axios was something that we can across a lot in our search for answers, so this seems like a valuable technology to learn. It would
be interesting to rebuild this application using a SQL database.

<h2>Conclusion</h2>
Together, we all felt this class was one of the most valuable in teaching real skills. I think it would have been interesting to learn 
how to do a very similar project but with a SQL database, as a very similar project is expected in the Database Management course, but we are not
taught how to implement the frontend in that course.

Other frameworks and libraries like angulor and axios are helpful, but in general more time could be spent on just basic javascript and how to
diagnose bugs.

We really enjoyed this project and this course. Thank you for the opportunity.

<h2>Documentation</h2>

<h3>Resources</h3>
[http://www.passportjs.org/docs/](http://www.passportjs.org/docs/).
[https://www.youtube.com/watch?v=k_0ZzvHbNBQ&list=PLillGF-RfqbYRpji8t4SxUkMxfowG4Kqp](https://www.youtube.com/watch?v=k_0ZzvHbNBQ&list=PLillGF-RfqbYRpji8t4SxUkMxfowG4Kqp)

<h3>Testing</h3>
To test the application, any user can register and create their own profile and begin using any of the features on the website.

To test the admin side of the application please use the admin username: admin@email.com and password: password.

<h3>Data Models</h3>
We use three data models: users, profile, and look.

<h4>Users</h4>
Users have up to three fields: 
* username: the email address used to register
* password: the password used to register, encrypted when posted to the database.

<h4>Profile</h4>
Profile objects have up to twelve fields:
* image: an image url string representing the profile picture. A string. 
* name: the users' name. A string.
* userName: the user's username. A string. 
* email: the user's email address. A string. 
* userId: the user objectid to link the profile to the user. A string.
* tags: the tags for the user describing their looks. An array of strings
* drawer: the user's makeup drawer. An array of objects. 
* bio: the user's biography. A string.
* following: who the user is following. An array of objectids associated with other profiles
* city: the city of the user. A string. Taken from IP information. 
* state: the state of hte user. A string. Taken from IP information.

<h4>Look</h4>
Look objects have up to six fields:
* profileId: the profile id the look is associated with. A string. 
* profileName: the name of the user the profile is associated with A string. 
* image: the image used for the link. A URL represented as a string. 
* products: products used to achieve the look. An array of objects. 
* tags: tags used to describe the object. An array of strings. 
* dateTime: the date and time the look was created. a DATE.

<h3>Endpoints</h3>

<h4>Index</h4>

<h5>GET /</h5>
Renders the home screen.

<h5>GET /signup</h5>
Renders the screen where users can sign up and make a user account.

<h5>POST /signup</h5>
Creates a new user on the database using information provided
in the form.

<h5>GET /login</h5>
Renders the screen where users can login.

<h5>GET /adminLogin</h5>
Renders the screens where administrators can login.

<h5>POST /adminLogin</h5>
Uses a post request to authenticate the entered information on the adminlogin page. 
Redirects to adminlogin if failure and redirects to admin dashboard if successful.

<h5>POST /login</h5>
Uses a post request to authenticate the entered information on the login screen.
Redirects to hte user's profile if successful. Redirects to login if not successful.

<h5>GET /admin</h5>
Renders admin dashboard

<h5>GET /logout </h5>
Ends session for user and redirects them to the home page.

<h5>GET /viewprofile/:username </h5>
Gets the admin view of the profile for the user with the associated username.

<h5>POST /delete_user/:email/:username</h5>
Deletes the user, profile, and looks associated with the user. 
For admin use only. Uses email and username parameters find associated
objects

<h5>POST /adminDeleteLook/:pId/:lId/:username</h5>
deletes the specified look with specific objectID (lId) associated with the specific
user profileId (pId) and username. For admin use only.

<h4>Feed</h4>

<h5>GET /feed </h5>
Renders feed for specific user that is logged in.

<h5>GET /feed/search </h5>
Get search results page after typing somethinginto the search field on the feed 
page.

<h4>lookApi</h4>

<h5>GET /look/create/:uId/:pId </h5>
Renders the page where users can create a look. Passes in userid
and profileid parameters so that looks are automatically linked to the user's profile.

<h5>POST /look/create/:uId/:pId </h5>
Creates the look in the database.

<h5>POST /look/delete/:pId/:lId</h5>
Deletes look from database using profileid and a lookid passed in as parameters.

<h5>GET /look/update/:pId/:lId</h5>
Renders page where users can update their looks.

Populates form with data based on the selected look using parameters profileid and lookid.

<h5>POST /look/update/:uId/:pId/:lId</h5>
Updates look in database.

<h4>myProfile</h4>

<h5>GET /myProfile </h5>
Renders my profile view for the user that is logged in.

<h5>POST /myprofile/delete/:id </h5>
Deletes profile and all associated looks (but not user, so the user could still recreate
a new profile, if desired. )

<h4>otherProfile</h4>

<h5>GET /otherProfile/:pId </h5>
Renders other profile view for a specific profile objet id.

<h5>POST/otherProfile/:pId </h5>
Allows the user to follow the specified profile. Adds profile object id
to the logged in user's 'following' object array.

<h4>profileApi</h4>

<h5>GET /profile/create/:id</h5>
Renders page where user can create their profile. populates userId with the 
id passed in as a parameter.

<h5>POST /createProfile/:id </h5>
Creates new profile in database.

<h4>Search</h4>

<h5>GET /search</h5>
Renders search results page.
