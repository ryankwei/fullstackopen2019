let _ = require('lodash')

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  let total = 0
  for (let i in blogs) {
    //console.log(blog)
    total += blogs[i].likes
  }

  return total
}

const favoriteBlog = (blogs) => {
  let mostLiked = blogs[0]
  for (let i in blogs) {
    if (blogs[i].likes > mostLiked.likes) {
      mostLiked = blogs[i]
      //console.log(mostLiked)
    }
  }

  return mostLiked
}
const mostBlogs = (blogs) => {
  let newList = _.flatMap(blogs, blog => blog.author)
  let freqList = _.countBy(newList)
  let max = _.max(newList)
  console.log(max)
  return {
    author: max,
    blogs: freqList[max]
  }
}

const mostLikes = (blogs) => {
  let out = _(blogs)
              .groupBy('author')
              .map((obj, key) => ({
                'author': key,
                'likes': _.sumBy(obj, 'likes')
              }))
              .value()
  return(_.maxBy(out, (blog) => (blog.likes)))
}
module.exports = {
  dummy, favoriteBlog, totalLikes, mostBlogs, mostLikes
}
