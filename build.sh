#!/bin/bash
while sleep 1 ;
  do find . -name '*.adoc' -or -name '*.js' -or -name '*.css'| entr -d ./node_modules/.bin/asciidoctor-web-pdf -v -t --template-require ./base/template.js --require ./base/inline-code.js -S unsafe asciidoctor-cheat-sheet.adoc;
done

