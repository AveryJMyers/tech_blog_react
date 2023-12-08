const BlogPost = require('./blogPost')
const Comment = require('./comment')
const User = require('./user')

User.hasMany(BlogPost, {
    foreignKey: 'author',
    onDelete: 'CASCADE'
})

BlogPost.belongsTo(User, {
    foreignKey: 'author',
    onDelete: 'CASCADE'
})

User.hasMany(Comment, {
    foreignKey: 'author',
    onDelete: 'CASCADE'
})
BlogPost.hasMany(Comment, {
    foreignKey: 'associatedPost',
    onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
    foreignKey: 'author',
    targetKey: 'id',
    as: 'comment_author',
    onDelete: 'CASCADE'
})
Comment.belongsTo(BlogPost, {
    foreignKey: 'associatedPost',
    onDelete: 'CASCADE'
})

module.exports = { 
    User, 
    BlogPost, 
    Comment 
}