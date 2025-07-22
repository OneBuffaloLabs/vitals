// src/lib/formatter.ts
/**
 * @file Provides utility functions for formatting content.
 */

/**
 * Pretty-prints an XML string with indentation.
 * @param xml The XML string to format.
 * @returns A formatted XML string.
 */
export function prettyPrintXml(xml: string): string {
  let formatted = '';
  let indent = '';
  const tab = '  '; // Two spaces for indentation

  xml.split(/>\s*</).forEach((node) => {
    if (node.match(/^\/\w/)) {
      // Closing tag
      indent = indent.substring(tab.length);
    }
    formatted += indent + '<' + node + '>\r\n';
    if (node.match(/^<?\w[^>]*[^\/]$/)) {
      // Opening tag
      indent += tab;
    }
  });

  return formatted.substring(1, formatted.length - 3);
}
