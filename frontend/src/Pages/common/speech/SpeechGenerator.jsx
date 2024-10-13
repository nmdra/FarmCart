import React, { useEffect, useRef, useState } from 'react'

const SpeechGenerator = () => {
    const textareaRef = useRef(null)
    const speech = useRef(new SpeechSynthesisUtterance())
    const [voices, setVoices] = useState([])
    const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        const populateVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices()
            setVoices(availableVoices)
            if (availableVoices.length > 0) {
                speech.current.voice = availableVoices[selectedVoiceIndex]
            }
        }

        populateVoices()
        window.speechSynthesis.onvoiceschanged = populateVoices

        return () => {
            window.speechSynthesis.onvoiceschanged = null
        }
    }, [selectedVoiceIndex])

    const handleListen = () => {
        speech.current.text = textareaRef.current.value
        window.speechSynthesis.speak(speech.current)
        setIsPaused(false)
    }

    const handleTogglePauseResume = () => {
        if (isPaused) {
            window.speechSynthesis.resume()
        } else {
            window.speechSynthesis.pause()
        }
        setIsPaused(!isPaused)
    }

    const handleVoiceChange = (event) => {
        const index = event.target.value
        setSelectedVoiceIndex(index)
        speech.current.voice = voices[index]
    }

    return (
        <div className="hero h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-green-800">
            <div className="bg-white bg-opacity-95 p-10 rounded-2xl shadow-2xl max-w-lg w-full">
                <h1 className="text-5xl font-bold text-gray-800 text-center mb-8 tracking-wide">
                    Text to Speech{' '}
                    <span className="text-green-600">Converter</span>
                </h1>

                <textarea
                    ref={textareaRef}
                    placeholder="Write anything here..."
                    className="w-full h-40 p-4 border border-gray-300 rounded-lg shadow-inner text-lg mb-6 focus:outline-none focus:ring-4 focus:ring-green-400 transition duration-300"
                ></textarea>

                <div className="flex justify-between items-center mb-6">
                    <select
                        value={selectedVoiceIndex}
                        onChange={handleVoiceChange}
                        className="border border-gray-300 rounded-lg p-2 bg-white shadow-md focus:outline-none focus:ring-4 focus:ring-green-400 transition duration-300"
                    >
                        {voices.map((voice, index) => (
                            <option key={index} value={index}>
                                {voice.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleListen}
                        className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
                    >
                        Listen
                    </button>
                </div>

                <div className="text-center">
                    <button
                        onClick={handleTogglePauseResume}
                        className={`py-2 px-6 rounded-full shadow-lg text-white transition duration-300 transform hover:scale-105 ${isPaused ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-red-500 hover:bg-red-600'}`}
                    >
                        {isPaused ? 'Resume' : 'Pause'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SpeechGenerator
