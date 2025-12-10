# LyricLoop---1570-Final-Project


### Introduction - Introduce the team and provide a high level description of the project. Be sure to include full names and Pitt IDs.
Our group project is called LyricLoop, and our team consists of 5 members: Nessa Purohit (NBP13), Luke Cusato (LUC59), Srushti Chavan (SSC59), Morgan Noonan (MEN83), and Roja Kafle (ROK85). LyricLoop is a music-centered social media platform that allows users to share their thoughts, emotions, and reactions to songs. The application enables users to create, read, update, and delete posts, as well as see what other users are posting. Our group wanted to develop LyricLoop to create a space for music lovers to connect through the songs they love.

### Objective - Describe with more specific details what your objectives and goals are for the project. What problems did you want to solve or what did you want to learn in developing this application? What features, beyond the ones listed in the assignment requirements, did you implement?
The objective of our project was to fulfill the assignment requirements while also creating a platform users can use to genuinely connect over music. Popular music services such as Spotify and Apple Music are used commonly as music listening platforms; however, the main functionality of these platforms is to listen to music rather than to engage/connect with other people through music. In so many spaces, music is a force that brings people together. In creating our project, we wanted to solve this problem by giving people a place to share their thoughts and connect through their favorite artists, albums, and songs. 
In building this project, we wanted to learn how to implement everything we have learned throughout the semester towards creating a project that not only addressed our project needs, but also created a pleasant user experience. We wanted to challenge ourselves to build an experience that feels intuitive, modern, and meaningful for users.
In addition to the assignment requirements, we added home feed, search, and profile features - allowing our project to mimic the nature of widely used social media platforms many of our target audience users are familiar with. We also added additional features to the admin database. Instead of simply having admin access to the users/platform, we added components that a person using the admin dashboard in a real world setting would most likely search for. For example, we included platform metrics such as number of users in the past week, trending songs, top users, number of hours spent on the platform in the past week (per user), and any flagged posts. These are metrics and insights an administrator would need in a real world environment to effectively monitor and oversee this platform.


### Team member’s contributions - Describe in detail what each member of the team did on the project.
Nessa - created & updated user and admin wireframes showing the features and functionality our app will have. wrote the final project report and created the final presentation slides.
Luke - assisted with the creation of the initial wireframes and set up the MongoDB database structure for the application. Connected backend API endpoints to frontend behavior.
Srushti - front end development for the admin dashboard and admin sidebar, handling both layout and functionality.
Morgan - front end development (sign in user/admin, set up account, home, nav, crud posts, search, profile, logout), set up backend. 
Roja - implemented the admin analytics features, including data processing and displaying platform metrics.


### Technical Architecture - What are the libraries, frameworks, and other technologies you used and how did you put them together. Use the MVC conceptual model to provide a guide (i.e. what are the models/views/controllers and what do they do). 
To bring this project to life we used the following technologies: React framework (front end), Tailwind CSS (styling), node.js (back end), MongoDB (data storage), GitHub (pulling all project files together). 
Following the MVC conceptual model, our models were defined in MongoDB using Mongoose to structure and manage data for users, posts, and admin analytics. The views were implemented as React components. The controllers were handled through Express routes in Node.js, which process incoming requests, execute application logic, interact with the database, and return responses to the client. Together, these technologies form a cohesive full-stack application that supports all core features of the platform.


### Challenges - Discuss any challenges you faced in trying to develop this app. Were there libraries or technologies you wanted to use but were frustrating? Were there features you couldn’t get working? 
When developing this project, the main issues we experienced were with MongoDB. The initial issue was we had difficulty connecting to the port our database was running on; however, we were able to fix this easily by allowing MongoDB to connect on any port. Additionally, one only team member was able to directly access the MongoDB since the authentication is very user specific. Aside from these issues, we did not run into major obstacles. Most challenges were resolved through troubleshooting, and we were ultimately able to implement all the features we planned for the application.


### Future Work - What features would you like to add to your application? If you had more time, what technologies would you like to learn?
For future implementation, one of the features we look to expand most in this project is having direct messaging on our platform, where users can connect with other people and share songs directly with each other. This feature will better fulfill our goal of fostering authentic connections through music by allowing for more personal and meaningful interactions beyond simply viewing each other’s posts. With more time and the incorporation of more advanced technologies, we can also incorporate recommendation features that suggest artsits/songs to users based on what they indicate their interests to be/what music they have interacted with most. 


### Conclusion - Reflect upon the web technologies and standards you learned in this course, did you learn what you wanted? What technologies or standards do you think would be useful in future iterations of this course?
A few of the most helpful lessons from the course were learning the DOM model, learning a JS framework, bootstrapping, and using APIs to fetch/create databases for our projects. These skills allow us to develop full-stack web applications with both frontend and backend components, while also ensuring a responsive and user-friendly experience across devices (including smartphones). Another great skill, although not taught explicitly in class, is knowing how to ultimately pull these projects together using GitHub. We used GitHub to create codespaces, pull/push changes to our project, and compile all project files in a central location. More along the lines of the final project, these lessons equipped us with the needed skills and knowledge to pull together the different components of the final project. For future classes, students may benefit from learning more about developing projects that translate more smoothly to smaller device interfaces, such as smartphones. Something else that can be incorporated is discussing common vulnerabilities in web development and showing how to address this to create more secure websites. 

### Resources - List any resources that you used in creating this project (I.e. tutorials, library documentation, or blog posts). Only include resources that are beyond the readings from the course. 
The prime resources used in completing this project were all the past assignments and projects we worked on in this class. Since this project utilized many features and aspects of web development that we also implemented in previous projects, it was helpful to look at functioning examples of things we needed to incorporate into our final project. As for resources used outside of anything class related, I have included them below:
* [Building a Simple CRUD app with Node, Express, and MongoDB | Zell Liew](https://zellwk.com/blog/crud-express-mongodb/?utm_source=chatgpt.com)  
* [How To Connect React JS With Node JS and MongoDB - DEV Community](https://dev.to/theudemezue/how-to-connect-react-js-with-node-js-and-mongodb-c9i?utm_source=chatgpt.com)


### Include any specific instructions for testing the functionality of your application.
* Clone the repository and install dependencies using npm install. 
* Ensure MongoDB is running and accessible
* Run npm start (or node server.js) to launch the backend
* Open the React frontend with npm start in the client directory
* Test creating, reading, updating, and deleting posts as a user
* Log in as an admin to test/view the admin dashboard
* From the root directory, run:
    * node server.js
    * From the LyricLoop directory, run:
        * VITE_API_BASE=http://127.0.0.1:5001 npm run dev

