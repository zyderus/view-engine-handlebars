const express = require('express');
const handlebars = require("express-handlebars");

const app = express();
const port = process.env.PORT || 3000;

app.engine('hbs', handlebars({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    quickComment(comment) {
      if (comment.length < 77) {
        return comment;
      }
      return comment.substring(0, 77) + '...';
    }
  }
}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.render('index', {
  posts: [ 
    {
      author: 'Kevin Smith',
      image: 'https://picsum.photos/500/200?2',
      comments: [
        'Some interesting comment',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores libero doloribus praesentium, alias molestiae sed ipsum? Sequi, nisi quas harum nemo dolor illo, doloribus magni natus perspiciatis alias, obcaecati eaque tempore. Esse perferendis veniam ratione velit aspernatur? Temporibus a modi quae, ipsa harum facilis totam atque ratione saepe, vel accusamus tempore beatae aut assumenda?'
      ]
    },
    {
      author: 'Lynda Tart',
      image: 'https://picsum.photos/500/200',
      comments: []
    }
  ]
}));

app.listen(port, () => console.log(`connected on port ${port}`));