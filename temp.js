function generateTags(){
    let allTags = {};
  
    const articles = document.querySelectorAll(optArticleSelector); /* find all articles */
  
    for (let article of articles) { /* START LOOP: for every article: */
      const titleList = article.querySelector(optArticleTagsSelector); /* find tags wrapper */
      let html = ''; /* make html variable with empty string */
  
      const articleTags = article.getAttribute('data-tags'); /* get tags from data-tags attribute */
  
      const articleTagsArray = articleTags.split(' ');/* split tags into array */
  
      for(let tag of articleTagsArray) { /* START LOOP: for each tag */
  
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>'; /* generate HTML of the link */
  
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
  
    let allTagsHTML = ''; /* create variable for all links HTML code */
  
    for(let tag in allTags) { /* START LOOP: for each tag in allTags: */
  
      const tagLinkHTML =  '<li><a class="' + optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>' + ' '; /* add HTML from allTagsHTML to taglist */
      allTagsHTML += tagLinkHTML;
    }
    console.log('allTagsHTML: ', allTagsHTML);
  
    tagList.innerHTML = allTagsHTML;
  }