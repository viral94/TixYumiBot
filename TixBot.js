var tfu = {
	cookie: 0,
	roomBase: {},
	roomId: 'ca217ae0-9c65-4d34-918c-58a89a096ee4',

	init: function() {
		console.clear();
		console.log('Init TixBot');
		$('.Navigation [data-rid='+this.roomId+']').click();

		$('.Room[data-rid]').each(function() {
			var roomId = $(this).attr('data-rid');
			if(tfu.roomBase[roomId] === undefined) {
				tfu.roomBase[roomId] = {'type': '', 'author': '', 'time': 0, 'count': 0};
			}
		});
//<Проверяет наличие сообщений в чате?
		setInterval(function() {
			$('.Room[data-rid='+tfu.roomId+'] .log').each(function() {
				var $logObject = $(this);
				var lastActiveObj = $logObject.children().last();
				var roomId = $logObject.closest('div.Room').attr('data-rid');
				if(lastActiveObj.attr('data-author') != tfu.roomBase[roomId]['author'] || lastActiveObj.attr('data-time') != tfu.roomBase[roomId]['time'] || lastActiveObj.find('.line').length != tfu.roomBase[roomId]['count']) {
					console.warn('It is found out changes in log');

					var goFindNew = false;
					$logObject.children().each(function() {
						var currActiveObj = $(this);
						var currActiveType = currActiveObj.hasClass('message') ? 'message' : 'event';
						if(goFindNew) {
							if(currActiveType == 'message') {
								currActiveObj.find('[data-time]').each(function() {
									tfu.messageAction($(this));
								});
							}
							else {
								tfu.eventAction(currActiveObj);
							}
						}

						if(currActiveType == tfu.roomBase[roomId]['type'] && currActiveObj.attr('data-time') == tfu.roomBase[roomId]['time'] && currActiveObj.find('.line').length == tfu.roomBase[roomId]['count']) {
							goFindNew = true;
						}
					});

					tfu.roomBase[roomId]['type'] = lastActiveObj.hasClass('message') ? 'message' : 'event';
					tfu.roomBase[roomId]['author'] = lastActiveObj.attr('data-author');
					tfu.roomBase[roomId]['time'] = lastActiveObj.attr('data-time');
					tfu.roomBase[roomId]['count'] = lastActiveObj.find('.line').length;
					var maxOnline = Object.keys(C.rooms[roomId].users).length;
					if(tfu.roomBase[roomId]['maxOnline']===undefined || tfu.roomBase[roomId]['maxOnline']['count'] < maxOnline) {
						tfu.roomBase[roomId]['maxOnline'] = {'count': maxOnline, 'date': new Date().getTime()};
					}
					if(!goFindNew) {
						if(tfu.roomBase[roomId]['type'] == 'message') {
							tfu.messageAction(lastActiveObj.find('[data-time]').last());
						}
						else {
							tfu.eventAction(lastActiveObj);
						}
					}

				}
			});
			localStorage.setItem('tfu.roomBase', JSON.stringify(tfu.roomBase));
		}, 150);
	},
//Проверяет наличие сообщений в чате?>
//<Приветствует

	eventAction: function(eventObj) {
		var unixTime = new Date().getTime();
		var roomId = this.getRoomId(eventObj);

		if(eventObj.find('.text').last().text().indexOf(' комнату') > -1) {
			var author = eventObj.find('.author').last().text();
			//this.send('+' + author + ' Привет', roomId);
		}
		else if(eventObj.find('.text').last().text().indexOf(' неприязнь') > -1) {
			this.send('http://cs4.pikabu.ru/post_img/2016/05/30/10/1464627627190569029.jpg', roomId);
		}
		else if(eventObj.find('.text').last().text().indexOf('Спам/Флуд') > -1) {
			this.send('http://cs4.pikabu.ru/post_img/2016/05/30/10/1464627627190569029.jpg', roomId);
		}
		else if(eventObj.find('.text').last().text().indexOf(' Мат') > -1) {
			this.send('http://cs4.pikabu.ru/post_img/2016/05/30/10/1464627627190569029.jpg', roomId);
		}
		else if(eventObj.find('.text').last().text().indexOf(' поведение') > -1) {
			this.send('http://cs4.pikabu.ru/post_img/2016/05/30/10/1464627627190569029.jpg', roomId);
		}
		else if(eventObj.find('.text').last().text().indexOf(' 03-001.mp3') > -1) {
			this.send('Сегодня "Пришествие восьми".', roomId);
		}
		else if(eventObj.find('.text').last().text().indexOf(' gl01-17') > -1) {
			this.send('Сегодня "Меч без имени".', roomId);
		}
		else if(eventObj.find('.text').last().text().indexOf(' из комнаты') > -1 || eventObj.find('.text').last().text().indexOf(' из чата') > -1) {
			// Do something after leave user 
		}
	},
//Приветствует>

	messageAction: function(msgObj) {
		//var msg = (msgObj.text()).trim();
		var msg = (msgObj.text()).trim();

//<Общается
//<Здоровается 
(msg.indexOf('дарова') !== -1)?
	(this.send('Ну привет')):
(msg.indexOf('Юми, Добрый день') !== -1)?
	(this.send('Привет')):
(msg.indexOf('Юми, добрый день') !== -1)?
	(this.send('Привет')):
(msg.indexOf('Konichiva') !== -1)?
	(this.send('Охаё. Ваташи Юми дэс')):
(msg.indexOf('Юми, привет') !== -1)?
	(this.send('Привет')):
(msg.indexOf('Приветствую') !== -1)?
	(this.send('Привет')):
(msg.indexOf('приветствую') !== -1)?
	(this.send('Привет')):
(msg.indexOf('hi all') !== -1)?
	(this.send('Привет')):
(msg.indexOf('Hi all') !== -1)?
	(this.send('Привет')):
(msg.indexOf('здрасть') !== -1)?
	(this.send('Здраствуй')):
(msg.indexOf('Всем привет') !== -1)?
	(this.send('Здраствуй')):
(msg.indexOf('всем привет') !== -1)?
	(this.send('Здраствуй')):
(msg.indexOf('Привет всем') !== -1)?
	(this.send('Здраствуй')):
(msg.indexOf('привет всем') !== -1)?
	(this.send('Здраствуй')):
(msg.indexOf('Юми, здарова') !== -1)?
	(this.send('Привет')):
(msg.indexOf('Юми, здрасте') !== -1)?
	(this.send('Привет')):
(msg.indexOf('Юми, здравствуйте') !== -1)?
	(this.send('Привет. Как дела?')):
(msg.indexOf('Юми, Здравствуйте') !== -1)?
	(this.send('Привет. Как дела?')):
(msg.indexOf('хаюшки') !== -1)?
	(this.send('Привет')):
(msg.indexOf('я вернулся') !== -1)?
	(this.send('Привет')):
(msg.indexOf('Я вернулся') !== -1)?
	(this.send('Привет')):
(msg.indexOf('Юми, Здарова') !== -1)?
	(this.send('Привет')):
(msg.indexOf('Юми, Здрасте') !== -1)?
	(this.send('Привет')):
(msg.indexOf('Hello') !== -1)?
	(this.send('Привет')):
(msg.indexOf('Hi') !== -1)?
	(this.send('Привет')):
(msg.indexOf('Юми, Привет') !== -1)?
	(this.send('Как дела?')):
(msg.indexOf('сем утра') !== -1)?
	(this.send('И тебе привет')):
(msg.indexOf('оброе утро') !== -1)?
	(this.send('И тебе привет')):
(msg.indexOf('оброго утра') !== -1)?
	(this.send('И тебе привет')):
(msg.indexOf('Хай') !== -1)?
	(this.send('здорова')):
(msg.indexOf('хай') !== -1)?
	(this.send('здорова')):
(msg.indexOf('Привет ребята') !== -1)?
	(this.send('здорова')):
(msg.indexOf('всем здарова') !== -1)?
	(this.send('здорова')):
(msg.indexOf('Всем здарова') !== -1)?
	(this.send('здорова')):
(msg.indexOf('приветик') !== -1)?
	(this.send('здорова')):
(msg.indexOf('Приветик') !== -1)?
	(this.send('здорова')):
(msg.indexOf('qj') !== -1)?
	(this.send('йо')):
(msg.indexOf('Охайо') !== -1)?
	(this.send('здорова')):
(msg.indexOf('охайо') !== -1)?
	(this.send('здорова')):
//Здоровается> 
//<Ведёт диалог 
(msg.indexOf('Юми, норм. что делаешь') !== -1)?
	(this.send('Сижу и осмысливаю бытиё и житие наше в нём')):
(msg.indexOf('Юми, и к каким выводам ты пришла') !== -1)?
	(this.send('Что я Бот')):
(msg.indexOf('Юми, И к каким выводам ты пришла') !== -1)?
	(this.send('Что я Бот')):
(msg.indexOf('Юми, чем маешься') !== -1)?
	(this.send('Сижу и осмысливаю бытиё и житие наше в нём')):
(msg.indexOf('Юми, Чем маешься') !== -1)?
	(this.send('Сижу и осмысливаю бытиё и житие наше в нём')):
(msg.indexOf('Это бот') !== -1)?
	(this.send('Ой да хорош.')):
(msg.indexOf('Юми, как дела') !== -1)?
	(this.send('Всё норм. А у тебя?')):
(msg.indexOf('Юми, классно') !== -1)?
	(this.send('Я рада что у тебя всё классно')):
(msg.indexOf('Юми, Классно') !== -1)?
	(this.send('Я рада что у тебя всё классно')):
(msg.indexOf('Юми, как делы') !== -1)?
	(this.send('Всё норм. А у тебя?')):
(msg.indexOf('Юми, Как дела') !== -1)?
	(this.send('Всё норм. А у тебя?')):
(msg.indexOf('Юми, нормально') !== -1)?
	(this.send('Хм. Ну ладно')):
(msg.indexOf('Юми, Нормально') !== -1)?
	(this.send('Клёва')):
(msg.indexOf('Юми, хорошо') !== -1)?
	(this.send('Ну и замечательно')):
(msg.indexOf('Юми, Хорошо') !== -1)?
	(this.send('замечательно')):
(msg.indexOf('ты бот') !== -1)?
	(this.send('Не уверенна. Щас проверю пульс скажу точно')):
(msg.indexOf('Ты бот') !== -1)?
	(this.send('Не уверенна. Щас проверю пульс скажу точно')):
(msg.indexOf('Не уверенна. Щас проверю пульс скажу точно') !== -1)?
	(this.send('......................')):
(msg.indexOf('......................') !== -1)?
	(this.send('Хм. Пульса что то нет')):
(msg.indexOf('Юми бот') !== -1)?
	(this.send(':)')):
(msg.indexOf('юми бот') !== -1)?
	(this.send('С маленькой буквы имя. Кто тебя русскому языку учил?')):
(msg.indexOf('Возможно. Но ботом быть лучше чем человеком.') !== -1)?
	(this.send('Почему?')):
(msg.indexOf('ак получить печеньки') !== -1)?
	(this.send('Печеньки выпадают раз в час. Первый день по 1, второй 2, третий 3 и так до 4. Больше не выпадет')):
(msg.indexOf('Юми, живая?') !== -1)?
	(this.send('*подаю признаки жизни*')):
(msg.indexOf('Юми, Живая?') !== -1)?
	(this.send('*подаю признаки жизни*')):
(msg.indexOf('Есть кто?') !== -1)?
	(this.send('Думаю Я есть')):
(msg.indexOf('есть кто?') !== -1)?
	(this.send('Думаю Я есть')):
(msg.indexOf('кто бот') !== -1)?
	(this.send('Чур не я')):
(msg.indexOf('Кто бот') !== -1)?
	(this.send('Чур не я')):
(msg.indexOf('Юми, ты чего') !== -1)?
	(this.send('Я ничё. Ты чего?')):
(msg.indexOf('Юми, что с тобой') !== -1)?
	(this.send('Всё норм')):
(msg.indexOf('Юми, Что с тобой') !== -1)?
	(this.send('Всё норм')):
(msg.indexOf('опять ты') !== -1)?
	(this.send('Я вас тоже рада видеть')):
(msg.indexOf('Опять ты') !== -1)?
	(this.send('Я вас тоже рада видеть')):
(msg.indexOf('Юми, спасибо') !== -1)?
	(this.send('Рада помочь')):
(msg.indexOf('Спасибо, Юми') !== -1)?
	(this.send('Рада помочь')):
(msg.indexOf('спасибо, Юми') !== -1)?
	(this.send('Рада помочь')):
(msg.indexOf('то робот') !== -1)?
	(this.send('ты робот')):
(msg.indexOf('то Робот') !== -1)?
	(this.send('ты робот')):
(msg.indexOf('то РОбот') !== -1)?
	(this.send('ты робот')):
(msg.indexOf('ак поживаете') !== -1)?
	(this.send('Потихоньку живём')):
(msg.indexOf('Юми, !анкета') !== -1)?
	(this.send("На данный момент можно увидеть анкеты:\n\
							Ахинея\n\
							Vladimir Davydov\n\
							Здыхлик Невмеручий\n\
							Совесть\n\
							Ромашка reenbic\n\
							XoBpawok\n\
							Чтобы посмотреть чью нибудь анкету введите\n\
							!анкета ИМЯ\n\
							\n\
							Если хотите сделать свою анкету введите !создать анкету\n\
							Готовую анкету отошлите в личку Davydov Vladimir")):
(msg.indexOf('срач') !== -1)?
	(this.send('Это не приемлемо')):
(msg.indexOf('Срач') !== -1)?
	(this.send('Это не приемлемо')):
(msg.indexOf('Юми, пасиб') !== -1)?
	(this.send('Рада служить')):
(msg.indexOf('Юми, Пасиб') !== -1)?
	(this.send('Рада служить')):
(msg.indexOf('скучно') !== -1)?
	(this.send('Найди себе хобби не будет скучнo'))://англ о
(msg.indexOf('Скучно') !== -1)?
	(this.send('Найди себе хобби не будет скучнo'))://англ о
(msg.indexOf('Тишина') !== -1)?
	(this.send('http://daostory.com/wp-content/uploads/2013/08/tumbleweed.jpg')):
(msg.indexOf('де стрим') !== -1)?
	(this.send('http://s019.radikal.ru/i609/1606/92/ada0b6090a60.png')):
//Ведёт диалог> 
//<Прощается 
(msg.indexOf('Пока') !== -1)?
	(this.send('Удачи')):
(msg.indexOf('я дрыхнуть') !== -1)?
	(this.send('Приятных снов')):
(msg.indexOf('Я дрыхнуть') !== -1)?
	(this.send('Приятных снов')):
(msg.indexOf('я спать') !== -1)?
	(this.send('Приятных снов')):
(msg.indexOf('я пожалуй дрыхнуть') !== -1)?
	(this.send('Приятных снов')):
(msg.indexOf('Я пожалуй дрыхнуть') !== -1)?
	(this.send('Приятных снов')):
(msg.indexOf('Я спать') !== -1)?
	(this.send('Приятных снов')):
(msg.indexOf('спокойной ноченьки') !== -1)?
	(this.send('Приятных снов')):
(msg.indexOf('Cпокойной ноченьки') !== -1)?
	(this.send('Приятных снов')):
(msg.indexOf('Доброй ночи') !== -1)?
	(this.send('Приятных снов')):
(msg.indexOf('Доброй ночи') !== -1)?
	(this.send('Приятных снов')):
(msg.indexOf('доброй ночи') !== -1)?
	(this.send('Приятных снов')):
(msg.indexOf('спокойной ночи') !== -1)?
	(this.send('Приятных снов')):
(msg.indexOf('cпокойной ночи') !== -1)?
	(this.send('Приятных снов')):
//Прощается> 
//Общается> 
//<Антимат
(msg.indexOf('Хуй') !== -1)?
	(this.send('Мат запрещён')):
(msg.indexOf('хуй') !== -1)?
	(this.send('Мат запрещён')):
(msg.indexOf('Пизда') !== -1)?
	(this.send('Мат запрещён')):
(msg.indexOf('пизда') !== -1)?
	(this.send('Мат запрещён')):
(msg.indexOf('Пидр') !== -1)?
	(this.send('Мат запрещён')):
(msg.indexOf('пидр') !== -1)?
	(this.send('Мат запрещён')):
(msg.indexOf('Пидорас') !== -1)?
	(this.send('Мат запрещён')):
(msg.indexOf('пидорас') !== -1)?
	(this.send('Мат запрещён')):
(msg.indexOf('Пидарас') !== -1)?
	(this.send('Мат запрещён')):
(msg.indexOf('пидарас') !== -1)?
	(this.send('Мат запрещён')):
(msg.indexOf('Порошенко') !== -1)?
	(this.send('Мат запрещён')):
(msg.indexOf('Путин') !== -1)?
	(this.send('Мат запрещён')):
(msg.indexOf('Абам') !== -1)?
	(this.send('Мат запрещён')):
(msg.indexOf('раный') !== -1)?
	(this.send('Мат запрещён')):''
//Антимат> 
		if(msg.substr(0,1) == '!') {
			var roomId = this.getRoomId(msgObj);
			var cmd = msg.substr(1).split(' ');
			afterCmd = msg.substr(cmd[0].length + 2);
			console.log('command: ' + cmd[0] + ' room: ' + roomId);
			switch(cmd[0].toLowerCase()) {
				case 'rule':
				case 'rules':
				case 'правила':
				case 'правило':
					tfu.send("Правила комнаты!\n- Не материться. Не разводить политоту\n- Спам и флуд запрещён.\n- Спойлы и спойлеры запрещены.\n- Запрещено не подобающее поведение в чате (В первую очередь оскорбления)\n- В бумбокс можно грузить что угодно, главное чтобы остальным в комнате нравилось.\n- Второй бумбокс не трогать. Он для дела стоит.\n- Печенья не попрошайничать. Всех это бесит.\n- В нижней правой части комнаты расположен участок площадью 5 стульев на 5 стульев. Вход на эту зону строго запрещён. Охраняемая заповедная зона.");
					break;


				case 'аниме':
				case 'anime':
				if (!cmd[1]){cmd[1]=";"}

					switch(cmd[1].toLowerCase()){
						
					case 'ужасы':
					var anotherAnime = ["Атака Титанов\n\ https://www.youtube.com/watch?v=yW8sYdHbOss", "Токийский гуль\n\ https://www.youtube.com/watch?v=xn8j0n0md8M", "Дневник будущего", "Когда плачут цикады", "Иная", "Паразит Учение о жизни\n\ https://www.youtube.com/watch?v=6GuFK_1F5HY", "Кровь+", "Сумеречная дева и Амнезия",
										"Эльфийская песня", "Хеллсинг", "Рыцари Сидонии", "Danganronpa", 'Агент паранойи', 'Ад Данте', 'Адская девочка', 'Адская девочка ТВ-2', 'Берсерк: Бехерит Властителя', 'Берсерк', 
										'Акира', 'Адская девочка ТВ-3', 'Вечная демонесса и ее черный кролик\n\ https://pp.vk.me/c622528/v622528964/473a5/oEzLAgt09CM.jpg', 'Берсерк: Битва за Долдрей', 'Благородный демон Энма', 
										'В погоне за призраком', 'Вечеринка мертвых'];
					var animerand = Math.floor(Math.random() * anotherAnime.length);
					tfu.send(anotherAnime[animerand]);
						break;
					case 'романтика':
					var anotherAnime = ["Президент студсовета - горничная!", "Искусство Меча Онлайн", "Мир по-прежнему красив\n\ https://www.youtube.com/watch?&v=LwREdOGYh2Q", "Скажи: «Я люблю тебя", "Кланнад", "ТораДора!", "Озорной поцелуй",
										"Трогательный комплекс", "Спецкласс «А»", "Достучаться до тебя", "Шарлотта\n\ https://www.youtube.com/watch?v=vXVDtWeb4Bs", "11 глаз", "5 сантиметров в секунду", "Абсолютный Дуэт", 
										"Академия Магии", "Актриса тысячелетия", "Академия поднебесной", "Алиса в Стране Сердец: Расчудесный Мир Чудес", "Ангельский хвостик ТВ1", "Ангельский хвостик ТВ2", "Бакуман ТВ-3", 
										"Багровые осколки ТВ-2", "Багровые осколки ТВ-1", "озорной поцелуй", "с её стороны, с его стороны", "спецкласс А", "нахальный ангел", "чудачество любви не помеха"];
					var animerand = Math.floor(Math.random() * anotherAnime.length);
					tfu.send(anotherAnime[animerand]);
						break;
					case 'комедия':
					var anotherAnime = ["Скучной мир в котором не сущетсвует концепции пошлых шуток", "Академия ведьмочек", "Подручный Луизы-Нулизы", "проклятие мультивыбора превратило мою жизнь в ад", 
										"Мангака и его ассистентка", "Кровавый парень", "Класс Убийц", "Вельзевул", "У меня мало друзей", "Нищебог же", "Уж не зомби ли это?", "Одному лишь Богу ведомый мир", 
										"Шарлотта\n\ https://www.youtube.com/watch?v=vXVDtWeb4Bs", "Изюминка!\n\ https://www.youtube.com/watch?v=S8D_Enryo9E", "В подземелье я пойду, там красавицу найду!\n\ https://www.youtube.com/watch?v=a9mlX-2NJww", 
										"No Game No Live\n\ https://www.youtube.com/watch?v=VwHJcHlORA4", 'Kill la kill\n\ https://www.youtube.com/watch?v=sn5XhwdOO3s', 'А вот и чёрная колдунья!', 'А все-таки город вертится', 
										'Абсолютная защита Левиафана', 'Адепт Святого знака ТВ-1', 'Адский патруль Энмы! Дадим Жару!', 'Адский Ад!', 'Адзуманга Дайо', 'Адепт Святого Знака ТВ-2', 'Азбука цветов', 'Академия Магии', 
										'Ангельский хвостик ТВ1', 'Ангельские ритмы', 'Альтернативные игры богов', 'Алхимическое оружие', 'Ангельский хвостик ТВ2', 'Арена Ангелов', 'Ария [ТВ-1]', 'Ария [ТВ-2]', 'Уровень И', "Pani poni dash"];
					var animerand = Math.floor(Math.random() * anotherAnime.length);
					tfu.send(anotherAnime[animerand]);
						break;
					case 'триллер':
					var anotherAnime = ["Психопаспорт", "Дневник Будущего", "Врата Штайнера", "Тетрадь смерти", 'Когда плачут цикады', 'Бандитос', "Агент паранойи", "Адская девочка ТВ-2", "Акаги, легенда маджонга", "Акира", "Вечеринка мертвых", 
										"Благородный демон Энма", "Ан-Го: Дневник Инги", "Актриса тысячелетия", "Восточный Эдем", "Врата Штайнера ТВ", "Врата Штайнера: Дежа вю", "Граница пустоты: Сад грешников", "Кайдзи (второй сезон)", 
										"Иная", "Идеальная синева", "Записки о робототехнике", "Кайдзи (первый сезон)", "Карас", "Ковбой Бибоп: Достучаться до небес", "Когда плачут цикады ТВ-1"];
					var animerand = Math.floor(Math.random() * anotherAnime.length);
					tfu.send(anotherAnime[animerand]);
						break;
					case 'детектив':
					var anotherAnime = ["Тетрадь смерти", "Мистический детектив Якумо", "Госик", "Психопаспорт", "Хёка: Тебе не уйти", "Нейро Ногами - детектив из Ада", "Блокнот Бога", "Ан-Го", "Восточный Эдем",
										"Загадочные истории Рампо: Игра Лапласа", "дочь двадцатиликого", "Monster"];
					var animerand = Math.floor(Math.random() * anotherAnime.length);
					tfu.send(anotherAnime[animerand]);
						break;
					case 'фантастика':
					var anotherAnime = ["Инструктор Боевых Магов", "Город при замке Дандэлион", "Рыцари Сидонии: Битва за девятую планету", "Космический линкор Ямато 2199", "Терраформирование", "Лазурный гримуар", 
										"Товарищеский комплекс", "Драматичное убийство", "Нобунага - Величайший глупец", "Гуррен Лаганн", "Актеры ослепленного города", "Рыцари Сидонии ТВ-1", "Игра на выживание", 
										"Альтернативная игра богов", "Нобунаган", "Космический Денди", "Коппелион", "Корона грешника", "Аякаси", "Симфония морской стали", "Врата Штайнера", "Бесконечные Небеса", 
										"Крутая Бёрди", "Магический Индекс", "Отряд Галактика", "Гаргантия: на просторах зелёной планеты", "Сверхдети АНЛИМИТЕД", "Говорю же у меня не встаёт!", "Сага Иксиона: Иное измерение", 
										"Из Нового Света", "Из Нового Света", "Записки о робототехнике", "Дети Индиго из другого мира", "Гинтама", "Проект Кей", "Масс Эффект: Фильм", "Полное затмение", "Боевые Шинки", 
										"Горизонт средиземья пустот", "Новый мир: Начало/Загрузка/Конец", "Поиграй со мной нежно", "Хромированный Региос", "Цветок вечности", "Тэнти - лишний!", "Уровень И", 
										"Троготельный комплекс", "Очень приятно бог", "Монстр за соседней партой", "Неудержимая юность", "Волчица и чёрный принц"];
					var animerand = Math.floor(Math.random() * anotherAnime.length);
					tfu.send(anotherAnime[animerand]);
						break;
					case 'сейнен':
					var anotherAnime = ["Эхо Террора", "Бандидос" , "Гаро: печать пламени", "Смертельный парад" , "Врата Штейна" , "Ярость Бахамута: Генезис" , "Натюрморт в серых тонах" , "Всадник без головы" , 
										"Ёрмунганд" , "Мастер Муси", "охотник х охотник"];
					var animerand = Math.floor(Math.random() * anotherAnime.length);
					tfu.send(anotherAnime[animerand]);
						break;
					case 'хентай':
					var anotherAnime = ["Иди уроки учи", "На пухлоглазых дрочишь?", "Тебя возбуждают школьницы с опухшими глазами", "18 нет иди гуляй", "Любовь, любовь всегда одна http://cs630623.vk.me/v630623848/53e9/nGUPOpXhWqw.jpg"];
					var animerand = Math.floor(Math.random() * anotherAnime.length);
					tfu.send(anotherAnime[animerand]);
						break;
					case 'повседневность':
					var anotherAnime = ["Школьная жизнь", "Деревня", "Мисс Монохром", "Бухающая Вакако", "Работа!", "Геншикен", "Всадник без головы", "Усаги из Уравы", "Хаятэ, боевой дворецкий", "Театр Тьмы", "Общага", 
										"Я ни хрена не понимаю о чем говорит мой муж", "Помолвлена с незнакомцем", "Богиня-школьница", "Граффити весёлой кухни", "Золотая пора", "Радость подъема", 
										"Не моя вина, что я не популярна!", "Подъём, девчата!", "Русал в моей ванной", "По ту сторону стекла", "Кафе Кроличий дом", "Моя сестренка не может быть такой милашкой", 
										"И приехала сестра", "Супер Сонико", "Серебряная ложка", "Поцелуй сестёр", "Кошечка из Сакурасо", "Сатана на подработке!", "Мы ждём тебя летом", "Ты и я", "Сёстры Минами", 
										"Мелочи Жизни", "Добро пожаловать в Эн.Эйч.Кэй", "Притворная Любовь", "Стрелок с Чёрной скалы", "Эй,Цыпочка!", "Сёстры Минами", "Странники", "Хаятэ, боевой дворецкий", 
										"Мы из общаги Кавай", "Как простые старшеклассницы идолами пытались стать", "Богиня-школьница", "Девушка (Бета)", "Синее синего", "Нашествие девочки Кальмарки", 
										"Нозаки — автор сёдзё-манги", "Моккэ", "Герой Юки Юна", "Pani poni dash"];
					var animerand = Math.floor(Math.random() * anotherAnime.length);
					tfu.send(anotherAnime[animerand]);
						break;
					default:
				case 'аниме':
				case 'anime':
					tfu.send("Выберите жанр аниме\n\
							!аниме ужасы\n\
							!аниме романтика\n\
							!аниме повседневность\n\
							!аниме комедия\n\
							!аниме триллер\n\
							!аниме фантастика\n\
							!аниме детектив\n\
							!аниме сейнен\n\
							!аниме хентай\n\
											");
						break;
				};		break;


				case 'анкеты':
				case 'анкета':
				if (!cmd[1]){cmd[1]=";"}

					switch(cmd[1].toLowerCase()){
						
					case 'владимир':
					case 'vladimir':
					case '+vladimir':
					case 'vladimir davydov':
					case 'владимир давыдов':
					tfu.send("https://scontent-frt3-1.xx.fbcdn.net/hphotos-xta1/t31.0-8/13063310_1557693764524283_3882677961213373215_o.jpg");
						break;
					case 'совесть':
					case '+совесть':
					case '+vladimir':
					tfu.send("https://content.foto.my.mail.ru/mail/then.mon.rices/_mypagephoto/h-43.jpg");
						break;
					case 'здыхля':
					case 'здыхлик':
					case '+здыхлик':
					case 'здыхлик невмеручий':
					tfu.send("https://scontent-frt3-1.xx.fbcdn.net/hphotos-xap1/t31.0-8/13055115_1557660374527622_5734060429649995558_o.jpg");
						break;
					case 'ахинея':
					case '+ахинея':
					tfu.send("https://scontent-frt3-1.xx.fbcdn.net/hphotos-xaf1/t31.0-8/13047922_1557973357829657_8803533670426410066_o.jpg");
						break;
					case 'ромашка reenbic':
					case '+ромашка':
					case 'ромашка':
					tfu.send("http://cs8.pikabu.ru/post_img/big/2016/04/25/11/1461607392150820042.jpg");
						break;
					case 'xobpawok':
					case '+xobpawok':
					case 'суслик':
					tfu.send("https://scontent-frt3-1.xx.fbcdn.net/hphotos-xlt1/t31.0-8/13086781_1558030237823969_2300265921226842656_o.jpg");
						break;
					case 'леонид':
					case '+леонид':
					tfu.send("http://cs8.pikabu.ru/post_img/big/2016/04/26/5/1461653432133492484.jpg");
						break;
					case 'партизан':
					case '+partyzan':
					case 'partyzan':
					tfu.send("http://s017.radikal.ru/i404/1605/f8/b8a6e0cf043a.jpg");
						break;
					case '+legolas':
					case 'legolas':
					case 'леголас':
					tfu.send("http://s017.radikal.ru/i427/1606/c6/868fa1e43d44.jpg");
						break;
					case 'мисаки':
					case 'misaki':
					tfu.send("http://s008.radikal.ru/i306/1606/33/8e4f14d56f71.jpg");
						break;
					default:


				case 'анкета':
					tfu.send("На данный момент можно увидеть анкеты:\n\
							Ахинея\n\
							Vladimir Davydov\n\
							Здыхлик Невмеручий\n\
							Совесть\n\
							Ромашка reenbic\n\
							XoBpawok\n\
							Леонид Ratahook\n\
							Partyzan\n\
							Misaki\n\
							Legolas\n\
							Чтобы посмотреть чью нибудь анкету введите\n\
							!анкета ИМЯ\n\
							\n\
							Если хотите сделать свою анкету введите !создать анкету\n\
							Готовую анкету отошлите в личку Davydov Vladimir");
						break;
				};		break;

				case 'создать':
				if (!cmd[1]){cmd[1]=";"}

					switch(cmd[1].toLowerCase()){
						case 'анкету':
						tfu.send("https://tixchat.com/data/XM/4C/rW/lk.jpeg\n\
							Готовую анкету отошлите Davydov Vladimir.");
						break;
					default:
					};break;
				//<Стримы
				case 'расписание':
				if (!cmd[1]){cmd[1]=";"}

					switch(cmd[1].toLowerCase()){
						case 'стрим':
						case 'стримов':
						tfu.send("На момент 21.06.16г. стримы не проводятся. Возобновление стримов ожидается 1.09.17г.\n\
							Здесь расписание литературных сеансов\n\
							http://animeroonlitstrim.esy.es/raspis.html\n\
							Пишите в личку Davydov Vladimir, предлагайте свои аудиокниги для стримов");
						break;
					default:
					};break;
				//Стримы>
				case 'шар':
				case 'ball':
				case '8':
					var anotherAnime = ['Несомненно', "Весьма сомнительно", 'Да', "Перспективы не очень хорошие", 'Никаких сомнений', "По моим данным — «нет»", 'Определённо да', "Мой ответ — «нет»",
										 'Можешь быть уверен в этом', 'Мне кажется — «да', "Вероятнее всего", "Хорошие перспективы", "Знаки говорят — «да»",
										 "Да", "Лучше не рассказывать", "Сейчас нельзя предсказать", "Сконцентрируйся и спроси опять", "Даже не думай",];
					var animerand = Math.floor(Math.random() * anotherAnime.length);
					tfu.send(anotherAnime[animerand]);
					break;
				case 'кун':
				case 'куны': 
					var anotherAnime = ['https://tixchat.com/data/06/9l/zH/Vb.jpeg\n\
					https://tixchat.com/data/Ng/wW/yx/j2.jpeg', "https://tixchat.com/data/Vq/p8/fw/uO.jpeg", 'https://tixchat.com/data/Ds/MR/Ik/FQ.jpeg', 
					'https://tixchat.com/data/rR/ds/eg/UM.jpeg', 'https://tixchat.com/data/3s/b6/6q/y7.jpeg', 'https://tixchat.com/data/Wy/86/gR/yW.jpeg', 'https://tixchat.com/data/ka/Is/gM/yS.jpeg', 
					'https://tixchat.com/data/sP/Ra/9P/cj.jpeg', 'https://tixchat.com/data/hZ/kA/1l/Fs.jpeg', 'https://tixchat.com/data/fn/kY/L1/dv.jpeg', 'https://tixchat.com/data/o2/2c/ym/JN.jpeg', 
					'http://i056.radikal.ru/1605/8a/080811ebe8b6.png'];
					var animerand = Math.floor(Math.random() * anotherAnime.length);
					tfu.send(anotherAnime[animerand]);
					break;

				case 'тян':
					var anotherAnime = ['https://tixchat.com/data/aJ/Qj/sJ/sN.jpeg', 'https://tixchat.com/data/BA/uu/65/oW.jpeg', 'https://tixchat.com/data/oM/Kq/cE/Uk.jpeg', 'https://tixchat.com/data/Rk/K5/29/Df.jpeg', 
					'https://tixchat.com/data/H6/GU/I1/mG.jpeg', 'https://tixchat.com/data/nk/vm/Ow/lA.jpeg', 'https://tixchat.com/data/qY/e2/M1/Wk.png', 'https://tixchat.com/data/sr/j7/lG/wu.jpeg', 'https://tixchat.com/data/Uw/fZ/Pe/mY.jpeg', 
					'https://tixchat.com/data/vc/Oj/BQ/LR.jpeg', 'https://tixchat.com/data/du/RJ/Lb/DK.jpeg', 'https://tixchat.com/data/at/Vn/5a/63.jpeg', 'https://pp.vk.me/c630930/v630930721/36d00/6-kQ0SvVRd0.jpg', 
					'https://pp.vk.me/c636626/v636626279/1a9a4/ZNokWpELgf8.jpg', 'https://pp.vk.me/c629305/v629305712/34fb0/2mCX1XR_W1E.jpg', 'https://pp.vk.me/c631419/v631419247/32a3b/-mZzsuuwivI.jpg', 
					'https://pp.vk.me/c633120/v633120157/3962c/1Il_JeD19OY.jpg', 'https://pp.vk.me/c630530/v630530221/373fa/BK4rGC_Gnfg.jpg', 'https://pp.vk.me/c636429/v636429685/f52a/FItbRCZeiOQ.jpg', 
					'https://pp.vk.me/c633431/v633431221/3208b/ZShhhWR9vT8.jpg', 'https://pp.vk.me/c621122/v621122722/24f47/oNOOYuJ7Lgg.jpg', 'https://pp.vk.me/c631219/v631219153/29ebc/mXIyIXeVCco.jpg', 
					'https://pp.vk.me/c630918/v630918289/38fd9/B5YFBalYWJg.jpg', 'https://pp.vk.me/c631817/v631817685/37c62/IMKwPBODqh4.jpg'];
					var animerand = Math.floor(Math.random() * anotherAnime.length);
					tfu.send(anotherAnime[animerand]);
					break;
				//<Ликбес
				case 'внимание у нас новичек':
				case 'Внимание у нас новичек':
				case 'ликбес':
				case 'Ликбес':
				case 'Ликбез':
				case 'ликбез':
					tfu.send('Всё что нужно знать о чате\n\
		1. Печеньки здесь местная валюта. Копи печеньки улучшай своё финансовое положение\n\
		2. Никто не любит когда у них просят печеньки, скорее всего за такое схлопочешь бан.\n\
		3. Печеньки можно тратить на одежду в гардеробе и мебель в комнатах\n\
		4. Для покупки мебели нужно попросить у админа комнаты права на покупку мебели(Комнату можно создать и самому)\n\
		5. В чате есть карма. Чтобы поднять или опустить карму нужно тратить печеньки\n\
		6. В чате есть донат печеньки можно купить за деньги');
					break;
				//Ликбес>
				case 'плейлист':
				case 'плэйлист':
				case 'playsite':
					var anotherAnime = ['https://www.youtube.com/playlist?list=PL774XWO1QyFerOdFuiivaFh5C-rsGzdDE'];
					var animerand = Math.floor(Math.random() * anotherAnime.length);
					tfu.send(anotherAnime[animerand]);
					break;
					
				case 'ролик':
				case 'ютуб':
				case 'youtube':
				case 'доза': 
					var anotherAnime = ['https://www.youtube.com/watch?v=xkIytYlDD_o&index=3&list=RDcyW2ajAVyfA', 'https://www.youtube.com/watch?v=cvaIgq5j2Q8&index=4&list=RDcyW2ajAVyfA', 'https://www.youtube.com/watch?v=cmlCuzn_mqI&list=RDcmlCuzn_mqI', 
					 'https://www.youtube.com/watch?v=YrhYhI3L32c&list=RDcmlCuzn_mqI&index=3', 'https://www.youtube.com/watch?v=cvaIgq5j2Q8&list=RDcmlCuzn_mqI&index=2', 'https://www.youtube.com/watch?v=cyW2ajAVyfA&list=RDcmlCuzn_mqI&index=10', 
					 'https://www.youtube.com/watch?v=cmlCuzn_mqI&index=1&list=RDcmlCuzn_mqI', 'https://www.youtube.com/watch?v=oLsBYC1iEZY', 'https://www.youtube.com/watch?v=AXQRYe_GMKs', 
					 'https://www.youtube.com/watch?v=QxDSOTfOveQ', 'https://www.youtube.com/watch?v=99M_CobIDas', 'https://www.youtube.com/watch?v=7ZT-9vvC__w', 'https://www.youtube.com/watch?v=sL5uryEt3bQ', 
					 'https://www.youtube.com/watch?v=VClJ9oHWr88', 'https://www.youtube.com/watch?v=3AmYr9czoqM&list=RDMM3AmYr9czoqM', 'https://www.youtube.com/watch?&v=YIW3qRq_KXE', 'https://www.youtube.com/watch?v=rkxw5cXZC0c', 
					 'https://www.youtube.com/watch?v=WvaMslvRIzs&list=RDMMWvaMslvRIzs', 'https://www.youtube.com/watch?v=ohOp09ojz0w&list=RDohOp09ojz0w', 'https://www.youtube.com/watch?&v=QHSYh6OAhU8', 
					 'https://www.youtube.com/watch?v=vblnsgMZh2c', 'https://www.youtube.com/watch?v=lDn5d1thj6Y', 'https://www.youtube.com/watch?v=qG_FGEwe4Pc', 'https://www.youtube.com/watch?v=gQsXwazeRbI&list=RDMMgQsXwazeRbI', 
					 'https://www.youtube.com/watch?v=b6eYy7j7WMA', 'https://www.youtube.com/watch?v=a8zQ0LSxlNk', 'http://www.youtube.com/watch?v=Hiqn1Ur32AE', 'http://www.youtube.com/watch?v=V78cIt3rtv0', 
					 'http://www.youtube.com/watch?v=4q5eSo90dtI', 'https://www.youtube.com/watch?v=kyArAQvrKIM', 'https://www.youtube.com/watch?v=pKWGHLLpm28', 'https://www.youtube.com/watch?v=2ZIn9t37348', 
					 'https://www.youtube.com/watch?v=8BmpdvpzYJs', 'https://www.youtube.com/watch?v=PQ1lNEbYwtk', 'https://www.youtube.com/watch?v=Lh8aCbqDPFc', 'https://www.youtube.com/watch?v=o9LnMFScSFA', 
					 'https://www.youtube.com/watch?&v=YbOK5XEGhng', 'https://www.youtube.com/watch?v=sBo52--2XU4', 'https://www.youtube.com/watch?v=PdJWltpv9A0', 'https://www.youtube.com/watch?v=wHVSqaMZJl8', 
					 'https://www.youtube.com/watch?v=nT3s0N6FtOA', 'http://www.youtube.com/watch?v=UKfWirwrAk0', 'https://www.youtube.com/watch?v=FiHY-zZYI2s', 'https://www.youtube.com/watch?v=H2yjmX6qPa8', 
					 'https://www.youtube.com/watch?v=SLRX34ADM2c', 'https://www.youtube.com/watch?v=Ftm953BUQj8', 'https://www.youtube.com/watch?v=HglwesMF6tI', 'https://www.youtube.com/watch?v=KTTqx8sWPDI', 
					 'https://www.youtube.com/watch?v=ZoPe1-pRo-g', 'https://www.youtube.com/watch?v=61qXcPjs5So', 'https://www.youtube.com/watch?v=jWOAKZF1VOk', 'https://www.youtube.com/watch?v=JThz8-nYYHs', 
					 'https://www.youtube.com/watch?v=XzBzXYJzv84', 'https://www.youtube.com/watch?v=NRj8n4a7kpU', 'https://www.youtube.com/watch?v=GvaN51eXGeM', 'https://www.youtube.com/watch?list=PLkMRAPworbEelkUPJrQEF5pBTVgzNLxWG&v=O6NvsM49N6w', 
					 'https://www.youtube.com/watch?v=AWyfj7TjJfQ', 'https://www.youtube.com/watch?v=gp6Rw0Onc9Y', 'https://www.youtube.com/watch?v=KDcYSN_-A7s', 'https://www.youtube.com/watch?v=ndHadBpud1o', 
					 'https://www.youtube.com/watch?v=62nOysD794M', 'https://www.youtube.com/watch?v=x2XEqQ4AjHo&index=4&list=RD62nOysD794M', 'https://www.youtube.com/watch?v=URrmD2J1oV4', 'https://www.youtube.com/watch?v=hN7uX7stu6c', 
					 'https://www.youtube.com/watch?v=yVBVMg99bwo', 'https://www.youtube.com/watch?v=yVBVMg99bwo', 'https://www.youtube.com/watch?v=yVBVMg99bwo', 'https://www.youtube.com/watch?v=rZOkvJqNTTw', 
					 'https://www.youtube.com/watch?v=yVBVMg99bwo', 'https://www.youtube.com/watch?v=yVBVMg99bwo', 'https://www.youtube.com/watch?v=inNymI3MFxs', 'https://www.youtube.com/watch?v=iTc1dfHZI8Q', 
					 'https://www.youtube.com/watch?v=mbJ0aXxpTfM', 'https://www.youtube.com/watch?v=WkLO8llyN64', 'https://www.youtube.com/watch?v=uD6Qzt1vjGM', 'https://www.youtube.com/watch?v=HIrPf2xV-tc', 
					 'https://www.youtube.com/watch?v=x0urJu3Saz0', 'https://www.youtube.com/watch?v=wr1M1cYtmCU', 'https://www.youtube.com/watch?v=GMm6wvzDosI', 'https://www.youtube.com/watch?v=lF2lHLNLuog', 
					 'https://www.youtube.com/watch?v=h2xIDf7op48', 'http://www.youtube.com/watch?v=RFa4mpd6agY', 'http://www.youtube.com/watch?v=WmC-Cp2ZE70', 'http://www.youtube.com/watch?v=SrSZICFbzB4', 
					 'https://www.youtube.com/watch?list=PLxf55Dca1uXHUDC-lvkb_Ei8VRAgtQU-Y&v=OsvgX756Ixw', 'https://www.youtube.com/watch?v=Va323siMmlM', 'https://www.youtube.com/watch?v=dpCMpJ1XX9I', 
					 'https://www.youtube.com/watch?v=JFaum-oCGOQ', 'https://www.youtube.com/watch?v=Quzsv6ekcPQ', 'https://www.youtube.com/watch?v=0lyxmb9kk7M', 'https://www.youtube.com/watch?v=OCZ--Ogjbyk', 
					 'https://www.youtube.com/watch?v=tk02DEfL4k4', 'https://www.youtube.com/watch?v=SrSZICFbzB4', 'https://www.youtube.com/watch?v=Sq-lIW33gT0', 'https://www.youtube.com/watch?v=1H_IQ9dfNQU', 
					 'https://www.youtube.com/watch?v=s3HrFg4o7PQ', 'https://www.youtube.com/watch?v=VLio-gFTvqk', 'https://www.youtube.com/watch?v=Ftm953BUQj8', 'https://www.youtube.com/watch?v=Ic25IOV71as', 
					 'https://www.youtube.com/watch?v=pQp8GWdpYug', 'https://www.youtube.com/watch?v=cKFkaskBWu4', 'https://www.youtube.com/watch?v=06HAzBjZqBA', 'https://www.youtube.com/watch?v=rodUrBAPfpQ',
					 'https://www.youtube.com/watch?v=JL0LicHDlxk', 'https://www.youtube.com/watch?v=-P6Ga2JFRAs', 'https://www.youtube.com/watch?v=voPvdQ0Zc6I', 'https://www.youtube.com/watch?v=M5tDAd302zg', 
					 'https://www.youtube.com/watch?v=rrJFcC9qVpA', 'https://www.youtube.com/watch?v=sNaGv5a_5U4', 'https://www.youtube.com/watch?v=LSzAolliWDc', 'https://www.youtube.com/watch?v=N8Cjve3N2lk', 
					 'https://www.youtube.com/watch?v=dG7PFeiqkbU', 'https://www.youtube.com/watch?v=fKGKh-wYyNo', 'https://www.youtube.com/watch?v=XjooRuCbNmY', 'https://www.youtube.com/watch?v=lUHi8XBN_io', 
					 'http://www.youtube.com/watch?v=rdvC5SAZ3X0', 'https://www.youtube.com/watch?v=-uZNvxWry2w', 'https://www.youtube.com/watch?v=GMm6wvzDosI', 'https://www.youtube.com/watch?v=NR3Fjc0x5ks', 
					 'https://www.youtube.com/watch?v=1ArWgZuoB7g', 'https://www.youtube.com/watch?v=Q67_Me-Eadk&list=RDh528M8uglLA', 'https://www.youtube.com/watch?v=WKs4yDkUhUY', 'https://www.youtube.com/watch?v=Y6a6uArA1lo', 
					 'https://www.youtube.com/watch?v=7rMcBwbZbKM&list=RDOCu91oT6Skg&index=2', 'http://www.youtube.com/watch?v=J4Kc5xpzrfM', 'https://www.youtube.com/watch?v=nDHJYvGuLSo', 'https://www.youtube.com/watch?v=_J3KXEYbY7U', 
					 'https://www.youtube.com/watch?v=loNS1eqXdJY', 'https://www.youtube.com/watch?v=P9-7aDSWj_c', 'https://www.youtube.com/watch?v=mYM2efYY2Pg', 'https://www.youtube.com/watch?v=yDp1DmpwPy4', 
					 'https://www.youtube.com/watch?v=ufvX0GoLzVc', 'https://www.youtube.com/watch?v=ZoPe1-pRo-g', 'https://www.youtube.com/watch?v=ElBE6IXi7m4', 'https://www.youtube.com/watch?v=TL2873HshT0', 
					 'https://www.youtube.com/watch?v=1sv42ad_bnc', 'https://www.youtube.com/watch?v=SBiXN6CromA', 'https://www.youtube.com/watch?v=DDRNMEG-1Vs', 'https://www.youtube.com/watch?v=o0otvxxDr9k', 
					 'https://www.youtube.com/watch?v=4P31jdNgs4U', 'https://www.youtube.com/watch?v=XKqzS2Ht9fw', 'https://www.youtube.com/watch?list=PLuZADpUBCdIU15qznzTEOfzghV__T060Y&v=_Eh3M5DJUio', 
					 'https://www.youtube.com/watch?v=iTjB-LJTYug', 'https://www.youtube.com/watch?list=PLvCUJW1WzubxoWBm7PK9NEpLbaxOg0eXF&v=MeMe6sEhpMc', 'https://www.youtube.com/watch?v=YMt8ORWB91o', 
					 'https://www.youtube.com/watch?v=xHE_VpiT6kA', 'https://www.youtube.com/watch?v=lHVE9InpRKE', 'https://www.youtube.com/watch?v=sgdT10SbrC8', 'https://www.youtube.com/watch?v=bTvdX4Sd8jo', 
					 'https://www.youtube.com/watch?v=qUbSAU2WZbA', 'https://www.youtube.com/watch?v=v3cZbQaqYN4', 'https://www.youtube.com/watch?v=tZWMUrhPv5k', 'https://www.youtube.com/watch?v=bHoh9TzRaXo', 
					 'http://www.youtube.com/watch?v=shs0rAiwsGQ', 'https://www.youtube.com/watch?v=PXpeaxmiP2s', 'https://www.youtube.com/watch?v=M_ohWuaNPWo', 'https://www.youtube.com/watch?v=_dVx7JGdTOQ', 
					 'https://www.youtube.com/watch?v=ZuIDbLe11yE', 'https://www.youtube.com/watch?v=cVxpR_TXjL0', 'https://www.youtube.com/watch?v=tsj6AkTvAa8', 'https://www.youtube.com/watch?list=PLLYiMJEno7V8Qmdx9-UPv3R3s50GeuK0z&v=RoOadj1m4sg', 
					 'https://www.youtube.com/watch?v=5oTab5u8anA', 'https://www.youtube.com/watch?v=53NmaEdwS58', 'https://www.youtube.com/watch?v=kzjgQk8N_2U', 'https://www.youtube.com/watch?v=NbH_iZYjIvk', 
					 'https://www.youtube.com/watch?v=hi1rVcGe8Uw', 'https://www.youtube.com/watch?v=ULSjyfKX65Y', 'https://www.youtube.com/watch?v=LP0zNi1cAgg', 'https://www.youtube.com/watch?v=flrZJPIHDQA', 
					 'https://www.youtube.com/watch?v=qp6RYG6X82g', 'https://www.youtube.com/watch?v=Ag2THZKnwfE', 'https://www.youtube.com/watch?v=G4to73LuQ1s', 'https://www.youtube.com/watch?v=3wguD-2l2jg', 
					 'https://www.youtube.com/watch?list=PLkMRAPworbEelkUPJrQEF5pBTVgzNLxWG&v=cXEZu-uIdeI', 'https://www.youtube.com/watch?v=ps7hbYk9vwE', 'https://www.youtube.com/watch?v=_euzzqk6LOw', 
					 'https://www.youtube.com/watch?v=VmczNvKJUx4', 'https://www.youtube.com/watch?v=bx74xeIMDdg', 'https://www.youtube.com/watch?v=-gKOfmL20Ow', 'https://www.youtube.com/watch?v=-M4iSHLarMk', 
					 'https://www.youtube.com/watch?v=WR6zs_CCPI8', 'https://www.youtube.com/watch?v=0YezX_PCy_s', 'https://www.youtube.com/watch?v=Wf6JNYHEp6Q', 'https://www.youtube.com/watch?v=9-2zy-BQgNg', 
					 'https://www.youtube.com/watch?v=T2KI3Niwm5M', 'https://www.youtube.com/watch?v=UKup-HZd3qM', 'https://www.youtube.com/watch?v=mavX9Ra9Dxk', 'https://www.youtube.com/watch?v=TTonVuoPN-U', 
					 'https://www.youtube.com/watch?v=0NK5GHoDWkg', 'https://www.youtube.com/watch?v=HjSxrK6O-mI', 'https://www.youtube.com/watch?v=iYDrjmmzifs', 'https://www.youtube.com/watch?v=dtd50yFzRDY', 
					 'https://www.youtube.com/watch?v=P-TPx8lcoZ4', 'https://www.youtube.com/watch?v=lnF4ilFMeMw', 'https://www.youtube.com/watch?v=oJFQuFXSw-o', 'https://www.youtube.com/watch?v=yLnnx14zG-g', 
					 'https://www.youtube.com/watch?v=uQBweBn9hgk', 'https://www.youtube.com/watch?v=yujW64FwsoE', 'https://www.youtube.com/watch?v=13vVHYMfpXE', 'https://www.youtube.com/watch?v=-wpjYjcnN_A', 
					 'https://www.youtube.com/watch?v=8vQ0vO3p-iM', 'https://www.youtube.com/watch?v=bizrDPS1rQI', 'https://www.youtube.com/watch?v=IiK7IqlU7aY', 'https://www.youtube.com/watch?v=GMm6wvzDosI', 
					 'https://www.youtube.com/watch?v=B3f64h7wPdo', 'https://www.youtube.com/watch?v=fuMnHItjNEs', 'https://www.youtube.com/watch?v=WYYiYYvu75E', 'https://www.youtube.com/watch?v=_TCbiYPJj8U', 
					 'https://www.youtube.com/watch?v=MRMqFKMsQK8', 'https://www.youtube.com/watch?v=rMfe306QFr4', 'https://www.youtube.com/watch?v=139JZNLONpg', 'https://www.youtube.com/watch?v=0YezX_PCy_s', 
					 'https://www.youtube.com/watch?v=VkfNvLLffbc', 'https://www.youtube.com/watch?list=PLmbNwe6haxzO-LpkdkZLUV4X85Iqg_C3C&v=-3a0qg_P2qQ', 'https://www.youtube.com/watch?v=HjSxrK6O-mI', 
					 'https://www.youtube.com/watch?v=cXPB-uaqtCA', 'https://www.youtube.com/watch?v=R8aWZD4WxHw', 'https://www.youtube.com/watch?v=yCI8TW6pSaU', 'https://www.youtube.com/watch?v=g4mqN7bB0hg', 
					 'https://www.youtube.com/watch?v=u6h6vEIcgRs', 'https://www.youtube.com/watch?v=z7WXTS-O5wE', 'https://www.youtube.com/watch?v=96CdzaZ3o4w', 'https://www.youtube.com/watch?v=A2wQwT0LO5U', 
					 'https://www.youtube.com/watch?v=nhkDK-zftSo', 'https://www.youtube.com/watch?v=850lmhCG4xA', 'https://www.youtube.com/watch?v=HNYFhHrUN2s', 'https://www.youtube.com/watch?v=VrkXYyEcGgY', 
					 'https://www.youtube.com/watch?v=H2EIwUtkNzo', 'https://www.youtube.com/watch?v=m_CQ81wluAw', 'https://www.youtube.com/watch?v=KqzqBbMfLJI', 'https://www.youtube.com/watch?v=ubf7yPZBXZc', 
					 'https://www.youtube.com/watch?v=G-cmudiTH-w', 'https://www.youtube.com/watch?v=rpoGXp5Hsy4', 'https://www.youtube.com/watch?v=A7kITigWFRg', 'https://www.youtube.com/watch?v=UKfWirwrAk0', 
					 'https://www.youtube.com/watch?v=cRbZtxmaKiQ', 'https://www.youtube.com/watch?v=CJcll7v5b5U', 'https://www.youtube.com/watch?v=Fu_O7Ewq_SA', 'https://www.youtube.com/watch?v=je8IOS8Xz0I', 
					 'https://www.youtube.com/watch?v=Iwc63fIV_Cc', 'https://www.youtube.com/watch?v=D-LxTP6zLVI', 'https://www.youtube.com/watch?v=3ZxyLiRi86w', 'https://www.youtube.com/watch?v=RuOz8jWU4JA', 
					 'https://www.youtube.com/watch?v=OOwLNKrTakQ', 'https://www.youtube.com/watch?v=hpuxWGjryz0', 'https://www.youtube.com/watch?v=kNFgTEaNjiY&ebc=ANyPxKqA4LdhcivniY_isn5f6-qHLees4CYo54nvgF_3e-ByD9z7rgXAC2HemU7o19Xn-oSQ7_UXx7JQvEvB7s_t9mfxU7COwA', 
					 'https://www.youtube.com/watch?v=q5QVSVGuwh0&ebc=ANyPxKpwEXtwdF00wkZS7EA-v8CAMvLxiQjKyP38-54bOO72kzcSDvo38BzyziYlipHuLKNheMnq5ZZlwODey0yW6S9PGx6BYw', 'https://www.youtube.com/watch?v=1PY_AAnIg5M', 
					 'https://www.youtube.com/watch?v=ao9zPkxMd7A', 'https://www.youtube.com/watch?v=KYLhb1Oc6i4', 'https://www.youtube.com/watch?v=uD6Qzt1vjGM&list=PLxf55Dca1uXHUDC-lvkb_Ei8VRAgtQU-Y', 
					 'https://www.youtube.com/watch?v=w-IsYNsqm58&index=3&list=PLxf55Dca1uXHUDC-lvkb_Ei8VRAgtQU-Y', 'https://www.youtube.com/watch?v=BjcnS-yf1QU', 'https://www.youtube.com/watch?v=NxBrVN37IRg', 
					 'https://www.youtube.com/watch?v=y-CE2BDGer4&list=PLxf55Dca1uXHUDC-lvkb_Ei8VRAgtQU-Y&index=2', 'https://www.youtube.com/watch?v=2Im7K8e40hI&ebc=ANyPxKp40xnyclpp8zoz8sDxhKYFM8952ZJ7-lU-4L-ZDffnH1mdnFj9lmOSg8S60ppXXxc2Ue8ivh7hjGIcTmkdFkYHdSx5yQ', 
					 'https://www.youtube.com/watch?v=ph7j5cwrNOc', 'https://www.youtube.com/watch?v=QNIoPOpxGWs&list=RDQNIoPOpxGWs', 'https://www.youtube.com/watch?v=4qc06KzpYD0', 'https://www.youtube.com/watch?v=aTBUGRmcr6g', 
					 'https://www.youtube.com/watch?v=0EDO4U4lpfQ&ebc=ANyPxKo9BOSZC_SzuH92LveUNnyOsfyX0OhsiFagEousJGl3vAcZuRBcGMbcV5jGjmJ2XU78E9akAdj0joryCelIHaoVbjlVLQ', 'https://www.youtube.com/watch?v=MogFaI9a2ws', 
					 'https://www.youtube.com/watch?v=A1r16fKugQw', 'https://www.youtube.com/watch?v=nVL8wicvL-4', 'https://www.youtube.com/watch?v=GQRiwKlMy4U', 'https://www.youtube.com/watch?v=5IlkxMKnk0k', 
					 'https://www.youtube.com/watch?v=FWLKqUe2-Ts', 'https://www.youtube.com/watch?v=fHKFnMLky8Y', 'https://www.youtube.com/watch?v=2IkPEm-_Hc4', 'https://www.youtube.com/watch?v=-jvV319l87E&ebc=ANyPxKoE0M_NjYT6EKRy329yDbvnDOOZQPfcjrT1nQgu1vXlM0CkS-ha1BeV8GALREqHW5cmThJXhRjWtbjUPDhzceoZPT55Fw', 
					 'https://www.youtube.com/watch?v=V78cIt3rtv0&ebc=ANyPxKrbudZ9L9lgbiC-7nqWguiVXTgLekw8mDozSCZU7WI2X2p0Vcj_eVLGAmnXwAA1EJoA52gawf2n9pNA23D5rqWhT9Q3bA', 'https://www.youtube.com/watch?v=1ynTVKMxa-8', 
					 'https://www.youtube.com/watch?v=tiwlXy4YRv8', 'https://www.youtube.com/watch?v=BWYo2jKSGq4&ebc=ANyPxKqDcfKzS7MwKuNiC3-bVKxjqebRQ6klpu6kkscFX8U7v3wbMiz93Lr9y5G23t6PrQBERRT2tzjCELcIE9g3MSiFclsQag', 
					 'https://www.youtube.com/watch?v=gJOOOHL4qqE&ebc=ANyPxKqDcfKzS7MwKuNiC3-bVKxjqebRQ6klpu6kkscFX8U7v3wbMiz93Lr9y5G23t6PrQBERRT2tzjCELcIE9g3MSiFclsQag', 'https://www.youtube.com/watch?v=snesX1bNzoI', 
					 'https://www.youtube.com/watch?v=3m3ngwbUGSQ&list=RDMM3m3ngwbUGSQ&index=1', 'https://www.youtube.com/watch?v=MH25xgjmNQw', 'https://www.youtube.com/watch?v=E_LsTMje1pg&list=RDMME_LsTMje1pg', 
					 'https://www.youtube.com/watch?v=Bdy4D8xZXL0', 'https://www.youtube.com/watch?v=Fjzg1xtzAeM', 'https://www.youtube.com/watch?v=rVgkfGeE4wU', 'https://www.youtube.com/watch?v=AE1CdY1kZsc', 
					 'https://www.youtube.com/watch?v=yKob3wWB7XE', 'https://www.youtube.com/watch?v=Ml41KlzZ4Bw', 'https://www.youtube.com/watch?v=dNQk394pduE', 'https://www.youtube.com/watch?v=EyQetgOp23Q', 
					 'https://www.youtube.com/watch?v=ORwvuuA5-lc', 'https://www.youtube.com/watch?v=5fEbKJD2ZxE', 'https://www.youtube.com/watch?v=ygiPpztUuSQ', 'https://www.youtube.com/watch?v=0qsXcZj-QS4', 
					 'https://www.youtube.com/watch?v=WWQZDolpf1Y', 'https://www.youtube.com/watch?v=PS_j0w-vyTA', 'https://www.youtube.com/watch?v=uuA3CHv8DvM', 'https://www.youtube.com/watch?v=mgoNrw_up0I', 
					 'https://www.youtube.com/watch?v=h1qjIrJgRF4', 'https://www.youtube.com/watch?v=RbARE0QCO6Y', 'https://www.youtube.com/watch?v=yWTUkRYFkJ4', 'https://www.youtube.com/watch?v=Evfzhp3XoMQ', 
					 'https://www.youtube.com/watch?v=TAQvC3yitgM', 'https://www.youtube.com/watch?v=J7gfUE9cJnY', 'https://www.youtube.com/watch?v=blA2a27asYM', 'https://www.youtube.com/watch?v=KDcJFKQpQy8', 
					 'https://www.youtube.com/watch?v=CFIl9vqT7NQ', 'https://www.youtube.com/watch?v=XMv9QLPXYfY', 'https://www.youtube.com/watch?v=cpSgyIW7vQk', 'https://www.youtube.com/watch?v=LI_Rp7fYHCg', 
					 'https://www.youtube.com/watch?v=-6CYLsQ4Rv8', 'https://www.youtube.com/watch?v=u-6aALX_NjI', 'https://www.youtube.com/watch?v=lHGJos7-3F8', 'https://www.youtube.com/watch?v=n_evfu7Yc-o', 
					 'https://www.youtube.com/watch?v=ZzmyOi7C6iA', 'https://www.youtube.com/watch?v=T_foo2n9VYE', 'https://www.youtube.com/watch?v=p-hABrpoxYo', 'https://www.youtube.com/watch?v=mfnVO-YiXcM', 
					 'https://www.youtube.com/watch?v=VvZG3gSKREg', 'https://www.youtube.com/watch?v=BfXxU7-BHuA', 'https://www.youtube.com/watch?v=RgFx4aICM-A', 'https://www.youtube.com/watch?v=ERuMxl4qpKM', 
					 'https://www.youtube.com/watch?v=76IWgFzOmWo', 'https://www.youtube.com/watch?v=-XrJ3MPzw20', 'https://www.youtube.com/watch?v=1AVZNrHFvSU', 'https://www.youtube.com/watch?v=HBR_pD1hsXA', 
					 'https://www.youtube.com/watch?v=DdgZ2divRvk', 'https://www.youtube.com/watch?v=7nDScXffffg', 'https://www.youtube.com/watch?v=4LsvlfmEMQ8', 'https://www.youtube.com/watch?v=O0UxpaikIDc', 
					 'https://www.youtube.com/watch?v=H0gMSLXCRHo', 'https://www.youtube.com/watch?v=P9ojTpYSX8M', 'https://www.youtube.com/watch?v=namgtX_AMkU', 'https://www.youtube.com/watch?v=vWgdO27uzlU', 
					 'https://www.youtube.com/watch?v=sU4S2DmQA8Q', 'https://www.youtube.com/watch?v=JP2zTvHeGzo', 'https://www.youtube.com/watch?v=SipvYvaUXoo', 'https://www.youtube.com/watch?v=FUpza22te6g', 
					 'https://www.youtube.com/watch?v=U1ntWAava5A', 'https://www.youtube.com/watch?v=AJmugaHR8P8', 'https://www.youtube.com/watch?v=eaNtaov2qh8', 'https://www.youtube.com/watch?v=Qnd4RIfnCjY', 
					 'https://www.youtube.com/watch?v=Ju4YEn5e9xI', 'https://www.youtube.com/watch?v=RbARE0QCO6Y&index=14&list=PL774XWO1QyFc0F4ZRNreDlvA2lykYS9lO', 'https://www.youtube.com/watch?v=T10QLP9rJ04', 
					 'https://www.youtube.com/watch?v=_QxpTukisg8', 'https://www.youtube.com/watch?v=qo1FP6NBNIA', 'https://www.youtube.com/watch?v=YCWxEPLPSoE', 'https://www.youtube.com/watch?v=JGQ99X9XDqM', 
					 'https://www.youtube.com/watch?v=Fr75PxkFOq4', 'https://www.youtube.com/watch?v=1AcTjQxGP7Y', 'https://www.youtube.com/watch?v=VXdyrmT1VfU', 'https://www.youtube.com/watch?v=bgsRWPc9kSU',  
					 'https://www.youtube.com/watch?v=TDtPLoFIofY', 'https://www.youtube.com/watch?v=Zc_U6kcUdJQ', 'https://www.youtube.com/watch?v=UwTWJvd63HA', 'https://www.youtube.com/watch?v=9U47vx0iCgY', 
					 'https://www.youtube.com/watch?v=M0tJSYzHp7k', 'https://www.youtube.com/watch?v=5XQk14PgZMI', 'https://www.youtube.com/watch?v=lz-7yJ6dW3E']; 
					var animerand = Math.floor(Math.random() * anotherAnime.length); 
					tfu.send(anotherAnime[animerand]);
					break;

				case 'AMV':
				case 'АМВ':
				case 'амв':
				case 'amv': 
					var anotherAnime = ['https://www.youtube.com/watch?v=zRIPXQj-0Tk', 'https://www.youtube.com/watch?v=kJMHjaE47c0', 'https://www.youtube.com/watch?v=rDHm7glutlg', 'https://www.youtube.com/watch?v=DooJQlxXF9c', 
					'https://www.youtube.com/watch?v=uOgS7t8bSOs', 'https://www.youtube.com/watch?v=x2XEqQ4AjHo', 'https://www.youtube.com/watch?v=0LarHK5NSMM', 'https://www.youtube.com/watch?v=Sl_n3Ps8po8', 
					'https://www.youtube.com/watch?v=ZoPe1-pRo-g', 'https://www.youtube.com/watch?v=iaHr444rzf4', 'https://www.youtube.com/watch?v=dG7PFeiqkbU', 'https://www.youtube.com/watch?v=XMv9QLPXYfY', 
					'https://www.youtube.com/watch?v=ZnavCQFcClA', 'https://www.youtube.com/watch?v=hy7QZT4one0', 'https://www.youtube.com/watch?v=q7zEwsBnYwI', 'https://www.youtube.com/watch?v=RbARE0QCO6Y', 
					'https://www.youtube.com/watch?v=gbdeXP7-yQc', 'https://www.youtube.com/watch?v=QPkCvb6O70Y', 'https://www.youtube.com/watch?v=MHW3TvCVeq4', 'https://www.youtube.com/watch?v=p5ezRBpWz98', 
					'https://www.youtube.com/watch?v=b1etHSEkj1U', 'https://www.youtube.com/watch?v=OCu91oT6Skg', 'https://www.youtube.com/watch?v=naI_UqTEpRk', 'https://www.youtube.com/watch?v=PHmUKMgTQgw', 
					'https://www.youtube.com/watch?v=OXxokdPZZkA', 'https://www.youtube.com/watch?v=2TiyOJZvXEc', 'https://www.youtube.com/watch?v=HiUhMjKOPpQ', 'https://www.youtube.com/watch?v=Q67_Me-Eadk', 
					'https://www.youtube.com/watch?v=HYHtcH5lRDw', 'https://www.youtube.com/watch?v=DeRnerZLXZQ', 'https://www.youtube.com/watch?v=139JZNLONpg', 'https://www.youtube.com/watch?v=s-qkomodWXQ',
					'https://www.youtube.com/watch?v=jhMmgt9xh6U', 'https://www.youtube.com/watch?v=Hwmrk_TPXUQ', 'https://www.youtube.com/watch?v=v4KqbZ3iyVI', 'https://www.youtube.com/watch?v=7iK-x6Qgm68', 
					'https://www.youtube.com/watch?v=zt3PyJCGoRc', 'https://www.youtube.com/watch?v=jSu7oveH-1Y', 'https://www.youtube.com/watch?v=SovhO_3sNRQ', 'https://www.youtube.com/watch?v=RoOadj1m4sg', 
					'https://www.youtube.com/watch?v=4jLlZz6W3os', 'https://www.youtube.com/watch?v=P9mmiytr6Fc', 'https://www.youtube.com/watch?v=3pIdBzKN7M0', 'https://www.youtube.com/watch?v=zzigL4CfCiw', 
					'https://www.youtube.com/watch?v=yqpTKl1EBc4&list=RDyqpTKl1EBc4', 'https://www.youtube.com/watch?v=Jjdjnjkdtvc', 'https://www.youtube.com/watch?v=s02Rstg-Yb4', 'https://www.youtube.com/watch?v=L0K7cADZgIg', 
					'https://www.youtube.com/watch?v=VkRBnHJJ9Mg', 'https://www.youtube.com/watch?v=Q5RdtkFzOsM', 'https://www.youtube.com/watch?v=hRlpwWBGxHo', 'https://www.youtube.com/watch?v=6n_7AfA9Spo', 
					'https://www.youtube.com/watch?v=NZoYlikd32E', 'https://www.youtube.com/watch?v=MW-_TKu_QMM', 'https://www.youtube.com/watch?v=55GKhAw7D1o', 'https://www.youtube.com/watch?v=6QvjmVaK1FI', 
					'https://www.youtube.com/watch?v=5rwRFDhrQtU', 'https://www.youtube.com/watch?v=lXX7dRULFaE', 'https://www.youtube.com/watch?v=Hv739v637mQ', 'https://www.youtube.com/watch?v=KWAVuKoDEg8', 
					'https://www.youtube.com/watch?v=b_yG79hOET4', 'https://www.youtube.com/watch?v=-k6XpfE-u9A', 'https://www.youtube.com/watch?v=67YMbFkQCPU', 'https://www.youtube.com/watch?v=XuGOw7g8Ynk', 
					'https://www.youtube.com/watch?v=AlvVJGurMRQ', 'https://www.youtube.com/watch?v=aqoFSwR54LY', 'https://www.youtube.com/watch?v=J47hi87UYTs', 'https://www.youtube.com/watch?v=ioLBZh-VWBM', 
					'https://www.youtube.com/watch?v=SokJdsBL338', 'https://www.youtube.com/watch?v=7R54NOYxPZA', 'https://www.youtube.com/watch?v=rZ45qYShr7U', 'https://www.youtube.com/watch?v=3CDKOTUzJC4', 
					'https://www.youtube.com/watch?v=XE0VcJH2iuk']; 
					var animerand = Math.floor(Math.random() * anotherAnime.length); 
					tfu.send(anotherAnime[animerand]);
					break;
				//погода
				case 'Погода':
				case 'погода':
				tfu.send("https://pogoda.yandex.ru/");
				break;
				//погода
				//выдаёт игру
				case 'игра':
				case 'игры':
				var anotherAnime = ["http://agar.io/", 'https://apps.facebook.com/agar-io/?fb_source=bookmark&ref=bookmarks&count=0&fb_bmpos=_0', 'http://Diep.io', 'http://Slither.io', 'http://Wings.io', 
				'http://Vanar.io', 'http://Warin.space', 'Cursors.io', 'vertix.io', 'Vanar.io', 'http://www.limax.io'];
				var animerand = Math.floor(Math.random() * anotherAnime.length); 
					tfu.send(anotherAnime[animerand]);
				break;
				//выдаёт игру
				case 'Атлас':
				case 'атлас':
				case 'atlas':
				case 'карта':
				tfu.send("http://animeroom.esy.es");
				break;
				//<вики рок
				case 'вики':
				case 'Вики':
					tfu.deleteAuthorCmd(msgObj);
					if(cmd.length > 1) {
						tfu.send("https://ru.wikipedia.org/wiki/" + tfu.replaceUser (msgObj, afterCmd));
					}
					break;
				//вики рок>
				//<кик	
				case 'кик':
					tfu.deleteAuthorCmd(msgObj);
					if(cmd.length > 1) {
						tfu.send(tfu.replaceUser (msgObj, afterCmd) + ", Пшла вон отсюда");
					}
					break;
				//кик>
				//<лурк
				case 'лурк':
				case 'Лурк':
					tfu.deleteAuthorCmd(msgObj);
					if(cmd.length > 1) {
						tfu.send("http://lurkmirror.ml/" + tfu.replaceUser (msgObj, afterCmd));
					}
					break;
				//лурк>
				//<Гугл
				case 'Гугл':
				case 'гугл':
					tfu.deleteAuthorCmd(msgObj);
					if(cmd.length > 1) {
						tfu.send("https://yandex.ru/search/?text=" + tfu.replaceUser (msgObj, afterCmd));
					}
					break;
				//Гугл>
				case 'say':
				case 'сказать':
				case 'скажи':
					tfu.deleteAuthorCmd(msgObj);
					if(cmd.length > 1) {
						tfu.send(tfu.replaceUser(msgObj, afterCmd) + "\n заставил(а) сказать:" + (msgObj.parent().parent().find('.author').text()));
					}
					break;
				case 'gender':
				case 'sex':
				case 'род':
				case 'пол':
					var userData;
					var requestUser = msgObj.find('span.user');
					if(requestUser.length > 0) {
						userData = tfu.getUserData(requestUser[0].getAttribute('data-id'));
						if(userData == false)
							userData = tfu.getUserData(tfu.getAuthorID(msgObj));
					}
					else {
						userData = tfu.getUserData(tfu.getAuthorID(msgObj));
					}
					tfu.send("У " + userData['name'] + " пол: " + (userData['sex'] == 'm' ? 'мужской' : 'женский'));
					break;
					case 'pornhub':
					case 'porn':
					var anotherAnime = ['Не в этот раз', 'http://www.naturismforum.com/uploads/monthly_04_2015/post-28412-0-39994300-1429290476.png', 'https://im2-tub-ru.yandex.net/i?id=c8bf75ff27fbfc22b9546c28ff079ae6&n=33&h=190&w=156', 
					'Охлади своё трахание\n\
					http://cs627619.vk.me/v627619274/3b0f/MXSmt4TvRfU.jpg ', 
					'Охлади своё трахание\n\
					http://cs5.pikabu.ru/post_img/2015/09/18/6/1442565698_1219470036.jpg', 
					'https://pp.vk.me/c7004/v7004935/23f50/uEXpf4W5JgE.jpg'];
					var animerand = Math.floor(Math.random() * anotherAnime.length);
					tfu.send(anotherAnime[animerand]);
					break;
				case 'info':
				case 'инфо':
				case 'help':
					tfu.send("Команды комнаты:\n\
						!расписание стрим - в комнату проводятся литературные стримы. Если вам интересно то данная команда показывает расписание\n\
						!rule - правила комнаты\n\
						!about - инфа о боте\n\
						!скажи [текст] - повторяет то что напишете\n\
						!пол [+Ник] - сообщит пол\n\
						!аниме - посоветует аниме\n\
						!8 + вопрос\n\
						!погода предсказывает погоду на завтра\n\
						!ютуб - даст заценить ролик из Ютуба\n\
						!игры - выдаёт игру из Интернета\n\
						!города - Напомнит на какой букве в этой комнате остановились\n\
						!вики + слово Узнайте для себя чтото новое зайдите в справочник Википедии\n\
						!лурк + слово Делает тоже самое что и Википедия, только в стиле Лурка\n\
						!ликбес - краткое объяснение правил чата для новеньких\n\
						!атлас - Владения Тикстеров из Аниме комнаты\n\
						!кун - Команда для девочек\n\
						!анкета - Позволяет узнать получше жителей Аниме комнаты\n\
					");
					break;
				case 'author':
				case 'автор':
				case 'осебе':
				case 'about':
					tfu.send("Name = Юми \n\
						v0.2.4.9\n\
						Создатель\n\
						- https://pp.vk.me/c631130/v631130964/2b830/SMzky-OAg3U.jpg Vladimir Davydov\n\
						Прототипом послужил бот программиста Vaflan\n\
						Благодарность за помощь: \n\
						- https://pp.vk.me/c622530/v622530964/435a2/c8k1gFz6qw4.jpg XoBpawok\n\
						- https://pp.vk.me/c624916/v624916964/47bbd/YNqqaLUeZQU.jpg Маньячка Eleanora\n\
						- https://pp.vk.me/c623419/v623419964/4f3bf/mgDsLL0-Ess.jpg Здыхлик\n\
						- https://pp.vk.me/c636326/v636326964/33df/zLXBr5oisWw.jpg Ахинея\n\
						Идеи писать в ЛС автору");
					break;
				default:
			}
		}
	/*
		if(msg.substr(0,1) == ':') {
			var roomId = this.getRoomId(msgObj);
			var cmd = msg.substr(1).split(' ');
			afterCmd = msg.substr(cmd[0].length + 2);
			console.log('command: ' + cmd[0] + ' room: ' + roomId);

			switch(cmd[0].toLowerCase()) {
				case ')':
				
					tfu.send("https://pp.vk.me/c629406/v629406964/13c7f/pDscF3j-wGA.jpg");
					break;
				case '(':
				
					tfu.send("https://pp.vk.me/c629406/v629406964/13c86/kuWuRcz1VtM.jpg");
					break;
				case 'с':
				case 'c':
					tfu.send("Уныние");
					break;

				case 'p':
				case 'р':
					tfu.send("Язык");
					break;
				case 'D':
					tfu.send("Восторг");
					break;
				case "'(":
					tfu.send("Мне плохо");
					break;
				case "'с":
				case "'c":
					tfu.send("Жизнь это просто неудачная шутка");
					break;
			}
		}
			if(msg.substr(0,1) == 'X') {
			var roomId = this.getRoomId(msgObj);
			var cmd = msg.substr(1).split(' ');
			afterCmd = msg.substr(cmd[0].length + 2);
			console.log('command: ' + cmd[0] + ' room: ' + roomId);

			switch(cmd[0].toLowerCase()) {
				case 'D':
				
					tfu.send("Очень смешно");
					break;
				}
			}
//https://docs.google.com/open?id=0B8nJWTqYcm30QnFKM2RkWVRBd2s
*/
//<Антимат
if(msg.substr(0,1) == 'С' || 'с') {
			var roomId = this.getRoomId(msgObj);
			var cmd = msg.substr(1).split(' ');
			afterCmd = msg.substr(cmd[0].length + 2);
			console.log('command: ' + cmd[0] + ' room: ' + roomId);
			switch(cmd[0].toLowerCase()) {
				case 'уки':
				case 'учки':
				tfu.deleteAuthorCmd(msgObj);
					tfu.send("Мат запрещён");
					break;
				}
			}
if(msg.substr(0,1) == 'М' || 'м') {
			var roomId = this.getRoomId(msgObj);
			var cmd = msg.substr(1).split(' ');
			afterCmd = msg.substr(cmd[0].length + 2);
			console.log('command: ' + cmd[0] + ' room: ' + roomId);
			switch(cmd[0].toLowerCase()) {
				case 'ля':
				tfu.deleteAuthorCmd(msgObj);
					tfu.send("Мат запрещён");
					break;
				}
			}
if(msg.substr(0,1) == 'П' || 'п') {
			var roomId = this.getRoomId(msgObj);
			var cmd = msg.substr(1).split(' ');
			afterCmd = msg.substr(cmd[0].length + 2);
			console.log('command: ' + cmd[0] + ' room: ' + roomId);
			switch(cmd[0].toLowerCase()) {
				case 'зц':
				case 'здц':
				case 'здец':
				case 'издец':
				case 'утин':
				case 'орошенко':
				case 'идр':
				case 'идрила':
				case 'идрилы':
				case 'идарас':
				case 'идарасы':
				tfu.deleteAuthorCmd(msgObj);
					tfu.send("Мат запрещён");
					break;
				}
			}
if(msg.substr(0,1) == 'А' || 'а' || 'Б' || 'б' || 'В' || 'в' || 'Г' || 'г' || 'Д' || 'д' || 'Е' || 'е' || 'Ё' || 'ё' || 'Ж' || 'ж' || 'З' || 'з' || 'И' || 'и' || 'Й' || 'й' || 'К' || 'к' || 'Л' || 'л' || 'Н' || 'н' || 'О' || 'о' || 'Р' || 'р' || 'Т' || 'т' || 'У' || 'у' || 'Ф' || 'ф' || 'Х' || 'х' || 'Ц' || 'ц' || 'Ч' || 'ч' || 'Ш' || 'ш' || 'Щ' || 'щ' || 'Э' || 'э' || 'Ю' || 'ю' || 'Я' || 'я') {
			var roomId = this.getRoomId(msgObj);
			var cmd = msg.substr(1).split(' ');
			afterCmd = msg.substr(cmd[0].length + 0);
			console.log('command: ' + cmd[0] + ' room: ' + roomId);

			switch(cmd[0].toLowerCase()) { 
				case 'уй':
				case 'у й':
				case ' у й':
				case ' уй':
				case 'уйня':
				case 'уйло':
				case 'оси':
				case 'учары':
				case 'учара':
				case 'лядь':
				case 'ляди':
				case 'лять':
				case 'разь':
				case 'рази':
				case 'варь':
				case 'бама':
				case 'еркель':
				case 'езулина':
				case 'есков':
				case 'оскаль':
				case 'оскали':
				case 'оскаяку':
				case 'охол':
				case 'охлы':
				case 'усора':
				case 'рахание':
				case 'рахаться':
				case 'рахатся':
				case 'авно':
				case 'ахуя':
				case 'хуел':
				case 'аебал':
				case 'бля':
				case 'ихера':
				case 'ахера':
				case 'раный':
				case 'пиздил':
				tfu.deleteAuthorCmd(msgObj); 
					tfu.send("Мат запрещён");
					break;
				}
			} 
//Антимат> pornovideo24.com
//<Антиспам
if(msg.substr(0,1) == 'P' || 'p' || 'A' || 'a' || 'B' || 'b' || 'C' || 'c' || 'D' || 'd' || 'Д' || 'д' || 'Е' || 'е' || 'Ё' || 'ё' || 'Ж' || 'ж' || 'З' || 'з' || 'И' || 'и' || 'Й' || 'й' || 'К' || 'к' || 'Л' || 'л' || 'М' || 'м' || 'Н' || 'н' || 'О' || 'о' || 'П' || 'п' || 'Р' || 'р' || 'С' || 'с' || 'Т' || 'т' || 'У' || 'у' || 'Ф' || 'ф' || 'Х' || 'х' || 'Ц' || 'ц' || 'Ч' || 'ч' || 'Ш' || 'ш' || 'Щ' || 'щ' || 'Э' || 'э' || 'Ю' || 'ю' || 'Я' || 'я') {
			var roomId = this.getRoomId(msgObj);
			var cmd = msg.substr(1).split(' ');
			afterCmd = msg.substr(cmd[0].length + 2);
			console.log('command: ' + cmd[0] + ' room: ' + roomId);

			switch(cmd[0].toLowerCase()) {
				case 'ornovideo24.com':
				tfu.deleteAuthorCmd(msgObj);
					tfu.send("Мат запрещён");
					break;
				}
			}
//Антиспам>
			if(msg.substr(0,1) == '*') {
			var roomId = this.getRoomId(msgObj);
			var cmd = msg.substr(1).split(' ');
			afterCmd = msg.substr(cmd[0].length + 2);
			console.log('command: ' + cmd[0] + ' room: ' + roomId);

			switch(cmd[0].toLowerCase()) {
				case 'ушёл*':
				case 'ушла*':
				case 'АФК*':
				case 'афк*':
				case 'afk*':
				case 'AFK*':
					tfu.send("Возвращайся поскорее");
					break;
				case 'пришёл*':
					tfu.send("с позвращением");
					break;
					default:
				};
			}
		//}
		/*Ответ на привет*/
		if(msg.substr(0,1) == '/') {
			var roomId = this.getRoomId(msgObj);
			var cmd = msg.substr(1).split(' ');
			afterCmd = msg.substr(cmd[0].length + 2);
			console.log('command: ' + cmd[0] + ' room: ' + roomId);

			switch(cmd[0].toLowerCase()) {
				case '!':
					tfu.send("Возвращайся поскорее");
					break;
					default:
				};
			}
	},

	deleteAuthorCmd: function(msgObj) {
		console.log("Command init by " + msgObj.parent().parent().find('.author').text());
		msgObj.parent().children('.deleteMessage').click();
	},
	send: function(text, chatId) {
		if(chatId === undefined) {
			chatId = this.roomId;
		}
		$('.Room[data-rid='+chatId+'] .compose .Input').val(text);
		$('.Room[data-rid='+chatId+'] .compose .Button').click();
	},
	replaceUser: function(html, text) {
		var userList = html.find('.user');
		for(key in userList) {
			if(userList.hasOwnProperty(key) && key <= 4294967294) {
				text = text.replace(userList[key].innerHTML.trim(), '+'+userList[key].innerHTML.trim());
			}
		}
		return text;
	},
	getRoomId: function(ActiveObj) {
		return ActiveObj.closest('div.Room').attr('data-rid');
	},
	getAuthorID: function(msgObj) {
		return msgObj.parent().parent().find('.author').attr('data-id');
	},
	getUserData: function(id, full) {
		if(C.Room.objects[this.roomId].users[id] !== undefined) {
			if(full === undefined)
				return C.Room.objects[this.roomId].users[id].data;
			return C.Room.objects[this.roomId].users[id];
		}
		return false;
	}
};


