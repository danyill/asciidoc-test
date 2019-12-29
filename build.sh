#!/bin/bash
while sleep 1 ;
  do find . -name '*.adoc' -or -name '*.js' -or -name '*.css'| entr -d asciidoctor-pdf --template-require ./base/template.js -S unsafe asciidoctor-cheat-sheet.adoc; 
done

