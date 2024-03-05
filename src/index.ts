// Import the MarkdownIt type from 'markdown-it'
import MarkdownIt from 'markdown-it'
import { parseFencedCodeContent } from './inspect';

// Define your plugin
export default function mdItObsidianDataviewToTWMacro(md: MarkdownIt): void {
    console.log('mdItObsidianDataviewToTWMacro plugin loaded');

    md.core.ruler.after('block', 'obsidian-dataview', (state) => {
        const tokens = state.tokens;
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (token.type === 'fence') {
                parseFencedCodeContent(tokens, i, md);
            }
        }
    });
}
