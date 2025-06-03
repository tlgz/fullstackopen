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


    const list=blogs.reduce(myFunc,{})

    function myFunc(total,num) {

    if(num.author in total)
    {
      total[num.author]+=num.likes
    }
    else
    {
      total[num.author]=num.likes
    }
      
     return total
    }
    
    
    const maxValue = Math.max(...Object.values(list));


    const maxKey = Object.keys(list).find(key => list[key] === maxValue);

    

    const result = {
        author: maxKey,
        likes: maxValue
      };
      return result
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