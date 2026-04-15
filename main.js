/**
 * Puter.js を使用した猫画像生成メインロジック
 */

async function generateImage() {
  const promptInput = document.getElementById('prompt-input');
  const generateBtn = document.getElementById('generate-btn');
  const imageContainer = document.getElementById('image-container');
  const placeholder = document.getElementById('placeholder-text');

  const prompt = promptInput ? promptInput.value : 'a cute cat';

  try {
    // ロード状態の表示
    generateBtn.disabled = true;
    generateBtn.textContent = '生成中...';
    generateBtn.classList.add('loading');
    if (placeholder) placeholder.style.display = 'none';

    console.log(`Generating image with Puter.js: ${prompt}...`);

    // Puter.js の AI API を使用して画像を生成
    // txt2img は HTMLImageElement を返します
    const img = await puter.ai.txt2img(prompt);

    // コンテナをクリアして画像を挿入
    imageContainer.innerHTML = '';
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.display = 'block';
    imageContainer.appendChild(img);

  } catch (error) {
    console.error('生成フローでエラーが発生しました:', error);
    alert(`エラーが発生しました: ${error.message}`);
    if (placeholder) placeholder.style.display = 'block';
  } finally {
    // 状態を元に戻す
    generateBtn.disabled = false;
    generateBtn.textContent = '猫画像を生成';
    generateBtn.classList.remove('loading');
  }
}

/**
 * 初期化処理
 */
document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate-btn');
  if (generateBtn) {
    generateBtn.addEventListener('click', generateImage);
  } else {
    console.error('生成ボタンが見つかりませんでした。');
  }
});
