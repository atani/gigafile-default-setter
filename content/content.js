(() => {
  console.log('[GigaFile Default Setter] content script loaded');

  const VALID_DAYS = [3, 5, 7, 14, 30, 60, 100];

  // 保存期間ボタンを検出してクリック
  function findAndClickDaysButton(targetDays) {
    // data-lifetime-val属性を持つli要素を直接検索（より確実）
    const targetElement = document.querySelector(`li[data-lifetime-val="${targetDays}"]`);

    if (targetElement) {
      // 現在の選択値を確認
      const currentValue = document.querySelector('#file_lifetime')?.value;
      if (currentValue === String(targetDays)) {
        console.log(`[GigaFile Default Setter] ${targetDays}日は既に選択されています`);
        return true;
      }

      targetElement.click();
      console.log(`[GigaFile Default Setter] ${targetDays}日を選択しました`);
      return true;
    }

    console.log(`[GigaFile Default Setter] ${targetDays}日のボタンが見つかりません`);
    return false;
  }

  // メイン処理
  function init() {
    console.log('[GigaFile Default Setter] init() called');

    chrome.storage.sync.get({ defaultDays: 100 }, (result) => {
      if (chrome.runtime.lastError) {
        console.error('[GigaFile Default Setter] storage error:', chrome.runtime.lastError);
        return;
      }

      const defaultDays = result.defaultDays;
      console.log(`[GigaFile Default Setter] defaultDays: ${defaultDays}`);
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
