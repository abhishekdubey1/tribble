1. First I'll make a backend using express which searches through the array of objects trying to match the search text. And sends JSON response back as the first object that matches the search text. (1hr)
2. Then in the frontend, I’ll make a component with an input. When the input changes the API call will be made to the backend. The data received from the backend will be shown in a list form mapping through the array. (10 minutes)
3. Then I will create a highlighter component that shows the matching word highlighted and an algorithm that finds the highlighted word in a sentence. At this point, I will have a basic search full-stack app ready. (1hr)
4. Now, I will go back to the backend and send every object in response that matches the search text. (20 minutes)
5. I will also handle the search response including the items property search. So that frontend can show: ‘ “bucket’ was found in items ’. (40 minutes)
6. I will handle the showing of search text found in items in the frontend. (30 minutes)
7. After achieving all these, I will implement mouse and keyboard navigation in the frontend. Then, I will handle the keyboard navigation taking preference over mouse hovering. (1hr)
8. Next, I will add an error-boundary to handle errors. And debounce to control/reduce the number of requests to the backend. (20 minutes)

Questions:

1. Didn’t understand this: “on select of the suggestion directly show that user as the final page”. How will the final page look like is not mentioned.
2. # Should I use a database like MongoDB or should I use arrays and objects?

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
