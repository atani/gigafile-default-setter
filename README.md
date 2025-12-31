# GigaFile Default Setter

ギガファイル便（gigafile.nu）の保存期間デフォルト値を自動設定するChrome拡張機能

## 機能

- ギガファイル便にアクセス時、保存期間を自動的に設定値に変更
- 7日 / 14日 / 30日 / 60日 / 100日 から選択可能
- 設定はブラウザに保存され、デバイス間で同期

## インストール

### Chrome Web Store（公開後）
[Chrome Web Store](#) からインストール

### 開発版
1. このリポジトリをクローン
   ```bash
   git clone https://github.com/atani/gigafile-default-setter.git
   ```
2. Chromeで `chrome://extensions/` を開く
3. 右上の「デベロッパーモード」をON
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. クローンしたフォルダを選択

## 使い方

1. ツールバーの拡張機能アイコンをクリック
2. 保存期間のデフォルト値を選択（初期値: 100日）
3. ギガファイル便を開くと自動的に設定が適用される

## 開発

```bash
# アイコン生成
npm install
node scripts/generate-icons.js

# スクリーンショット生成
node scripts/generate-screenshots.js

# ZIPパッケージ作成
zip -r gigafile-default-setter.zip manifest.json popup/ content/ icons/
```

## ライセンス

MIT
