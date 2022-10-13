# UPC Tracker

This is the front end for my UPC tracking web app. It will call the API on my back end to store UPCs in a Mongo Atlas database. I will use this to track which UPCs I have already reported, to where I reported them, and the status of the reported UPCs. The back-end repo is [here](https://github.com/JonathanDPotter/upc-tracker), and this web app is hosted on Vercel [here](https://upc-tracker-efxn5f8q7-jonathandpotter.vercel.app/). The android app is available on the Play Store [here](https://play.google.com/store/apps/details?id=com.jonathandpotter.upctracker).

---

## Technologies Used

This app is written in TypeScript using React Native. Global state is handled with redux, and authentication is handled on the back end with jsonwebtoken. It is styled with tailwind css.

---

## Functionality

When a user first visits the site, if they are not logged in they are redirected to the login page. They can register on that page if they are not already registered, otherwise they can use their credentials to log in. Once logged in the user is redirected to the home page where they can see all of the UPC groups that they have created and create new ones. By clicking on a group name, they can open it up for editing. Groups can also be deleted entirely from the edit menu.
