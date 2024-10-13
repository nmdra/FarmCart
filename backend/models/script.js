// speechGenerator.js

// Create a new speech synthesis utterance object
const speech = new SpeechSynthesisUtterance()
let voices = []

// Select the voice selection dropdown
const voiceSelect = document.querySelector('select')

// Populate the voice list when voices are available
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices()
    speech.voice = voices[0] // Default to the first available voice

    // Populate the select dropdown with available voices
    voices.forEach((voice, i) => {
        const option = new Option(voice.name, i)
        voiceSelect.options[i] = option
    })
}

// Event listener for the voice select dropdown
voiceSelect.addEventListener('change', () => {
    speech.voice = voices[voiceSelect.value]
})

// Event listener for the button click to start speech synthesis
document.querySelector('button').addEventListener('click', () => {
    speech.text = document.querySelector('textarea').value
    window.speechSynthesis.speak(speech)
})

export { speech, voices, voiceSelect }
