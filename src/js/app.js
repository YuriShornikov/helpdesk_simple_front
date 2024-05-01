// Создаем переменную под id
let firstId;

function handleLoad() {
  if (this.status >= 200 && this.status < 300) {
    try {
      const data = JSON.parse(this.responseText);
      console.log(data);
      if (data.length > 0) {
        firstId = data[0].id;
      }
    } catch (e) {
      console.error(e);
    }
  }
}

function makeRequest(method, url, data = null) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', handleLoad);
  xhr.open(method, url);
  if (data) {
    xhr.send(data);
  } else {
    xhr.send();
  }
}

const formData = new FormData();
formData.append('name', 'new');
formData.append('description', 'someone');
formData.append('status', 'false');

// Вызов методов: allTickets, createTicket, ticketById
makeRequest('POST', 'http://localhost:4000/?method=createTicket', formData);
makeRequest('GET', 'http://localhost:4000/?method=allTickets');

setTimeout(() => {
  if (firstId) {
    makeRequest('GET', `http://localhost:4000/?method=ticketById&id=${firstId}`);
  } else {
    console.log('something went wrong');
  }
}, 1000)
