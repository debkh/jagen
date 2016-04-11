/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Document from '../api/document/document.model';
import Menu from '../api/menu/menu.model';

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

User.find({}).remove()
  .then(() => {
    User.create(
    {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    },{
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    })
    .then((res) => {
      console.log('finished populating users');
      return res;
    })
    .then(createDocuments)
    .then(createMenu);
  });

function createDocuments(res) {
  return Document.find({}).remove()
  .then(() => {
    return Document.create(
    {
      title: 'Document 1',
      text: 'Document 1 Text',
      slug: 'document-1',
      user: res._id
      // user : ObjectId('5144cf8050f071d979c118a2')
    },{
      title: 'Document 2',
      text: 'Document 2 Text',
      slug: 'document-2',
      user: res._id
    })
    .then((res) => {
      console.log('finished populating documents');
      return res;
    });
  });
}

function createMenu(res) {
  var document = res;
  return Menu.find({}).remove()
  .then(() => {
    return Menu.create({
      title: 'Menu 1',
      slug: 'menu-1',
      type: 'menu'
    })
    .then((res) => {
      Menu.create({
        title: 'Document',
        slug: 'document',
        type: 'document',
        menu: res._id,
        document: document._id
      });
      console.log('finished populating menu');
      return res;
    });
  });
}

