// 첨부 순서대로 프로젝트 미리보기 이미지를 연결합니다.
const projectImages = [1, 2, 3, 4, 5].map(index => `./assets/project-${index}.jpg`);
const items = [...document.querySelectorAll('.project-item')];
function showProject(active) {
  items.forEach(item => {
    const open = item === active;
    item.querySelector('.project-trigger').setAttribute('aria-expanded', String(open));
    item.querySelector('.project-preview').hidden = !open;
  });
}
items.forEach((item, index) => {
  const button = item.querySelector('button');
  if (projectImages[index]) {
    const image = item.querySelector('img');
    image.addEventListener('load', () => {
      image.hidden = false;
      item.querySelector('.preview-placeholder').hidden = true;
    });
    image.addEventListener('error', () => { image.hidden = true; item.querySelector('.preview-placeholder').hidden = false; });
    image.src = projectImages[index];
  }
  item.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') showProject(item);
  });
  item.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse' && !item.contains(document.activeElement)) showProject(null);
  });
  button.addEventListener('focus', () => showProject(item));
  button.addEventListener('click', event => {
    if (event.pointerType === 'mouse') { showProject(item); return; }
    // 터치로 발생한 focus 때문에 바로 닫히지 않도록 pointerdown 때의 상태를 사용합니다.
    const wasOpen = button.dataset.wasOpen === 'true';
    if (event.detail === 0) showProject(item);
    else showProject(wasOpen ? null : item);
  });
  button.addEventListener('pointerdown', () => {
    button.dataset.wasOpen = button.getAttribute('aria-expanded');
  });
  item.addEventListener('focusout', event => {
    if (!item.contains(event.relatedTarget)) showProject(null);
  });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') showProject(null);
});
document.addEventListener('pointerdown', event => {
  if (!event.target.closest('.project-item')) showProject(null);
});
