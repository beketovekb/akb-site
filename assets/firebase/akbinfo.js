function updateData(snapshot) {
    var infoakb = document.getElementById('infoakb');
    infoakb.innerHTML = ''; // Очистка содержимого

    snapshot.forEach(function(childSnapshot) {
        var deviceId = childSnapshot.key;
        var deviceData = childSnapshot.val();

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
        
        var item1 = document.createElement('li');
        item1.className = 'list-group-item d-flex justify-content-between align-items-center';
        item1.textContent = 'Заряд акб';
        var badge1 = document.createElement('span');
        badge1.className = 'badge bg-primary';
        badge1.textContent = deviceData.Cul + ' %';
        item1.appendChild(badge1);
        
        var item2 = document.createElement('li');
        item2.className = 'list-group-item d-flex justify-content-between align-items-center';
        item2.textContent = 'Сила тока';
        var badge2 = document.createElement('span');
        badge2.className = 'badge bg-primary';
        badge2.textContent = deviceData.Current/100 + ' А';
        item2.appendChild(badge2);
        
        var item3 = document.createElement('li');
        item3.className = 'list-group-item d-flex justify-content-between align-items-center';
        item3.textContent = 'Напряжение';
        var badge3 = document.createElement('span');
        badge3.className = 'badge bg-primary';
        badge3.textContent = deviceData.Voltage/100 + ' В';
        item3.appendChild(badge3);
        
        var item4 = document.createElement('li');
        item4.className = 'list-group-item d-flex justify-content-between align-items-center';
        item4.textContent = 'Температура';
        var badge4 = document.createElement('span');
        badge4.className = 'badge bg-primary';
        badge4.textContent = deviceData.Temperature/100 + ' С';
        item4.appendChild(badge4);

        var item5 = document.createElement('li');
        item5.className = 'list-group-item d-flex justify-content-between align-items-center';
        var button = document.createElement('button');
        button.className = 'btn btn-primary btn-lg';
        button.style.marginLeft = 'auto';
        button.style.marginRight = '0';
        button.textContent = 'График';
        button.onclick = function() {
            redakbgraph(deviceId);
        };
        item5.appendChild(button);

        listGroup.appendChild(item1);
        listGroup.appendChild(item2);
        listGroup.appendChild(item3);
        listGroup.appendChild(item4);
        listGroup.appendChild(item5);
        
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

function redakbgraph(id)
{
    localStorage.setItem('deviceId', id);
    window.location.replace("/akbgraph.html");
}