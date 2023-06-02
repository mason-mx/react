## Create React Web UI [Link](https://blog.logrocket.com/top-10-react-ui-libraries-kits/)

### Use React Bootstrap UI library [Link](https://react-bootstrap.github.io/docs/getting-started/introduction)

```
npx create-react-app cui
cd cui
npm install react-bootstrap bootstrap
npm install (if node_modules does not exist)
npm start

npm run build
serve -s build
```

### Add Bootstrap CSS

Import Bootstrap CSS and optionally Bootstrap theme CSS in the beginning of your src/index.js file:

```
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
```