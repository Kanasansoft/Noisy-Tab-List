chrome.tabs.query({audible: true}, (tabs) => {
  const ul = document.createElement('ul');
  ul.classList.add('tabs');
  tabs.forEach(tab => {
    const li = document.createElement('li');
    li.classList.add('tab');
    li.dataset.windowId = tab.windowId;
    li.dataset.tabId = tab.id;
    li.addEventListener('click', (e) => {
      const windowId = parseInt(li.dataset.windowId, 10);
      const tabId = parseInt(li.dataset.tabId, 10);
      chrome.windows.update(windowId, {focused: true});
      chrome.tabs.update(tabId, {selected: true});
      window.close();
    });
    const favIcon = document.createElement('img');
    favIcon.src = tab.favIconUrl;
    favIcon.classList.add('favicon');
    const title = document.createElement('span');
    title.textContent = tab.title;
    li.appendChild(favIcon);
    li.appendChild(title);
    ul.appendChild(li);
  });
  document.querySelector('#tab-list').appendChild(ul);
});
