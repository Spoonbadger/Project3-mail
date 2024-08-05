document.addEventListener('DOMContentLoaded', () => {
    // Submit form
    document.querySelector('#currencyForm').onsubmit = (event) => {
        // Stop the form default submitting
        event.preventDefault();
        
        // GET the exchange data
        fetch('http://api.exchangeratesapi.io/v1/latest?access_key=9675e1aa6ca84ae4a0bf6071c04b4abd&symbol=USD,JPY,MXN,GBP,CAD,AUD')
        .then(response => response.json())
        .then(data => {
            // Get the currency the user has input
            let currency = document.querySelector('#currencyInput').value.toUpperCase();
            // Get the relevant exchange rate from the data
            let exchangeRate = data.rates[currency];
            // Print out on the webpage
            document.querySelector('#currencyParagraph').innerHTML = `1EUR = ${exchangeRate.toFixed(3)} ${currency}`;
        })
    }
})