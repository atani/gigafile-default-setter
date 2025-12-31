document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('defaultDays');
  const status = document.getElementById('status');

  // 保存された設定を読み込み
  chrome.storage.sync.get({ defaultDays: 100 }, (result) => {
    select.value = result.defaultDays;
  });

  // 設定変更時に保存
  select.addEventListener('change', () => {
    const value = parseInt(select.value, 10);
    chrome.storage.sync.set({ defaultDays: value }, () => {
      status.textContent = '保存しました';
      status.classList.add('show');
      setTimeout(() => {
        status.classList.remove('show');
      }, 2000);
    });
  });
});
