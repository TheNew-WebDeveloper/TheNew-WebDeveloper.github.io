const increment = document.getElementById('increment');
        const decrement = document.getElementById('decrement');
        const panel = document.getElementById('panel');
        const reset = document.getElementById('reset');

        //Closures
        function inc() {
            let count = parseInt(localStorage.getItem('counter')) || 0;
            panel.value = count;

            function updatePanelAndStorage() {
                panel.value = count;
                localStorage.setItem('counter', count);

                panel.classList.remove('animate');
                void panel.offsetWidth; // reflow trick to restart animation
                panel.classList.add('animate');
            }

            return {
                add : function () {
                    if(count > 1999) {
                        alert("Max Count Reached");
                        return;
                    }
                    count++;
                    updatePanelAndStorage();
                },
                minus : function () {
                    if(count < 1) {
                        alert("Lowest Limit Reached");
                        return;
                    }
                    count--;
                    updatePanelAndStorage();
                },
                reset : function () {
                    count = 0;
                    updatePanelAndStorage();
                }
            }
        }
        const res = inc();

        //Increment
        increment.addEventListener('click', res.add);

        //Decrement
        decrement.addEventListener('click', res.minus);

        //Reset
        reset.addEventListener('click', res.reset)