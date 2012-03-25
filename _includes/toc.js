function generateTOC(insertBefore, heading) {
  var container = jQuery("<div id='toc-block'></div>");
  var div = jQuery("<ul id='toc'></ul>");
  var content = $(insertBefore).first();

  if (heading != undefined && heading != null) {
    container.append('<span class="toc-heading">' + heading + '</span>');
  }

  div.tableOfContents(content);
  container.append(div);
  container.insertBefore(insertBefore);
}
