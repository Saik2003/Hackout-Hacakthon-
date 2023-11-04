const selectionMenu = document.getElementById('lang-selection-menu');

const handleSelectionChange = () => {
    const selectedValue = selectionMenu.value;
    chrome.storage.sync.set({
        'codie-preferred-lang': selectedValue
    });
};

const initSelection = () => {
    chrome.storage.sync.get('codie-preferred-lang', (result) => {
        if (result['codie-preferred-lang']) {
            let storedValue = result['codie-preferred-lang'];
            selectionMenu.value = storedValue;
        }
    });
};

initSelection();
selectionMenu.addEventListener('change', handleSelectionChange);

const clearChatBtn = document.getElementById('clear-chat-btn');

clearChatBtn.addEventListener('click', handleClearChatClick);

function handleClearChatClick() {
    const confirmed = window.confirm('This will clear all chats across all your devices. Are you sure?');
    if (confirmed) {
        chrome.storage.sync.get(null, (items) => {
            for (const key in items) {
                if (key.endsWith('messages')) {
                    chrome.storage.sync.remove(key);
                }
            }
        });
        alert('Chats Cleared');
    }
}
