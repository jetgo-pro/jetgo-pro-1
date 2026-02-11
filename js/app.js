function createOrder() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const distance = document.getElementById("distance").value;

    if(!name || !address || !distance) {
        alert("Барлық өрістерді толтырыңыз!");
        return;
    }

    const price = distance * 500;
    const id = Date.now();

    database.ref("orders/" + id).set({
        name: name,
        address: address,
        distance: distance,
        price: price,
        status: "Күтілуде",
        paymentStatus: "Төленбеген"
    });

    document.getElementById("result").innerHTML = `
        ID: ${id}<br>
        Баға: ${price} тг<br>
        <a href="payment.html?id=${id}&price=${price}">
            <button>Онлайн төлеу</button>
        </a>
    `;
}
