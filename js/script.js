'use strict';
{
  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');
    //console.log('clickedElement (with plus): ' + clickedElement);

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for(let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const href = clickedElement.getAttribute('href');
    console.log('href:', href);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const correctArticle = document.querySelector(href);

    /* [DONE] add class 'active' to the correct article */
    correctArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks(customSelector = '') {
    console.log('Trying to generate links');

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    let html = '';
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    //console.log('customSelector', customSelector); ????

    /* get the article id */
    for(let article of articles) {
      const articleId = article.getAttribute('id');
      console.log('articleId:', articleId);

      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('articleTitle', articleTitle);

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log('linkHTML', linkHTML);

      /* insert link into titleList */
      //titleList.insertAdjacentHTML('beforebegin', linkHTML);
      html = html + linkHTML;
      console.log('html', html);
    }
    titleList.innerHTML = html;
    console.log('Lista linków:', titleList);

    const links = document.querySelectorAll('.titles a');
    console.log('links:'. links);
    for(let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();

  function generateTags() {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles) {
      console.log('article:', article);

      /* find tags wrapper */
      const wrapper = article.querySelector(optArticleTagsSelector);
      console.log('wrapper', wrapper);
      /* make html variable with empty string */
      let html = '';
      console.log('html', html);
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('articleTags', articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('articleTagsArray', articleTagsArray);

      /* START LOOP: for each tag */
      for(let tag of articleTagsArray) {
        console.log('tag', tag);

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#' + tag + '"<span>' + tag + '</span></a></li>';

        console.log('linkHTML', linkHTML);

        /* add generated code to html variable */
        html = html + ' ' + linkHTML;
        console.log('html', html);
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      wrapper.innerHTML = html;
    /* END LOOP: for every article: */
    }
  }
  generateTags();

  function tagClickHandler(event) {

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href', href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('tag', tag);

    /* find all tag links with class active */
    const links = document.querySelectorAll('a.active[href^="#tag-"]');

    console.log('links', links);

    /* START LOOP: for each active tag link */
    for(let link of links) {
      console.log('link', link);

      /* remove class active */
      link.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for(let tagLink of tagLinks) {
      console.log('tagLink', tagLink);

      /* add class active */
      tagLink.classList.add('active');
    }
    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');

  }

  function addClickListenersToTags(){

    /* find all links to tags */
    const links = document.querySelectorAll('.tags a');

    /* START LOOP: for each link */
    for(let link of links) {

      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  // this is new part of this **************

  function generateAuthor() {
    console.log('Trying to generate author name');
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for(let article of articles) {
      console.log('jeden atykuł', article);

      /* find author place on article */
      const authorLink = article.querySelector('.post-author .author');
      console.log('authorLink czy to istnieje?', authorLink);
      let html = '';
      console.log('pusty html', html);

      /* get authors from author attribute */
      const articleAuthors = article.getAttribute('author');
      console.log('articleAuthors', articleAuthors);

      /* get authorName */
      const articleAuthorsNames = articleAuthors. split(' ');
      console.log('Czy imie i nazwisko jest rozdzielone?', articleAuthorsNames);
      for(let name of articleAuthorsNames) {
        console.log('name', name);

        /* generate HTML of the link */
        const linkHTML = '<a href="' + name + '"><span>' + articleAuthors + '</span></a>';
        console.log('jak wygląda link ?', linkHTML);
        html = linkHTML;
      }
      authorLink.innerHTML = html;
    }

  }
  generateAuthor();

  /*
  funcion authorClickHandler(event){

  }

  function addClickListenersToAuthors() {
    /* find all links to authors */
  //const links = document.querySelectorAll('.authors a');
  /* START LOOP: for each link */
  //for(let link of links) {

  /* add authorClickHandler as event listener for that link */
  //link.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */ /*
    }
  }
  addClickListenersToAuthors();*/
}
