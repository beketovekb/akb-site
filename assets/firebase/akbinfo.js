function updateData(snapshot) {
    var infoakb = document.getElementById('infoakb');
    infoakb.innerHTML = ''; // Очистка содержимого

    snapshot.forEach(function(childSnapshot) {
        var deviceId = childSnapshot.key;
        var deviceData = childSnapshot.val();
        
        // Получаем текущую временную метку
        var currentTimestamp = Date.now();
        // Проверяем последнюю запись
        var lastEntryTimestamp = new Date(deviceData.Timestamp).getTime();
        var onlineStatus = (currentTimestamp - lastEntryTimestamp) <= 60000 ? 'Онлайн' : 'Оффлайн'; // 5 минут (300000 мс)

        var col = document.createElement('div');
        col.className = 'col-sm-6 col-12';
        
        var card = document.createElement('div');
        card.className = 'card mb-2';
        
        var cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';
        var cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = 'Аккумулятор №' + deviceId;
        cardHeader.appendChild(cardTitle);
        
        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        
        var alignStart = document.createElement('div');
        alignStart.className = 'd-flex align-items-start';
        
        var img = document.createElement('img');
        img.src = 'assets/images/akbico.png';
        img.alt = 'Аккумулятор';
        img.className = 'img-fluid img-5x rounded-3';
        
        var infoDiv = document.createElement('div');
        infoDiv.style.width = '100%';
        
        var listGroup = document.createElement('ul');
        listGroup.className = 'list-group';

        var itemStatus = document.createElement('li');
        itemStatus.className = 'list-group-item d-flex justify-content-between align-items-center';
        itemStatus.textContent = 'Статус';
        var badgeStatus = document.createElement('span');
        badgeStatus.className = onlineStatus === 'Онлайн' ? 'badge bg-success' : 'badge bg-danger';
        badgeStatus.textContent = onlineStatus;
        itemStatus.appendChild(badgeStatus);

        var item1 = document.createElement('li');
        item1.className = 'list-group-item d-flex justify-content-between align-items-center';
        item1.textContent = 'Заряд акб';
        var badge1 = document.createElement('span');
        badge1.className = 'badge bg-primary';
        badge1.textContent = deviceData.Cul + ' %';
        item1.appendChild(badge1);
        
        // var item2 = document.createElement('li');
        // item2.className = 'list-group-item d-flex justify-content-between align-items-center';
        // item2.textContent = 'Сила тока';
        // var badge2 = document.createElement('span');
        // badge2.className = 'badge bg-primary';
        // badge2.textContent = deviceData.Current + ' А';
        // item2.appendChild(badge2);
        
        var item3 = document.createElement('li');
        item3.className = 'list-group-item d-flex justify-content-between align-items-center';
        item3.textContent = 'Напряжение';
        var badge3 = document.createElement('span');
        badge3.className = 'badge bg-primary';
        badge3.textContent = deviceData.Voltage + ' В';
        item3.appendChild(badge3);
        
        var item4 = document.createElement('li');
        item4.className = 'list-group-item d-flex justify-content-between align-items-center';
        item4.textContent = 'Температура';
        var badge4 = document.createElement('span');
        badge4.className = 'badge bg-primary';
        badge4.textContent = deviceData.Temperature  + ' С';
        item4.appendChild(badge4);

        var item5 = document.createElement('li');
        item5.className = 'list-group-item d-flex justify-content-between align-items-center';
        item5.textContent = 'Напряжение 220';
        var badge5 = document.createElement('span');
        badge5.className = 'badge bg-primary';
        badge5.textContent = deviceData.Voltage220  + ' В';
        item5.appendChild(badge5);

        var item7 = document.createElement('li');
        item7.className = 'list-group-item d-flex justify-content-between align-items-center';
        item7.textContent = 'Сила тока 220';
        var badge7 = document.createElement('span');
        badge7.className = 'badge bg-primary';
        badge7.textContent = deviceData.Power220 + ' А';
        item7.appendChild(badge7);

        var item6 = document.createElement('li');
        item6.className = 'list-group-item d-flex justify-content-between align-items-center';
        var button = document.createElement('button');
        button.className = 'btn btn-primary btn-lg';
        button.style.marginLeft = 'auto';
        button.style.marginRight = '0';
        button.textContent = 'График';
        button.onclick = function() {
            redakbgraph(deviceId);
        };
        item6.appendChild(button);

        listGroup.appendChild(itemStatus);
        // listGroup.appendChild(item1);
        // listGroup.appendChild(item2);
        listGroup.appendChild(item3);
        listGroup.appendChild(item4);
        listGroup.appendChild(item5);
        listGroup.appendChild(item7);
        listGroup.appendChild(item6);
        
        infoDiv.appendChild(listGroup);
        alignStart.appendChild(img);
        alignStart.appendChild(infoDiv);
        cardBody.appendChild(alignStart);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        col.appendChild(card);
        infoakb.appendChild(col);
    });
}

function fetchAndDisplayData() {
    firebase.database().ref('/deviceData').on('value', function(snapshot) {
        updateData(snapshot);
    }, function (errorObject) {
        console.error("The read failed: " + errorObject.code);
    });
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayData);

function redakbgraph(id) {
    localStorage.setItem('deviceId', id);
    window.location.replace("/akbgraph.html");
}
