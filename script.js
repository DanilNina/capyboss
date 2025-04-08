const services = {
    "Ремонт под ключ": {
        description: "Полный цикл ремонта для вашего дома",
        icon: "🏠",
        tasks: ["Комплексный ремонт (демонтаж, отделка)"]
    },
    "Электрика": {
        description: "Освещение, розетки, проводка",
        icon: "🔌",
        tasks: ["Установка розеток", "Монтаж освещения", "Прокладка проводки"]
    },
    "Сантехника": {
        description: "Вода, трубы, смесители",
        icon: "🚿",
        tasks: ["Установка сантехники", "Замена труб", "Прочистка засоров"]
    },
    "Строительство": {
        description: "Отделка, кладка, плитка",
        icon: "🏗️",
        tasks: ["Укладка плитки", "Штукатурка", "Покраска"]
    }
};

const tg = window.Telegram?.WebApp;
if (tg) tg.ready();

const servicesContainer = document.getElementById('servicesContainer');
const formContainer = document.getElementById('formContainer');
const orderForm = document.getElementById('orderForm');
const selectedService = document.getElementById('selectedService');
const taskList = document.getElementById('taskList');
const selectAllBtn = document.getElementById('selectAll');
const status = document.getElementById('status');
const addressInput = document.getElementById('address');

Object.entries(services).forEach(([service, { description, icon, tasks }]) => {
    const card = document.createElement('div');
    card.className = 'card p-4 border rounded-lg cursor-pointer hover:shadow-lg transition bg-white';
    card.innerHTML = `
        <div class="text-3xl">${icon}</div>
        <h3 class="mt-2 text-lg font-semibold text-gray-800">${service}</h3>
        <p class="text-gray-500 text-sm">${description}</p>
    `;
    card.addEventListener('click', () => {
        selectedService.textContent = service;
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const div = document.createElement('div');
            div.className = 'flex items-center mb-2';
            div.innerHTML = `
                <input type="checkbox" name="tasks" value="${task}" class="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded">
                <label class="text-gray-700">${task}</label>
            `;
            taskList.appendChild(div);
        });

        formContainer.classList.remove('hidden');
        servicesContainer.classList.add('hidden');

        if (tg) {
            tg.MainButton.setText("Вызвать мастера").show().onClick(() => orderForm.requestSubmit());
        }
    });
    servicesContainer.appendChild(card);
});

selectAllBtn.addEventListener('click', () => {
    const checkboxes = taskList.querySelectorAll('input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    checkboxes.forEach(cb => cb.checked = !allChecked);
});

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = addressInput.value.trim();
    const tasks = Array.from(taskList.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

    if (!address) {
        status.textContent = "Укажите адрес!";
        status.className = "text-red-600 font-medium";
        return;
    }
    if (tasks.length === 0) {
        status.textContent = "Выберите хотя бы одну задачу!";
        status.className = "text-red-600 font-medium";
        return;
    }

    const orderData = {
        service: selectedService.textContent,
        tasks,
        address
    };

    if (tg) {
        tg.sendData(JSON.stringify(orderData));
        status.textContent = "Заказ отправлен! Ожидайте мастера!";
        status.className = "text-green-600 font-medium";
        setTimeout(() => tg.close(), 1200);
    } else {
        console.log("Заказ (offline):", orderData);
        status.textContent = "Заказ отправлен (но Telegram не подключён)";
        status.className = "text-yellow-600 font-medium";
    }
});
