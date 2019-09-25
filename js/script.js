'use strict';
{
  const templates = {
    // eslint-disable-next-line no-undef
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    // eslint-disable-next-line no-undef
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    // eslint-disable-next-line no-undef
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    // eslint-disable-next-line no-undef
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    // eslint-disable-next-line no-undef
    tagAuthorLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
  };

  const select = {
    all: {
      articles: '.post',
      title: '.post-title',
      linksTo: {
        tags: 'a[href^="#tag-"]',
        authors: 'a[href^="#author-"]',
      },
    },
    article: {
      tags: '.post-tags .list',
      author: '.post-author .author',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',
    },
  };

  const opts = {
    cloud: {
      classCount: {
        forTags: 5,
        forAuthors: 2,
      },
      classPrefix: 'tag-size-',
    },
  };

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

  function generateTitleLinks(customSelector = '') {
    console.log('Trying to generate links');

    /* remove contents of titleList */
    const titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = '';

    /* for each article */
    let html = '';
    const articles = document.querySelectorAll(select.all.articles + customSelector);
    //console.log('customSelector', customSelector); ????

    /* get the article id */
    for(let article of articles) {
      const articleId = article.getAttribute('id');
      console.log('articleId:', articleId);

      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(select.all.title).innerHTML;
      console.log('articleTitle', articleTitle);

      /* create HTML of the link */
      //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
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

  function calculateTagsParams(tags) {
    const params = {
      max: 0,
      min: 999999
    };
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if(tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if(tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
  }
  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    console.log('normalizedCount', normalizedCount);

    const normalizedMax = params.max - params.min;
    console.log('normalizedMax', normalizedMax);

    const percentage = normalizedCount / normalizedMax;
    console.log('percentage %% : ', percentage);

    const classNumber = Math.floor(percentage * (opts.cloud.classCount.forTags - 1) + 1);
    return classNumber;
  }
  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);
    /* START LOOP: for every article: */
    for(let article of articles) {
      console.log('article:', article);

      /* find tags wrapper */
      const wrapper = article.querySelector(select.article.tags);
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
        //const linkHTML = '<li><a href="#' + tag + '"<span>' + tag + '</span></a></li>';
        const linkHTMLData = { tag: tag};
        const linkHTML = templates.tagLink(linkHTMLData);

        console.log('linkHTML', linkHTML);

        /* add generated code to html variable */
        html = html + ' ' + linkHTML;
        console.log('html', html);

        /* [NEW] check if this link is NOT already in allTags */
        // eslint-disable-next-line no-prototype-builtins
        if(!allTags.hasOwnProperty(tag)) {
        /* [NEW] add tag to allTags objecty */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      wrapper.innerHTML = html;
      /* END LOOP: for every article: */

      /* [NEW] find list of tags in right column */
      const tagList = document.querySelector(select.listOf.tags);
      console.log('TagList', tagList);
      /* [NEW] add html from allTags to tagList */
      //tagList.innerHTML = allTags.join(' ');
      console.log('allTags array: ', allTags);

      const tagsParams = calculateTagsParams(allTags);
      console.log('tagParams', tagsParams);
      /* [NEW] create variable for all links HTML code */
      //let allTagsHTML = '';
      const allTagsData = {tags: []};

      /* [NEW] START LOOP: for each tag in allTags */
      for(let tag of Object.keys(allTags)) {
        /*[NEW] generate code of a link and add it to allTagsHTMLT */
        //const tagLinkHTML = ' (' + calculateTagClass(allTags[tag], tagsParams) + ') ';
        //allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + opts.cloud.classPrefix + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>  ';
        // delete: allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + opts.cloud.classPrefix + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' (' + allTags[tag] + ')</a> (' + tagLinkHTML + ') </li>';
        //console.log(tagLinkHTML);
        //allTagsHTML += ' (' + allTags[tag] + ') ';
        allTagsData.tags.push({

          tag: tag,
          count: allTags[tag],
          className: calculateTagClass(allTags[tag], tagsParams),
          classPrefix: opts.cloudClassPrefix
        });

        /* [NEW] END LOOP: for each tags in allTags */
      }
      console.log('jestem za petla', allTagsData);
      /* [NEW] add html from allTagsHTML to tagList */
      tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
    const links = document.querySelectorAll(select.all.linksTo.tags);

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

  // new section for autorLinks
  function calculateAuthorParams(authors) {
    const params = {
      max: 0,
      min: 999999
    };
    for(let author in authors){
      console.log(author + ' is used ' + authors[author] + ' times');
      if(authors[author] > params.max) {
        params.max = authors[author];
      }
      if(authors[author] < params.min) {
        params.min = authors[author];
      }
    }
    return params;
  }
  function calculateAuthorClass(count, params) {
    const normalizedCount = count - params.min;
    console.log('normalizedCount', normalizedCount);

    const normalizedMax = params.max - params.min;
    console.log('normalizedMax', normalizedMax);

    const percentage = normalizedCount / normalizedMax;
    console.log('percentage %% : ', percentage);

    const classNumber = Math.floor(percentage * (opts.cloud.classCount.forAuthors - 1) + 1);
    return classNumber;
  }

  function generateAuthor() {
    console.log('Trying to generate author name');
    let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);

    /* for every article: */
    for(let article of articles) {
      console.log('jeden atykuł', article);

      /* find author place on article */
      const authorLink = article.querySelector(select.article.author);
      console.log('authorLink', authorLink);
      let html = '';
      console.log('blank html', html);

      /* get authors from author attribute */
      const articleAuthor = article.getAttribute('author');
      console.log('articleAuthor', articleAuthor);

      /* generate HTML of the link */
      //const linkHTML = '<a href="' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
      const linkHTMLData = {author: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);

      console.log('linkHTML', linkHTML);
      html = linkHTML;

      // eslint-disable-next-line no-prototype-builtins
      if(!allAuthors.hasOwnProperty(articleAuthor)) {
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      console.log('allAuthors', allAuthors);
      authorLink.innerHTML = html;

      const authorList =  document.querySelector(select.listOf.authors);
      console.log('lista autorów', authorList);

      const authorParams = calculateAuthorParams(allAuthors);
      console.log('authorParams', authorParams);

      //let allAuthorsHTML = '';

      const allAuthorsData = {authors: []};

      for(let author of Object.keys(allAuthors)) {
        //const authorLinkHTML = ' (' + calculateAuthorClass(allAuthors[author], authorParams) + ') ';
        //allAuthorsHTML += '<li><a href="#author-' + author + '" class="' + opts.cloud.classPrefix + calculateAuthorClass(allAuthors[author], authorParams) + '">' + author + '</a></li>  ';
        //console.log(authorLinkHTML);

        //allAuthorsHTML += ' (' + allAuthors[author] + ') ';
        allAuthorsData.tags.push({
          author: author,
          count: allAuthors[author],
          className: calculateTagClass(allAuthors[author], authorParams)
        });
      }
      //console.log('allAuthorsHTML', allAuthorsHTML);
      authorList.innerHTML = templates.authorCloudLink(allAuthorsData);

    }
  }
  generateAuthor();

  function authorClickHandler(event) {
    console.log('authorCLickHandler start working');
    event.preventDefault();

    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    console.log('href', href);
    const author = href.replace('#author-', '');

    console.log('Author:', author);
    const links = document.querySelectorAll(select.all.linksTo.authors);
    console.log('links of authors', links);
    for(let link of links) {
      link.classList.remove('active');
    }
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log('authorLinks', authorLinks);
    for(let authorLink of authorLinks) {
      authorLink.classList.add('active');
      console.log('show me active authorLink', authorLink);
    }
    console.log(author);

    generateTitleLinks('[author="' + author + '"]');
  }

  function addClickListenersToAuthors() {
    /* find all links to authors */
    const links = document.querySelectorAll('.authors a');
    /* START LOOP: for each link */
    for(let link of links) {

      /* add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
    }
  }
  addClickListenersToAuthors();
}
