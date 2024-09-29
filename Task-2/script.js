document.addEventListener('DOMContentLoaded', () => {
    const temperatureInput = document.getElementById('temperature');
    const unitSelect = document.getElementById('unit');
    const convertBtn = document.getElementById('convert-btn');
    const errorElement = document.getElementById('error');
    const resultsElement = document.getElementById('results');

    const unitIcons = {
        Celsius: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3f51b5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-3.31 0-6 2.69-6 6v8c0 3.31 2.69 6 6 6s6-2.69 6-6V8c0-3.31-2.69-6-6-6z"></path><path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path></svg>`,
        Fahrenheit: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f44336" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
        Kelvin: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00bcd4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"></path><path d="M8 6l4-3 4 3"></path><path d="M8 18l4 3 4-3"></path><path d="M3 12h18"></path><path d="M6 8l-3 4 3 4"></path><path d="M18 8l3 4-3 4"></path></svg>`
    };

    convertBtn.addEventListener('click', convertTemperature);

    function convertTemperature() {
        const temp = parseFloat(temperatureInput.value);
        const inputUnit = unitSelect.value;

        if (isNaN(temp)) {
            showError('Please enter a valid number');
            return;
        }

        clearError();
        const conversions = calculateConversions(temp, inputUnit);
        displayResults(conversions, inputUnit);
    }

    function calculateConversions(temp, inputUnit) {
        let celsius, fahrenheit, kelvin;

        switch (inputUnit) {
            case 'Celsius':
                celsius = temp;
                fahrenheit = (temp * 9/5) + 32;
                kelvin = temp + 273.15;
                break;
            case 'Fahrenheit':
                celsius = (temp - 32) * 5/9;
                fahrenheit = temp;
                kelvin = (temp - 32) * 5/9 + 273.15;
                break;
            case 'Kelvin':
                celsius = temp - 273.15;
                fahrenheit = (temp - 273.15) * 9/5 + 32;
                kelvin = temp;
                break;
        }

        return {
            Celsius: Number(celsius.toFixed(2)),
            Fahrenheit: Number(fahrenheit.toFixed(2)),
            Kelvin: Number(kelvin.toFixed(2))
        };
    }

    function displayResults(conversions, inputUnit) {
        resultsElement.innerHTML = '';
        Object.entries(conversions).forEach(([unit, value]) => {
            if (unit !== inputUnit) {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.innerHTML = `
                    <div class="result-unit">
                        ${unitIcons[unit]}
                        <span>${unit}</span>
                    </div>
                    <span class="result-value">${value} °${unit === 'Kelvin' ? 'K' : unit.charAt(0)}</span>
                `;
                resultsElement.appendChild(resultItem);
            }
        });
    }

    function showError(message) {
        errorElement.textContent = message;
    }

    function clearError() {
        errorElement.textContent = '';
    }
});