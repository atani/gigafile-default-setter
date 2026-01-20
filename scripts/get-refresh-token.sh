#!/bin/bash
# Chrome Web Store API の refresh_token を取得するスクリプト
#
# 使い方:
#   1. CLIENT_ID と CLIENT_SECRET を設定
#   2. ./scripts/get-refresh-token.sh を実行
#   3. ブラウザで認証
#   4. リダイレクトURLからcodeをコピーして入力
#   5. refresh_token が表示される

CLIENT_ID="YOUR_CLIENT_ID"
CLIENT_SECRET="YOUR_CLIENT_SECRET"

# 認証URL
AUTH_URL="https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&client_id=${CLIENT_ID}&redirect_uri=urn:ietf:wg:oauth:2.0:oob"

echo "以下のURLをブラウザで開いて認証してください："
echo ""
echo "$AUTH_URL"
echo ""
echo "認証後に表示されるコードを入力してください："
read CODE

# refresh_token を取得
RESPONSE=$(curl -s -X POST "https://oauth2.googleapis.com/token" \
  -d "client_id=${CLIENT_ID}" \
  -d "client_secret=${CLIENT_SECRET}" \
  -d "code=${CODE}" \
  -d "grant_type=authorization_code" \
  -d "redirect_uri=urn:ietf:wg:oauth:2.0:oob")

echo ""
echo "レスポンス:"
echo "$RESPONSE" | jq .

REFRESH_TOKEN=$(echo "$RESPONSE" | jq -r '.refresh_token')

if [ "$REFRESH_TOKEN" != "null" ]; then
  echo ""
  echo "=========================================="
  echo "refresh_token: $REFRESH_TOKEN"
  echo "=========================================="
  echo ""
  echo "この値を GitHub Secrets の CHROME_REFRESH_TOKEN に設定してください"
fi
