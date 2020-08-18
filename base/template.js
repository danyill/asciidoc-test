const stemContent = require('./stem')

// not currently used
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
  <a class="website" href="https://asciidoctor.org/"><img class="logo" width="40" src="./media/logo-fill-color.svg"/></a>
  <h1 class="title">${node.getTitle()}</h1>
  <span class="versioning">
  <!-- <p>AsciiDoc is a Trademark of the Eclipse Foundation, Inc.</p> -->
  <p>Cheatsheet version <br/><code>${node.getRevisionNumber()}</code></p>
  <p>Asciidoctor version <br/><code>${node.getAttribute('asciidoctor-version')}</code></p>
  </span>
</header>
<section class="content">
${node.getContent()}
<div class="sect1 authors">
</section>
<footer>
</footer>
${stemContent.content(node)}
<script src="./base/prism.js"></script>
</body>
</html>`

// If we decide to have footnotes
// <h2>Footnotes</h2>
// ${footnotes(node)}

}


