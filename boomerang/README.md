# **APP TITLE: BOOMERANG**

## OVERVIEW

---

1. App Summary
   - Wireframe
   - User Stories
   - Data Models
2. Technologies Used
3. Getting Started
4. Next Steps

<br>
<br>

## APP SUMMARY

---

### **Wireframe**

#### Home Page

![entity-relationship-diagram](./project-detail/home.JPG)

#### User Page

![entity-relationship-diagram](./project-detail/user.JPG)

#### Question Page

![entity-relationship-diagram](./project-detail/new-question.JPG)

![entity-relationship-diagram](./project-detail/show-question.JPG)

<br>
<br>

### **User Stories**

1. As a user, I can login/logout using Google account
2. As a user, I can check my user detail that shows **email**, **username**, **number of questions asked**, and **number of answers selected** and **recent questions asked**. Username can be edited.
3. As a user, I can ask questions that can be answered by other users in the app, and have authorization to select answers in the questions I originally asked as "_selected_"
4. As a user, I can answer the questions in the app community which can be "_selected_" by the original author of the question
5. As a user, I can see the questions feed which can be sorted based on the engagement numbers, topics, publish date, or unasnwered questions

<br>
<br>

### **Data Models**

![entity-relationship-diagram](./project-detail/erd.JPG)

User

- Username: String, unique
- Email: String, unique
- Questions asked: Number
- Answers selected: Number
- Google ID: String

Question

- Question Title: String
- Question Body: String
- Topics: Enum
- Answers: [String]
- Publish Date: Date ( timestamps: true )

Answer

- Username: String
- Answer Body: String
- Answer Selected: Boolean
- Publish Date

<br>
<br>

## TECHNOLOGIES USED

---

<br>
<br>

## GETTING STARTED

---

<br>
<br>

## NEXT STEPS

---

<br>
<br>
