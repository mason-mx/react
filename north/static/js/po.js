$(document).ready(function()
{
    $.ajax({url: "/pos", success: function(result){
        console.log("try to draw pie charts for: " + result);

        for (let i = 0; i < result.length; i++) {
            let otd_id = "otd-po-" + result[i];
            let qc_id = "qc-po-" + result[i];

            let otd_ele = document.getElementById(otd_id);
            let otd_data = {
                labels: [
                'Red',
                'Blue'
                ],
                datasets: [{
                label: 'OTD',
                data: [300, 50],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)'
                ],
                hoverOffset: 4
                }]
            };
        
            new Chart(otd_ele, {
                type: 'doughnut',
                data: otd_data,
                options: {
                    rotation: -90,
                    circumference: 180,
                    plugins: {
                        legend: {
                            display: false
                        },
                    },
                    scales: {
                    y: {
                        display: false
                    }
                    }
                }
            });

            let qc_ele = document.getElementById(qc_id);
            let qc_data = {
                labels: [
                'Red',
                'Blue'
                ],
                datasets: [{
                label: 'QC',
                data: [25, 50],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)'
                ],
                hoverOffset: 4
                }]
            };
            
            new Chart(qc_ele, {
                type: 'doughnut',
                data: qc_data,
                options: {
                    rotation: -90,
                    circumference: 180,
                    plugins: {
                        legend: {
                            display: false
                        },
                    },
                    scales: {
                    y: {
                        display: false
                    }
                    }
                }
            });
        }

    }});
});