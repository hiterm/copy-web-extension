import React from 'react';
import ReactDOM from 'react-dom';
import browser from 'webextension-polyfill';

const copyMarkdownLink = async () => {
  const tabs = await browser.tabs.query({ currentWindow: true, active: true });
  const tab = tabs[0];
  const markdownLink = `[${tab.title}](${tab.url})`;
  navigator.clipboard.writeText(markdownLink);
};

const App: React.VFC = () => (<button onClick={copyMarkdownLink}>Copy markdown link</button>);

ReactDOM.render(<App />, document.getElementById('root'));
