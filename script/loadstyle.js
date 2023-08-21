// захешируем url, чтобы при открытии модалки повторно не создавался тэг link
const styles = new Map();

const loadstyle = (url) => {
  // проверяем есть ли такой url в хэше
  // ЕСЛИ уже не первый вызов
  if (styles.has(url)) {
    return styles.get(url);
  }

  const stylePromise = new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.addEventListener('load', () => {
      resolve();
    });
    document.head.append(link);
    // добавляем в хэш url, когда вызываем ф-ю
  });
  styles.set(url, stylePromise);

  return stylePromise;
};

export default loadstyle;
