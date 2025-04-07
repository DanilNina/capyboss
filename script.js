const services = {
    "🏠 Ремонт под ключ": {
        description: "Полный ремонт квартиры или дома",
        tasks: ["Комплексный ремонт (демонтаж, черновая и чистовая отделка)"]
    },
    "🔌 Электрика": {
        description: "Розетки, освещение, проводка",
        tasks: ["Полный электромонтаж", "Установка розеток/выключателей", "Монтаж освещения (люстры, бра)", "Прокладка проводки", "Сборка электрощитов", "Умные розетки/датчики", "Электрические тёплые полы"]
    },
    "🚿 Сантехника": {
        description: "Смесители, унитазы, трубы",
        tasks: ["Установка сантехники (смесители, ванны, унитазы)", "Монтаж душевых кабин", "Прочистка засоров", "Замена труб", "Установка водонагревателей", "Монтаж котлов", "Водяные тёплые полы", "Установка радиаторов", "Гидромассажные системы"]
    },
    "🌲 Ландшафт": {
        description: "Газоны, плитка, дренаж",
        tasks: ["Укладка плитки/бордюров", "Дренажные системы", "Устройство газонов"]
    },
    "🏗️ Строительство и отделка": {
        description: "Плитка, штукатурка, обои",
        tasks: ["Укладка плитки", "Кладка (кирпич, газобетон)", "Гипсокартон", "Штукатурка/выравнивание", "Покраска", "Поклейка обоев", "Декоративная штукатурка", "Натяжные потолки", "Бетонные работы", "Демонтаж"]
    },
    "🪑 Мебель": {
        description: "Сборка, ремонт, полки",
        tasks: ["Сборка мебели", "Навешивание полок/зеркал", "Ремонт мебели", "Регулировка фурнитуры"]
    },
    "🌳 Полы": {
        description: "Ламинат, линолеум, ремонт",
        tasks: ["Укладка ламината/паркета", "Монтаж линолеума/ковролина", "Ремонт полов"]
    },
    "🪟 Двери и окна": {
        description: "Окна, двери, доборы",
        tasks: ["Установка окон", "Монтаж дверей (входных/межкомнатных)", "Установка доборов"]
    },
    "🏡 Фасад и кровля": {
        description: "Кровля, фасады, утепление",
        tasks: ["Монтаж/ремонт кровли", "Облицовка фасадов", "Утепление", "Водосточные системы"]
    },
    "🔥 Сварка": {
        description: "Конструкции, трубы, изделия",
        tasks: ["Сварка конструкций", "Сварка труб", "Ремонт металла", "Художественная сварка", "Изготовление на заказ"]
    },
    "🛠️ Мелкий ремонт": {
        description: "Замки, плинтуса, ТВ",
        tasks: ["Замена замков/ручек", "Установка плинтусов", "Монтаж ТВ на стену"]
    },
    "❄️ Техника и климат": {
        description: "Ремонт техники, кондиционеры",
        tasks: ["Ремонт бытовой техники", "Подключение стиральных машин", "Установка кондиционеров", "Монтаж вентиляции", "Подключение посудомоек"]
    },
    "📡 Антенны": {
        description: "Антенны, спутниковое ТВ",
        tasks: ["Установка антенн", "Настройка спутникового ТВ"]
    },
    "🚚 Грузчик": {
        description: "Погрузка и разгрузка",
        tasks: ["Погрузка/разгрузка"]
    },
    "🚀 Другое": {
        description: "Любые другие задачи",
        tasks: ["Укажи вручную"]
    }
};

const servicesContainer = document.getElementById('servicesContainer');
const orderForm = document.getElementById('orderForm');
const selectedService = document.getElementById('selectedService');
const taskList = document.getElementById('taskList');
const selectAllBtn = document.getElementById('selectAll');
let currentService = null;

Object.entries(services).forEach(([service, { description }]) => {
    const card = document.createElement('div');
    card.className = 'service-card bg-white p-4 rounded-lg shadow-md hover-scale border border-gray-200';
    card.innerHTML = `
        <h3 class="text-lg font-semibold text-gray-800">${service}</h3>
        <p class="text-sm text-gray-600">${description}</p>
    `;
    card.addEventListener('click', () => {
        currentService = service;
        selectedService.textContent = service;
        taskList.innerHTML = '';
        services[service].tasks.forEach(task => {
            const div = document.createElement('div');
            div.className = 'flex items-center';
            div.innerHTML = `
                <input type="checkbox" name="tasks" value="${task}" class="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                <label class="text-sm text-gray-700">${task}</label>
            `;
            taskList.appendChild(div);
        });
        orderForm.classList.remove('hidden');
        servicesContainer.classList.add('hidden');
    });
    servicesContainer.appendChild(card);
});

selectAllBtn.addEventListener('click', function() {
    const checkboxes = taskList.querySelectorAll('input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    checkboxes.forEach(cb => cb.checked = !allChecked);
});

orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const address = document.getElementById('address').value.trim();
    const tasks = Array.from(taskList.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

    if (!address) {
        document.getElementById('status').textContent = "Пожалуйста, укажите адрес!";
        document.getElementById('status').classList.remove('text-green-600');
        document.getElementById('status').classList.add('text-red-600');
        return;
    }
    if (tasks.length === 0 && currentService !== "🚚 Грузчик" && currentService !== "🚀 Другое") {
        document.getElementById('status').textContent = "Пожалуйста, выберите хотя бы одну задачу!";
        document.getElementById('status').classList.remove('text-green-600');
        document.getElementById('status').classList.add('text-red-600');
        return;
    }

    const orderData = {
        service: currentService,
        tasks: tasks.length > 0 ? tasks : null,
        address: address
    };

    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.sendData(JSON.stringify(orderData));
        document.getElementById('status').textContent = "Заказ отправлен! Жди мастера! 😊";
        document.getElementById('status').classList.remove('text-red-600');
        document.getElementById('status').classList.add('text-green-600');
        setTimeout(() => window.Telegram.WebApp.close(), 1000);
    } else {
        console.log("Order Data:", orderData);
        document.getElementById('status').textContent = "Заказ отправлен (проверь консоль)!";
        document.getElementById('status').classList.remove('text-red-600');
        document.getElementById('status').classList.add('text-green-600');
    }
});

if (window.Telegram && window.Telegram.WebApp) {
    Telegram.WebApp.ready();
    Telegram.WebApp.MainButton.setText('📞 Вызвать мастера')
        .show()
        .onClick(() => document.getElementById('orderForm').requestSubmit());
}