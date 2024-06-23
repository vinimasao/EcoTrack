const ctx = document.getElementById('myChart').getContext('2d');
const data = {
    labels: [''],
    datasets: [{
        label: 'Consumo',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

const myChart = new Chart(ctx, config);

document.getElementById('energy-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const consumption = parseFloat(document.getElementById('energy-consumption').value);

    // Add new data to the chart
    myChart.data.labels.push(date);
    myChart.data.datasets[0].data.push(consumption);

    // Update the chart
    myChart.update();
});

document.getElementById('logout').addEventListener('click', function() {
    window.location.href = 'login.html';
});
