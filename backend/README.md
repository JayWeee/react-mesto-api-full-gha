# Mesto API
Rest API созданное для проекта [Mesto](https://project.mesto.students.nomoreparties.sbs/)  
Ссылка на frontend часть: https://github.com/JayWeee/react-mesto-api-full-gha/tree/main/frontend


## Директории
`/routes` — папка с файлами роутера.  
`/controllers` — папка с файлами контроллеров пользователя и карточки.   
`/models` — папка с файлами описания схем пользователя и карточки.  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком.

## Роуты
| Метод | Роут | Описание | Значения |
| :---: | :--: | :------: | :------: |
|  GET  | `/users` | Возвращает данные всех пользователей |
|  GET  | `/users/me` | Возвращает данные пользователя (name, about, avatar, _id, email) |
|  GET  | `/users/:userId` | Возвращает данные пользователя по id | _id пользователя_ |
| PATCH | `/users/me`  | Обновляет данные пользователя | _name, about_ |
| PATCH | `/users/me/avatar` | Обновляет данные пользователя | _avatar(ссылка)_ |
|  GET  | `/cards` | Возвращает список карточек |
| POST  | `/cards` | Создает карточку | _name, link(ссылка на картинку)_ |
| DELETE | `/cards/:cardId` | Удаляет карточку по id | _id карточки_ |
|  PUT  | `/cards/:cardId/likes` | Добавляет лайк карточке | _id карточки_ |
| DELETE | `/cards/:cardId/likes` | Удаляет лайк с карточки | _id карточки_ |

## Используемые технологии:
- ExpressJs
- MongoDB
- mongooose
- jsonwebtoken
- nodemon
- celebrate
- Joi
- validator
- dotenv
- cors
