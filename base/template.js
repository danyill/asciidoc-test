const stemContent = require('./stem')

const footnotes = (node) => {
  if (node.hasFootnotes() && !(node.isAttribute('nofootnotes'))) {
    return `<div id="footnotes">
        <hr/>
        ${node.getFootnotes().map((footnote) => `<div class="footnote" id="_footnotedef_${footnote.getIndex()}">
        <a href="#_footnoteref_${footnote.getIndex()}">${footnote.getIndex()}</a>. ${footnote.getText()}
        </div>`).join('')}
      </div>`
  }
  return ''
}

const getAuthors = function (node) {
  const result = [];
  const authorCount = node.getAttribute('authorcount')
  if (authorCount > 1) {
    for (let index = 1; index < authorCount + 1; index++) {
      const author = node.getAttribute(`author_${index}`)
      const email = node.getAttribute(`email_${index}`)
      const bio = node.getAttribute(`authorbio_${index}`)
      let twitter;
      if (email && email.startsWith("https://twitter.com/")) {
        twitter = email.replace("https://twitter.com/", "");
      }
      result.push({ name: author, email: email, bio: bio, twitter: twitter })
    }
  } else {
    const author = node.getAttribute('author')
    const email = node.getAttribute('email')
    const bio = node.getAttribute(`authorbio`)
    let twitter;
    if (email && email.startsWith("https://twitter.com/")) {
      twitter = email.replace("https://twitter.com/", "");
    }
    result.push({ name: author, email: email, bio: bio, twitter: twitter })
  }
  return result;
}

const renderAuthors = function (authors) {
  return authors.map(author => {
    return `<div class="author">
<div class="author-avatar"><img src="http://avatars.io/twitter/${author.twitter}"/></div>
<div class="author-name"><a href="${author.email}">@${author.twitter}</a></div>
<div class="author-bio">${author.bio}</div>
</div>
`;
  }).join('\n')
}

module.exports = {
  paragraph: (node) => `<p class="${node.getRoles().join(' ')}">${node.getContent()}</p>`,
  document: (node) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link href="./base/prism.css" rel="stylesheet">
<link href="./base/style.css" rel="stylesheet">
</head>
<body>
<header>
  <img class="wordmark" src="./media/byline.jpeg"/>
  <h1>${node.getTitle()}</h1>
  <p>version: <code>${node.getRevisionNumber()}</code></p>
  <a class="website" href="https://asciidoctor.org/">asciidoctor.org</a>
  <img class="logo" src="./media/logo-fill-color.svg"/>
</header>
<section class="content">
${node.getContent()}
<div class="sect1 authors">
<h2>Footnotes</h2>
${footnotes(node)}
</section>
${stemContent.content(node)}
<script src="./base/prism.js"></script>
</body>
</html>`
}


