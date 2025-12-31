(() => {
  const VALID_DAYS = [3, 5, 7, 14, 30, 60, 100];

  // 保存期間ボタンを検出してクリック
  function findAndClickDaysButton(targetDays) {
    // 「〇日」のテキストを持つ要素を検索
    const targetText = `${targetDays}日`;

    // すべてのクリック可能な要素を検索
    const elements = document.querySelectorAll('a, button, span, div, li');

    for (const el of elements) {
      // テキストが完全一致する要素を探す
      if (el.textContent.trim() === targetText) {
        // 既に選択されているかチェック（背景色やクラスで判断）
        const style = window.getComputedStyle(el);
        const isSelected = el.classList.contains('selected') ||
                          el.classList.contains('active') ||
                          style.backgroundColor.includes('rgb(2');  // オレンジ系

        if (!isSelected) {
          el.click();
          console.log(`[GigaFile Default Setter] ${targetText}を選択しました`);
          return true;
        } else {
          console.log(`[GigaFile Default Setter] ${targetText}は既に選択されています`);
          return true;
        }
      }
    }
    return false;
  }

  // メイン処理
  function init() {
    chrome.storage.sync.get({ defaultDays: 100 }, (result) => {
      const defaultDays = result.defaultDays;
      let applied = false;

      // 初回試行
      const tryApply = () => {
        if (!applied && findAndClickDaysButton(defaultDays)) {
          applied = true;
        }
      };

      // 少し遅延して実行（ページの読み込み完了を待つ）
      setTimeout(tryApply, 500);
      setTimeout(tryApply, 1000);
      setTimeout(tryApply, 2000);

      // 動的に追加される要素を監視
      const observer = new MutationObserver(() => {
        if (!applied) {
          tryApply();
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
