$(document).ready(function () {
    // Open the form
    $("#openFormBtn").click(function () {
        $("#popupForm").modal('show');
    });
    // Close the form
    $("#closeFormBtn").click(function () {
        $("#popupForm").modal('hide');
    });
});

$(document).ready(function () {
    var popupForm = new bootstrap.Modal($('#popupForm')[0]);
    var popupSelf = new bootstrap.Modal($('#popupSelf')[0]);

    $('#selfBtn').on('click', function () {
        popupForm.hide();
        popupSelf.show();
    });

    // Handle 'Dependent' case if needed
    $('#dependentBtn').on('click', function () {
        // Implement functionality for 'Dependent' button here
    });

    $('#closeFormBtn').on('click', function () {
        popupForm.hide();
    });

    $('#closeSelfBtn, #closeSelfBtn2').on('click', function () {
        popupSelf.hide();
    });
});

$(document).ready(function () {
    var popupForm = new bootstrap.Modal($('#popupForm')[0]);

    $('#openFormBtn').on('click', function () {
        popupForm.show();
        $('.dependent-dropdown').hide();
    });

    $('#dependentBtn').on('click', function () {
        $('.dependent-dropdown').show();
    });

    $('#closeFormBtn').on('click', function () {
        popupForm.hide();
    });

    $('#selfBtn').on('click', function () {
        $('.dependent-dropdown').hide();
    });
});

document.getElementById('searchButton').addEventListener('click', function () {
    const searchValue = document.getElementById('pincodeSelf').value;
    const alertBox = document.getElementById('alert');
    const notFoundMessage = document.getElementById('not-found');

    if (!searchValue) {
        alertBox.innerText = "Please fill Pincode";
        alertBox.style.display = 'block';
        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 3000);
        return;
    }

    fetch('data.json')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            const dataArray = Object.values(data);

            const found = dataArray.find(item => item.zipcode === searchValue);

            if (found) {
                const serviceModal = new bootstrap.Modal(document.getElementById('serviceAvailableModal'));
                serviceModal.show();

                console.log(`State ID: ${found.state_id}, City ID: ${found.city_id}`);
                document.getElementById('result').innerText = `State ID: ${found.state_id}, City ID: ${found.city_id}`;

                document.getElementById('nextStepButton').onclick = function () {
                    serviceModal.hide();
                    const nextStepModal = new bootstrap.Modal(document.getElementById('nextStepModal'));
                    nextStepModal.show();

                    document.getElementById('finalStepButton').onclick = function () {
                        nextStepModal.hide();
                        const finalStepModal = new bootstrap.Modal(document.getElementById('finalStepModal'));
                        finalStepModal.show();
                    };
                };
            } else {
                notFoundMessage.innerText = "Value not found.";
                notFoundMessage.style.display = 'block';

                setTimeout(() => {
                    notFoundMessage.innerText = '';
                }, 3000);
            }
        })
        .catch(function (error) {
            console.log('Something went wrong');
            console.error(error);
        });
});

document.getElementById('nextStepButton').addEventListener('click', function () {
    const serviceModal = bootstrap.Modal.getInstance(document.getElementById('serviceAvailableModal'));
    serviceModal.hide();

    const nextStepModal = new bootstrap.Modal(document.getElementById('nextStepModal'));
    nextStepModal.show();
});


document.getElementById('finalStepButton').addEventListener('click', function () {
    const radioChecked = document.querySelector('input[name="lab"]:checked');
    if (radioChecked) {
        // Hide the current modal
        const nextStepModal = new bootstrap.Modal(document.getElementById('nextStepModal'));
        nextStepModal.hide();

        // Trigger the next modal
        const nextModal = new bootstrap.Modal(document.getElementById('finalStepModal'));
        nextModal.show();
    } else {
        // Display an alert if no radio button is selected
        alert('Please select a lab before proceeding.');
    }
});