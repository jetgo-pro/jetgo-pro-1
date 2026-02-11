database.ref("orders").on("value", function(snapshot) {
    const data = snapshot.val();
    const ordersDiv = document.getElementById("orders");
    ordersDiv.innerHTML = "";

    for (let id in data) {
        const order = data[id];

        ordersDiv.innerHTML += `
            <div class="order-card">
                <p>ID: ${id}</p>
                <p>Аты: ${order.name}</p>
                <p>Мекенжай: ${order.address}</p>
                <p>Баға: ${order.price} тг</p>
                <p>Статус: ${order.status}</p>
                <p>Төлем: ${order.paymentStatus}</p>
            </div>
        `;
    }
});