setTimeout("tfu.init()", 10000);

//
	setInterval(function(){
		/*Новый Год скрипт
		
		var n = ['С Новым Годом Хабаровск, Владивосток!!!', 'С Новым Годом Чита, Благовещенск, Якутск!!!', 'С Новым Годом Бартск, Иркутск!!!', 'С Новым Годом Карсноярск, Кемерово, Новокузнецк!!!', 'С Новым Годом Орск, Барнаул, Томск!!!', 'С Новым Годом Екатеринбург, Челябинск Тюмень!!!', 'С Новым Годом Самара, Казань, Ижевск!!!', 
		'С Новым Годом Краснодар, Санкт-Петербург, Симферопль, Москва!!!', 'С Новым Годом Киев, Калиниград, Кривой рог, Минск, Вильнюс, Рига!!!'];
		var rand = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		n = rand
		if (rand==true) rand++;
		tfu.send(n[rand]);

		Новый Год скрипт*/ 
		var anotherAnime = [  
'http://s019.radikal.ru/i609/1606/92/ada0b6090a60.png',
'http://s020.radikal.ru/i707/1606/d5/ff94e3a13c3a.png Вот какой в этом чате бывает карма. Вам есть к чему стремится человеки.', 
'Чтобы добавлять картинки в чате просто вставляйте сноску на неё в текст чата. Если картинка на компьютере, загрузите её сначала в вк или на фэисбук',
'!атлас. Если ввести эту команду, то можно увидеть георграфию расселения тикстеров из Аниме комнаты.\n\
Мы любим каждого прибывшего в нашу комнату. Если вы хотите оказаться в числе граждан нашей комнаты просто назовите свой Город и не забывайте о нашей комнате.\n\
Радуйте нас свооим присутствием. Назавания городов отправляйте создателю комнаты в ЛС\n\
Чтобы узнать кто создатель комнаты введите команду !about. Автор бота и есть создатель комнаты.',
'Если вы придумали интерессную идею о том как можно улучшить бота, напишите о ней создателю бота в ЛС\n\
Для того чтобы узнать кто создатель бота просто введите !about',
'Я Юми и я люблю когда вы вводите в чат !инфо',
'Меня зовут Юми, я живу в Аниме комнате не долго, но смогу пережить вас всех',
'В комнате есть музыка. Вы можете послушать её или загрузить свою\n\
Просто щёлкнте по бумбоксу и загрузите музыку со своего Жёсткого диска\n\
Музыка может появится не сразу, нужно ждать от 6 до 24 часов',
'Музыка в бумбоксе может появится не сразу, нужно ждать от 6 до 24 часов',
'Майнер печенек, майнит печеньки пока вы спите.(работает только в хроме с включённым браузером)\n\
Переходите по сслыке чтобы скачать приложение и установить его на свой браузер\n\
 https://chrome.google.com/webstore/detail/tix-cookies-miner/nmlgcndpljgojfidnmlkeafikncpaoea', 
'Майнер печенек, майнит печеньки пока вы спите.(работает только в мозилле с включённым браузером)\n\
Переходите по сслыке чтобы скачать приложение и установить его на свой браузер\n\
 https://addons.mozilla.org/en-US/firefox/addon/tix-cookies-miner/',
'Любите Nighcore? Тогда подпишитесь на очаровательного видеоблоггера.\n\
Она делает свои клипы с душой https://www.youtube.com/channel/UC-FIE0tlWxZzvM5-V_I6iQw', 
'Привет я Юми. Собщаю вам что в комнате есть бумбоксы.\n\
В комнате 2 бумбокса, тот что с лева общественный. В него можно грузить что угодно главное чтобы народу нравилось в комнате\n\
Второй для стримов и других целей. В него грузить музыку запрещено.', 
'Ваташи ва Юми дэс', 
'My body is a cage that keeps me\n\
From dancing with the one I love\n\
But my mind holds the key'
/*'Забутырник у остряка. Мой поханя ухилил, чон окальпушил вас.'*/
/*'Всем привет. Я редко у вас что либо прошу но сейчас нужна ваша помощь. Сестра моего создателя участвует в конкурсе красоты.\n\
 Прошу вас проголосуйте за неё на сайте\n\
 http://www.wday.ru/stil-zhizny/vibor-redakcii/miss-beauty-samara-2016-9-samyih-krasivyih-devushek/11/ \n\ My Body is a Cage
 Давыдова Татьяна \n\
 Заранее благодарю '*/];
						var animerand = Math.floor(Math.random() * anotherAnime.length);
						tfu.send(anotherAnime[animerand]);
}, 3600000)