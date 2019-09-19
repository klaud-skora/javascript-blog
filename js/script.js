'use strict';
{
  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;

    console.log('Link was clicked!');
    //console.log(event);

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
    const clickedArticle = clickedElement.getAttribute('href');
    console.log('clickedArticle:', clickedArticle);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const correctArticle = document.querySelector('.posts article' + clickedArticle);

    /* [DONE] add class 'active' to the correct article */
    correctArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  function generateTitleLinks() {
    console.log('Trying to generate links');

    /* remove content of Links list in sidebar */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    let html = '';
    /* get the article id */
    const allArticles = document.querySelectorAll(optArticleSelector);
    for(let oneArticle of allArticles) {
      const articleId = oneArticle.getAttribute('id');
      console.log('articleId:', articleId);

      /* find element with the title */
      const articleTitle = oneArticle.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);

      /* create HTML text of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log('linkHTML', linkHTML);

      /* insert HTML text to Links list in sidebar */
      //titleList.insertAdjacentHTML('beforebegin', linkHTML);
      html = html + linkHTML;
      console.log('html', html);
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log('links:'. links);
    for(let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();
}
