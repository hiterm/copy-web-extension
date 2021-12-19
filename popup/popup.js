const copyMarkdownLink = async () => {
  const tabs = await browser.tabs.query({currentWindow: true, active: true});
  const tab = tabs[0];
  const markdownLink = `[${tab.title}](${tab.url})`;
  navigator.clipboard.writeText(markdownLink);
};
const copyMarkdownButton = document.querySelector('#copy-markdown-button');
copyMarkdownButton.addEventListener('click', copyMarkdownLink);
