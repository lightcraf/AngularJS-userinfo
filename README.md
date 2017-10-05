# AngularJS-userinfo

Задача: реализовать приложение для вывода списка существующих пользователей и добавления новых.

Средства разработки: AngularJS 1.5, Bootstrap (необязательно).

Функционал:

•         загрузка пользователей по запросу
    {
          url: ‘https://jsonplaceholder.typicode.com/users’
          method: ‘GET’
    };
    
•         поиск пользователей по: ‘name’, ‘username’, ‘email’;

•         сортировка ‘name’ (по умолчанию), ‘username’, ‘email’, ‘address.street’, ‘company.name’ по алфавиту, с возможностью переключения нисходящей и восходящей;

•         вместо ‘address.geo’ показать расстояние от текущего местоположения;

•         форма добавления пользователя отображается в модальном окне; все поля кроме ‘id’ доступны для заполнения; ‘id’ должен быть сгенерирован при сохранении.

Валидация полей формы:

•         name – обязательное;

•         username – обязательное, уникальное;

•         email – обязательное, уникальное;

•         phone – в формате ‘(ххх) ххх-хххх’;

•         website – в формате ‘<website_name>.<domain>’;
  
•         company.name – обязательное, уникальное;
