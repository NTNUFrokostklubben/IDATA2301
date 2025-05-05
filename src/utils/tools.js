
/**
 * Execute the function func after the page is loaded
 * @param func Function to run when the page is loaded
 */
function runOnLoad(func) {
    document.addEventListener("DOMContentLoaded", func);
}


/**
 * Show an error message for a form
 * @param errorMessage The error message to show
 */
export function showFormErrorLogin(errorMessage) {
    showFormResult(errorMessage, "error");
}

/**
 * Show an error message for a form
 * @param errorMessage The error message to show
 */
export function showFormErrorSignup(errorMessage) {
    showFormResult(errorMessage, "error");
}

/**
 * Show a success message for a form
 * @param successMessage The success message to show
 */
function showFormSuccess(successMessage) {
    showFormResult(successMessage, "success");
}

/**
 * Show a result message in a form
 * @param message The message to show
 * @param resultType Type of the result: error or success
 */
function showFormResult(message, resultType) {
    const resultElement = document.getElementById("result-message");
    resultElement.classList.add(resultType);
    resultElement.classList.remove("hidden");
    resultElement.innerText = message;
}
