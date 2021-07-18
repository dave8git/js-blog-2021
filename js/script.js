'use strict';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active'); /* remove class 'active' from all article links  */
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */

  const activeArticles = document.querySelectorAll('.posts article.active');/* remove class 'active' from all articles */
  for(let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  const articleSelector = clickedElement.getAttribute('href'); /* get 'href' attribute from the clicked link */

  const targetArticle = document.querySelector(articleSelector); /* find the correct article using the selector (value of 'href' attribute) */
  console.log(targetArticle);
  targetArticle.classList.add('active'); /* add class 'active' to the correct article */
};


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {

  const titleList = document.querySelector(optTitleListSelector); /* remove contents of titleList */
 
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of articles) { /* for each article */

    const articleId = article.getAttribute('id'); /* get the article id */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML; /* find the title element *//* get the title from the title element */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; /* create HTML of the link */

    html = html + linkHTML;/* insert link into titleList */
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();


function generateTags(){
  const articles = document.querySelectorAll(optArticleSelector); /* find all articles */

  for (let article of articles) { /* START LOOP: for every article: */
    const titleList = article.querySelector(optArticleTagsSelector); /* find tags wrapper */
    let html = ''; /* make html variable with empty string */

    const articleTags = article.getAttribute('data-tags'); /* get tags from data-tags attribute */

    const articleTagsArray = articleTags.split(' ');/* split tags into array */

    for(let tag of articleTagsArray) { /* START LOOP: for each tag */

      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>'; /* generate HTML of the link */

      html = html + linkHTML;/* add generated code to html variable */

    }/* END LOOP: for each tag */
  
    titleList.innerHTML = html; /* insert HTML of all the links into the tags wrapper */

  }/* END LOOP: for every article: */
}

generateTags();

function tagClickHandler(event){
  event.preventDefault(); /* prevent default action for this event */

  const clickedElement = this; /* make new constant named "clickedElement" and give it the value of "this" */

  const href = clickedElement.getAttribute('href');/* make a new constant "href" and read the attribute "href" of the clicked element */
 
  const tag = href.replace('#tag-', ''); /* make a new constant "tag" and extract tag from the "href" constant */

  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]'); /* find all tag links with class active */

  for (let tag of tagLinks) { /* START LOOP: for each active tag link */

    tag.classList.remove('active'); /* remove class active */

  }/* END LOOP: for each active tag link */

  const tagLinks2 = document.querySelectorAll('a[href="' + href + '"]'); /* find all tag links with "href" attribute equal to the "href" constant */

  console.log(href);
  for(let tag of tagLinks2) {/* START LOOP: for each found tag link */

    tag.classList.add('active'); /* add class active */

  }/* END LOOP: for each found tag link */

  generateTitleLinks('[data-tags~="' + tag + '"]'); /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]'); /* find all links to tags */

  for(let link of tagLinks) {/* START LOOP: for each link */
    console.log(link);
    link.addEventListener('click', tagClickHandler);/* add tagClickHandler as event listener for that link */

  }/* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors () {
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {

    const authorLink = article.querySelector(optArticleAuthorSelector);

    let html = '';

    const author = article.getAttribute('data-author');

    const linkHTML = '<li><a href="#author-' + author + '">' + author + '</a></li>';

    html = html + linkHTML;

    authorLink.innerHTML = html;
  }
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault(); 
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  const authorLinks = document.querySelectorAll('a[href^="#author-"]'); /* find all links to tags */
  for(let author of authorLinks) {/* START LOOP: for each link */
    console.log(author);
    author.addEventListener('click', authorClickHandler);/* add tagClickHandler as event listener for that link */
  }/* END LOOP: for each link */
}

addClickListenersToAuthors();

