// Данные об услугах и подуслугах
const services = {
    "Ремонт под ключ": {
        icon: "capy_repair_chest.png",
        subservices: ["Комплексный ремонт", "Дизайн-проект", "Закупка материалов"]
    },
    "Электрика": {
        icon: "capy_electricity_chest.png",
        subservices: ["Электромонтаж квартиры/дома", "Установка розеток/выключателей", "Монтаж люстр/светильников", "Прокладка проводки"]
    },
    "Сантехника": {
        icon: "capy_plumbing_large_wrench_chest.png",
        subservices: ["Установка сантехники", "Установка душевых кабинок", "Прочистка засоров", "Замена труб", "Установка водонагревателей"]
    },
    "Строительно-отделочные работы": {
        icon: "capy_construction_chest.png",
        subservices: ["Укладка плитки", "Гипсокартон", "Штукатурка и выравнивание", "Покраска стен/потолков", "Бетонные работы", "Демонтаж конструкций"]
    },
    "Мебель и сборка": {
        icon: "capy_furniture_chest.png",
        subservices: ["Сборка мебели", "Навешивание полок, зеркал", "Ремонт мебели"]
    },
    "Напольные покрытия": {
        icon: "capy_flooring_chest.png",
        subservices: ["Укладка ламината/паркета", "Монтаж линолеума"]
    },
    "Окна, двери": {
        icon: "capy_windows_chest.png",
        subservices: ["Установка окон", "Монтаж дверей"]
    },
    "Фасадные и кровельные работы": {
        icon: "capy_roofing_large_piece_chest.png",
        subservices: ["Монтаж/ремонт кровли", "Утепление фасадов"]
    },
    "Сварочные работы": {
        icon: "capy_welding_large_torch_chest.png",
        subservices: ["Сварка металлоконструкций", "Сварка труб"]
    },
    "Мелкий бытовой ремонт": {
        icon: "capy_small_repair_chest.png",
        subservices: ["Замена замков, ручек", "Ремонт розеток/выключателей", "Установка телевизоров"]
    },
    "Бытовая техника": {
        icon: "capy_appliance_chest.png",
        subservices: ["Ремонт холодильников, стиральных машин", "Установка кондиционеров"]
    },
    "Дополнительные услуги": {
        icon: "capy_box_chest.png",
        subservices: ["Установка видеодомофонов", "Услуги грузчика"]
    }
};

// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Отображение категорий
const servicesContainer = document.getElementById('servicesContainer');
const subservicesContainer = document.getElementById('subservicesContainer');

Object.entries(services).forEach(([service, data]) => {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `<img src="${data.icon}" alt="${service}" class="service-icon" loading="lazy"><p>${service}</p>`;
    card.addEventListener('click', () => {
        // Показать подуслуги
        subservicesContainer.style.display = 'block';
        subservicesContainer.innerHTML = `<h2>${service}</h2>`;
        data.subservices.forEach(sub => {
            const btn = document.createElement('button');
            btn.className = 'subservice-btn';
            btn.textContent = sub;
            btn.addEventListener('click', () => {
                // Отправить данные в Telegram
                tg.sendData(JSON.stringify({ service, subservice: sub }));
                tg.close();
            });
            subservicesContainer.appendChild(btn);
        });
        // Прокрутить к подуслугам
        subservicesContainer.scrollIntoView({ behavior: 'smooth' });
    });
    servicesContainer.appendChild(card);
});

// Обработка кнопки "Назад" в Telegram
tg.BackButton.onClick(() => {
    subservicesContainer.style.display = 'none';
    subservicesContainer.innerHTML = '';
    servicesContainer.scrollIntoView({ behavior: 'smooth' });
});
