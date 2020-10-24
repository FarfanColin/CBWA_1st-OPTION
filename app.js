const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { use } = require('passport');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//Pluralsight video 8, passport part
app.use(session({ secret: 'project' }));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/issues', title: 'Issues' },
  { link: '/comments', title: 'Comments' },
  { link: '/users', title: 'Users' },
  { link: '/projects', title: 'Projects' }
];

const issueRouter = require('./src/routes/issueRoutes')(nav);
const projectRouter = require('./src/routes/projectRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);
const commentRouter = require('./src/routes/commentRoutes')(nav);
const newprojectRouter = require('./src/routes/newprojectRoutes')(nav);
const comment1Router = require('./src/routes/comment1Routes')(nav);
const userstRouter = require('./src/routes/usersRoutes')(nav);

app.use('/issues', issueRouter);
app.use('/projects', projectRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/comment', commentRouter);
app.use('/newproject', newprojectRouter);
app.use('/comments', comment1Router);
app.use('/users', userstRouter);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [{ link: '/issues', title: 'Issues' },
      { link: '/comments', title: 'Comments' },
      { link: '/users', title: 'Users' },
      { link: '/projects', title: 'Projects' }],
      title: 'CA:Cloud-based Web Applications'
    }
  );
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
