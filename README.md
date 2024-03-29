# react

## Add React to a Website [Link](https://reactjs.org/docs/add-react-to-a-website.html)

### Add React in One Minute

```
cd test-water
index.html
like_button.js
```

### Try React with JSX

```
npm init -y
npm install babel-cli@6 babel-preset-react-app@3
mkdir src
npx babel --watch src --out-dir . --presets react-app/prod
vim src/react_sandbox.js
```

## Create a New React App [Link](https://reactjs.org/docs/create-a-new-react-app.html)

### Create a new single-page app

```
npx create-react-app my-app
cd my-app
npm install (if node_modules does not exist)
npm start

npm run build
serve -s build
```

### Create a new multi-page app

```
npx create-react-app multi-page
cd multi-page
npm install (if node_modules does not exist)
npm install react-router-dom
npm i -D styled-components@5.3.10
```

### Learn More

Create React App [Link](https://create-react-app.dev/docs/getting-started/)

React Dev [Link](https://react.dev/learn)

One of React.js Framework: Next.js [Link](https://nextjs.org/learn/foundations/about-nextjs)