'use strict';
// document.getElementById('test-button').addEventListener('click', function() {
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
// });
const titleClickHandler = function(event){
    event.preventDefault();
    console.log('Link was clicked!');
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active'); /* remove class 'active' from all article links  */
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
    clickedElement.classList.add('active'); /* add class 'active' to the clicked link */
  
    const activeArticles = document.querySelectorAll('.posts article.active'); /* remove class 'active' from all articles */
    console.log('active articles:', activeArticles);
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
    const articleSelector = clickedElement.getAttribute('href'); /* get 'href' attribute from the clicked link */
    console.log('articleSelector', articleSelector); 
    const targetArticle = document.querySelector(articleSelector); /* find the correct article using the selector (value of 'href' attribute) */
  
    targetArticle.classList.add('active'); /* add class 'active' to the correct article */
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
