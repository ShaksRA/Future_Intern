document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const colorPicker = document.getElementById('background-color');

    let currentValue = '';
    let previousValue = '';
    let operator = '';
    let waitingForOperand = false;

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const type = button.dataset.type;
            const value = button.textContent;

            addRipple(e);

            switch (type) {
                case 'number':
                    handleNumberClick(value);
                    break;
                case 'operator':
                    handleOperatorClick(value);
                    break;
                case 'equal':
                    handleEqualClick();
                    break;
                case 'clear':
                    handleClear();
                    break;
                case 'sqrt':
                    handleSquareRoot();
                    break;
                case 'percent':
                    handlePercentage();
                    break;
                case 'toggle-sign':
                    handleToggleSign();
                    break;
                case 'decimal':
                    handleDecimal();
                    break;
            }

            updateDisplay();
        });
    });

    colorPicker.addEventListener('input', (e) => {
        document.body.style.backgroundColor = e.target.value;
    });

    function handleNumberClick(num) {
        if (waitingForOperand) {
            display.textContent = num;
            currentValue = num;
            waitingForOperand = false;
        } else {
            display.textContent = display.textContent === '0' ? num : display.textContent + num;
            currentValue = display.textContent;
        }
    }

    function handleOperatorClick(op) {
        if (previousValue && currentValue && !waitingForOperand) {
            handleEqualClick();
        }
        operator = op;
        previousValue = currentValue || display.textContent;
        waitingForOperand = true;
    }

    function handleEqualClick() {
        if (!previousValue || (!currentValue && !waitingForOperand)) return;

        const prev = parseFloat(previousValue);
        const current = parseFloat(waitingForOperand ? previousValue : currentValue);
        let result;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            case '^':
                result = Math.pow(prev, current);
                break;
            default:
                return;
        }

        display.textContent = result.toString();
        currentValue = result.toString();
        previousValue = '';
        operator = '';
        waitingForOperand = true;
    }

    function handleClear() {
        display.textContent = '0';
        currentValue = '';
        previousValue = '';
        operator = '';
        waitingForOperand = false;
    }

    function handleSquareRoot() {
        const value = parseFloat(display.textContent);
        if (value >= 0) {
            const result = Math.sqrt(value);
            display.textContent = result.toString();
            currentValue = result.toString();
            waitingForOperand = true;
        }
    }

    function handlePercentage() {
        const value = parseFloat(display.textContent);
        const result = value / 100;
        display.textContent = result.toString();
        currentValue = result.toString();
        waitingForOperand = true;
    }

    function handleToggleSign() {
        const value = parseFloat(display.textContent);
        const result = -value;
        display.textContent = result.toString();
        currentValue = result.toString();
    }

    function handleDecimal() {
        if (!display.textContent.includes('.')) {
            display.textContent += '.';
            currentValue += '.';
        }
    }

    function updateDisplay() {
        display.textContent = currentValue || '0';
    }

    function addRipple(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }
});