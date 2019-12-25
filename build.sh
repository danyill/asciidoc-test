#!/bin/bash
while sleep 1 ;
  do find . -name '*.adoc' | entr -d asciidoctor-pdf --template-require ./base/template.js -S unsafe asciidoctor-cheat-sheet.adoc; 
done

