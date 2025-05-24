var _ = require('lodash');


const dummy = (blogs) => {
    return 1
  }
  
  const mostLiked = (blogs) => {
    
    const amount =blogs.reduce(myFunc,0)

    function myFunc(total,num) {
    
    if (!total)
    {
        return num
    }
    return total.likes>num.likes ? total : num
     
    }
    return amount
}

const mostBlogs =(blogs)=>{

    const amount= _.countBy(blogs,'author')
    const topAuthorName = _.maxBy(Object.keys(amount), author => amount[author]);
    
    const result = {
        author: topAuthorName,
        blogs: amount[topAuthorName]
      };
    

    return result
}

const mostLikes =(blogs)=>{


    return 0

}



  const totalLikes = (blogs) => {
    
    const amount =blogs.reduce(myFunc,0)

    function myFunc(total,num) {
    
     return total+num.likes;
    }
    return amount

  }
  
  module.exports = {
    dummy,
    totalLikes,
    mostLiked,
    mostBlogs,
    mostLikes
  }