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
        <div className="flex items-center justify-center h-screen hero bg-gradient-to-br from-white to-gray-300">
            <div className="w-full max-w-lg p-10 bg-white shadow-2xl bg-opacity-95 rounded-2xl">
                <h1 className="mb-8 text-5xl font-bold tracking-wide text-center text-gray-800">
                    Text to Speech{' '}
                    <span className="text-lime-500">Converter</span>
                </h1>

                <textarea
                    ref={textareaRef}
                    placeholder="Write anything here..."
                    className="w-full h-40 p-4 mb-6 text-lg transition duration-300 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-green-400"
                ></textarea>

                <div className="flex items-center justify-between mb-6">
                    <select
                        value={selectedVoiceIndex}
                        onChange={handleVoiceChange}
                        className="p-2 transition duration-300 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-green-400"
                    >
                        {voices.map((voice, index) => (
                            <option key={index} value={index}>
                                {voice.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleListen}
                        className="px-6 py-2 text-white transition duration-300 transform rounded-lg shadow-lg bg-lime-500 hover:bg-lime-600 hover:scale-105"
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
