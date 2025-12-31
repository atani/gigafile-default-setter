(() => {
  const VALID_DAYS = [7, 14, 30, 60, 100];

  // 保存期間セレクトボックスを検出
  function findDaysSelect() {
    const selects = document.querySelectorAll('select');
    for (const select of selects) {
      const options = Array.from(select.options);
      const values = options.map(opt => parseInt(opt.value, 10)).filter(v => !isNaN(v));

      // 保存期間のオプション（7, 14, 30, 60, 100）を含むセレクトボックスを検出
      const matchCount = VALID_DAYS.filter(day => values.includes(day)).length;
      if (matchCount >= 3) {
        return select;
      }
    }
    return null;
  }

  // デフォルト値を適用
  function applyDefault(select, defaultDays) {
    const options = Array.from(select.options);
    const targetOption = options.find(opt => parseInt(opt.value, 10) === defaultDays);

    if (targetOption) {
      select.value = targetOption.value;
      // changeイベントを発火
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  // メイン処理
  function init() {
    chrome.storage.sync.get({ defaultDays: 100 }, (result) => {
      const defaultDays = result.defaultDays;

      // 既存のセレクトボックスに適用
      const select = findDaysSelect();
      if (select) {
        applyDefault(select, defaultDays);
      }

      // 動的に追加される要素を監視
      const observer = new MutationObserver(() => {
        const select = findDaysSelect();
        if (select && select.value !== String(defaultDays)) {
          applyDefault(select, defaultDays);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  // DOMContentLoadedまたは即座に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
