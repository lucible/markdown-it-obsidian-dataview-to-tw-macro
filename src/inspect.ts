import MarkdownIt, { Token } from 'markdown-it';

// Define the function to inspect fenced code content
export function parseFencedCodeContent(tokens: Token[], startIdx: number, md: MarkdownIt) {
    const token = tokens[startIdx];

    // Check if the fenced code block is for dataview
    if (token.info && token.info.trim() === 'dataview') {
        // Convert dataview code to TiddlyWiki code
        const content = token.content.trim();
        const lines = content.split('\n');
        let tag = '';
        for (let line of lines) {
            if (line.includes('FROM')) {
                tag = line.replace('FROM', '').trim().replace('#', ''); // Extract the tag
                break;
            }
        }
        const tiddlyWikiCode = `<<list-links "[tag[${tag}]sort[title]]">>`;

        // Replace the fenced code block with TiddlyWiki code
        tokens[startIdx].content = tiddlyWikiCode;
    }
}
