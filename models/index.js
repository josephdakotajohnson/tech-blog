const User = require('./User');
const Blog = require('./Blog');
const Comments = require('./Comments');

User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comments.belongsTo(User, {
  foreignKey: 'user_id'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

Blog.hasMany(Comments, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Blog, Comments };
