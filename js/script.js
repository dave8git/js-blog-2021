'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  taglink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-authors-cloud-link').innerHTML)
};

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
  //console.log(targetArticle);
  targetArticle.classList.add('active'); /* add class 'active' to the correct article */
};


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorListSelector = '.authors';


function generateTitleLinks(customSelector = '') {

  const titleList = document.querySelector(optTitleListSelector); /* remove contents of titleList */
 
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of articles) { /* for each article */

    const articleId = article.getAttribute('id'); /* get the article id */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML; /* find the title element *//* get the title from the title element */

    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; /* create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    html = html + linkHTML;/* insert link into titleList */
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999
  };
  for(let tag in tags) {
    //console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if(tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  // console.log(params);
  return params; 
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min; 
  const percentage = normalizedCount / normalizedMax; 
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return classNumber;
}

function generateTags(){
  let allTags = {};

  const articles = document.querySelectorAll(optArticleSelector); /* find all articles */

  for (let article of articles) { /* START LOOP: for every article: */
    const titleList = article.querySelector(optArticleTagsSelector); /* find tags wrapper */
    let html = ''; /* make html variable with empty string */

    const articleTags = article.getAttribute('data-tags'); /* get tags from data-tags attribute */

    const articleTagsArray = articleTags.split(' ');/* split tags into array */

    for(let tag of articleTagsArray) { /* START LOOP: for each tag */

      //const linkHTML = '<li><a href="#tag-' + tag + '" class="short-margin">' + tag + '</a></li>'; /* generate HTML of the link */
      const linkHTMLData = {id: articleTags, tag: tag};
      const linkHTML = templates.taglink(linkHTMLData);
      html = html + linkHTML;/* add generated code to html variable */

      if(!allTags[tag]) { /* check if this link is NOT already in allTags */
        allTags[tag] = 1; /* add tag to allTags object */
      } else {
        allTags[tag]++; 
      }
    }/* END LOOP: for each tag */
  
    titleList.innerHTML = html; /* insert HTML of all the links into the tags wrapper */

  }/* END LOOP: for every article: */

  const tagList = document.querySelector('.tags'); /* find list of tags in right column */

  //tagList.innerHTML = allTags.join(' ');  /* add html from allTags to tagList */

  const tagsParams = calculateTagsParams(allTags);

  //console.log('tagsParams:', tagsParams);

  let allTagsData = {tags: []}; /* create variable for all links HTML code */

  for(let tag in allTags) { /* START LOOP: for each tag in allTags: */

    //const tagLinkHTML =  '<li><a class="' + optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>' + ' '; /* add HTML from allTagsHTML to taglist */
    //allTagsHTML += tagLinkHTML;
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams)
    });
  }
  //console.log('allTagsHTML: ', allTagsHTML);

  //tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
    //console.log(link);
    link.addEventListener('click', tagClickHandler);/* add tagClickHandler as event listener for that link */

  }/* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors () {
  let allAuthors = {};

  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {

    const authorLink = article.querySelector(optArticleAuthorSelector);

    let html = '';

    const author = article.getAttribute('data-author');

    //const linkHTML = '<li><a href="#author-' + author + '">' + author + '</a></li>';
    const linkHTMLData = {id: author, author: author};
    const linkHTML = templates.authorLink(linkHTMLData);

    if(!allAuthors[author]) { /* check if this link is NOT already in allAuthors */
      allAuthors[author] = 1; 
    } else {
      allAuthors[author]++;
    }
    html = html + linkHTML;

    authorLink.innerHTML = html;
  }
  const authorList = document.querySelector(optAuthorListSelector);

  //authorList.innerHTML = allAuthors.join(' ');
  /* [NEW] create variable for all links HTML code */
  const allAuthorsData = {authors: []};
  //let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let author in allAuthors){
    console.log(author);
    /* [NEW] generate code of a link and add it to allTagsHTML */
    //allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + ' ' + (allAuthors[author]) + '</a></li>';
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });
  }
  /* [NEW] END LOOP: for each tag in allTags: */
  // console.log(allAuthorsHTML);
  /*[NEW] add HTML from allTagsHTML to tagList */
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);

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
    //console.log(author);
    author.addEventListener('click', authorClickHandler);/* add tagClickHandler as event listener for that link */
  }/* END LOOP: for each link */
}

addClickListenersToAuthors();

