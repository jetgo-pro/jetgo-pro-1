const couriers = [
  { name: "Арман", phone: "77001234567", car: "Toyota Prius" },
  { name: "Данияр", phone: "77005554433", car: "Hyundai Accent" },
  { name: "Нурбек", phone: "77009998877", car: "Kia Rio" }
];

function getRandomCourier() {
  return couriers[Math.floor(Math.random() * couriers.length)];
}

function createOrder() {
  const name = document.getElementById("name").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const distance = document.getElementById("distance").value;

  if(!name || !from || !to || !distance){
    alert("Барлық жолды толтырыңыз");
    return;
  }

  const price = distance * 1000;
  const courier = getRandomCourier();
  const orderId = Date.now();

  const orderData = {
    id: orderId,
    name,
    from,
    to,
    distance,
    price,
    courier,
    status: "Күтіп тұр",
    createdAt: new Date().toISOString()
  };

  firebase.database().ref("orders/" + orderId).set(orderData);

  document.getElementById("result").innerHTML = `
    <h3>Тапсырыс қабылданды ✅</h3>
    <p>ID: ${orderId}</p>
    <p>Сома: ${price} тг</p>
    <p>Курьер: ${courier.name}</p>
    <p>Номер: +${courier.phone}</p>
    <p>Статус: ${orderData.status}</p>
  `;

  startTimer();
  notify("Тапсырыс қабылданды 🚚");
}

function startTimer(){
  let time = 600;
  const interval = setInterval(()=>{
    time--;
    if(time <= 0){
      clearInterval(interval);
      notify("Жеткізілді ✅");
    }
  },1000);
}

function notify(text){
  if(Notification.permission !== "granted"){
    Notification.requestPermission();
  } else {
    new Notification(text);
  }
}
