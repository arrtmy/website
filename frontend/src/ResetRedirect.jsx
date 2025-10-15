import { useEffect } from 'react';

const ResetRedirect = () => {
  useEffect(() => {
    // Получаем параметры из URL
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const token = params.get('token');
    // Формируем deep link
    const deepLink = `dostavka://reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
    // Переход по deep link
    window.location.href = deepLink;
    // Показываем инструкцию, если приложение не открылось
    setTimeout(() => {
      document.getElementById('fallback').style.display = 'block';
    }, 2000);
  }, []);

  // Вспомогательная инструкция для пользователя
  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h2>Переход в приложение...</h2>
      <div id="fallback" style={{ display: 'none' }}>
        <p>Если приложение не открылось автоматически, скопируйте ссылку ниже и откройте её вручную:</p>
        <code>
          {`dostavka://reset-password?email=${new URLSearchParams(window.location.search).get('email')}&token=${new URLSearchParams(window.location.search).get('token')}`}
        </code>
      </div>
    </div>
  );
};
export default ResetRedirect;