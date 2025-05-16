        const calculateBtn = document.getElementById('calculateBtn');
        calculateBtn.addEventListener('click', () => {
            event.preventDefault();

            const totalBill = document.getElementById('totalBill').value;
            const tipAmount = document.getElementById('tipAmount').value;

            if(isNaN(totalBill) || totalBill <= 0) {
                alert("Not A Valid Bill Please Check!")
                return;
            }

            if(isNaN(tipAmount) || tipAmount < 0) {
                alert("Not A Valid Tip Please Check!")
                return;
            }
            
            const tip = (parseFloat(totalBill) *parseFloat(tipAmount)) / 100;
            const total = parseFloat(totalBill) + tip;

            document.getElementById('tipPanel').innerText = Math.round(tip);
            document.getElementById('totalPanel').innerText = Math.round(total);

            //Visible Panel
            const panel = document.getElementById('panel');
            panel.style.display = 'block';
        });

        //Theme Change Toggle Switch
        const toggleSwitch = document.getElementById('toggle-switch');
        toggleSwitch.addEventListener('click', () => {
            const body = document.body;

            if (body.classList.contains('dark-theme')) {
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
                toggleSwitch.innerText = 'Dark Theme';
            } else {
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
                toggleSwitch.innerText = 'Light Theme';
            }
        });

        //Reset Button
        const reset = document.getElementById('reset');
        reset.addEventListener('click', () => {
            // Clear input fields
            document.getElementById('totalBill').value = '';
            document.getElementById('tipAmount').value = '';

            // Clear displayed result
            document.getElementById('tipPanel').textContent = '';
            document.getElementById('totalPanel').textContent = '';

            // Hide panel
            document.getElementById('panel').style.display = 'none';
        });