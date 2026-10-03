(() => {
  const links = Array.from(document.querySelectorAll('.gallery-image'));
  const viewer = document.querySelector('.image-viewer');
  if (!viewer || !links.length || typeof viewer.showModal !== 'function') return;
  const image = viewer.querySelector('.viewer-stage img');
  const caption = viewer.querySelector('.viewer-caption');
  const counter = viewer.querySelector('.viewer-counter');
  const original = viewer.querySelector('.viewer-original');
  let current = 0, opener;
  function display(index) {
    current = (index + links.length) % links.length;
    const link = links[current];
    image.src = link.href;
    image.alt = link.dataset.caption;
    caption.textContent = link.dataset.caption;
    counter.textContent = `${current + 1} / ${links.length}`;
    original.href = link.href;
  }
  links.forEach((link, index) => link.addEventListener('click', event => {
    // Preserve normal new-tab and download behaviour.
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); opener = link; display(index);
    viewer.showModal(); document.body.classList.add('viewer-open');
    viewer.querySelector('.viewer-close').focus();
  }));
  viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
  viewer.querySelector('.viewer-prev').addEventListener('click', () => display(current - 1));
  viewer.querySelector('.viewer-next').addEventListener('click', () => display(current + 1));
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); display(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  viewer.addEventListener('close', () => {
    document.body.classList.remove('viewer-open');
    opener?.focus(); image.removeAttribute('src');
  });
})();
